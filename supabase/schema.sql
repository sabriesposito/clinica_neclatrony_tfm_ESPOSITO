-- Activación de extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Tabla de Pacientes (Maestro de Usuarios)
CREATE TABLE IF NOT EXISTS public.clinica_pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dni VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(25) NOT NULL,
    email VARCHAR(120),
    telegram_chat_id BIGINT UNIQUE,
    acepta_rgpd BOOLEAN DEFAULT FALSE,
    fecha_consentimiento TIMESTAMP WITH TIME ZONE,
    fecha_alta TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);

-- 2. Tabla de Doctores y Cuadro Médico
CREATE TABLE IF NOT EXISTS public.clinica_doctores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_completo VARCHAR(120) NOT NULL,
    numero_colegiado VARCHAR(30) UNIQUE NOT NULL,
    especialidad VARCHAR(50) NOT NULL CHECK (especialidad IN ('General', 'Implante', 'Ortodoncia', 'Cirugía')),
    consultorio_asignado INT CHECK (consultorio_asignado BETWEEN 1 AND 6),
    horario_inicio TIME DEFAULT '09:00:00',
    horario_fin TIME DEFAULT '20:00:00',
    activo BOOLEAN DEFAULT TRUE
);

-- 3. Tabla de Citas y Control de Agenda de los 6 Sillones
CREATE TABLE IF NOT EXISTS public.clinica_citas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    erp_cita_id VARCHAR(50),
    paciente_id UUID REFERENCES public.clinica_pacientes(id) ON DELETE RESTRICT,
    doctor_id UUID REFERENCES public.clinica_doctores(id) ON DELETE RESTRICT,
    especialidad VARCHAR(50) NOT NULL,
    consultorio_num INT NOT NULL CHECK (consultorio_num BETWEEN 1 AND 6),
    fecha_hora_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_hora_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    estado VARCHAR(30) DEFAULT 'PROGRAMADA' CHECK (estado IN ('PROGRAMADA', 'CONFIRMADA_24H', 'REPROGRAMADA', 'CANCELADA', 'ATENDIDA', 'NO_SHOW')),
    canal_origen VARCHAR(20) DEFAULT 'TELEGRAM',
    recordatorio_24h_enviado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restricción de regla de negocio: Máximo una cita activa por especialidad por paciente
CREATE UNIQUE INDEX IF NOT EXISTS idx_cita_activa_especialidad 
ON public.clinica_citas (paciente_id, especialidad) 
WHERE estado IN ('PROGRAMADA', 'CONFIRMADA_24H');

-- 4. Tabla de Base de Conocimiento Clínico para RAG (Vector Store)
CREATE TABLE IF NOT EXISTS public.clinica_knowledge (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(80),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding VECTOR(1536), -- Vector correspondiente a OpenAI text-embedding-3-small
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creación de Índice Vectorial HNSW para búsqueda rápida por similitud de coseno
CREATE INDEX IF NOT EXISTS idx_knowledge_embedding_hnsw 
ON public.clinica_knowledge 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 5. Tabla de Auditoría y Trazabilidad Transaccional
CREATE TABLE IF NOT EXISTS public.clinica_auditoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    telegram_chat_id BIGINT,
    evento VARCHAR(80) NOT NULL,
    input_payload JSONB,
    output_payload JSONB,
    uipath_job_id VARCHAR(80),
    duracion_ms INT,
    estado VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Función Almacenada (RPC) para Búsqueda Vectorial por Coseno
CREATE OR REPLACE FUNCTION public.match_clinica_documents (
    query_embedding VECTOR(1536),
    match_threshold FLOAT DEFAULT 0.65,
    match_count INT DEFAULT 4
)
RETURNS TABLE (
    id UUID,
    category VARCHAR(50),
    title VARCHAR(200),
    content TEXT,
    similarity FLOAT
)
LANGUAGE sql STABLE
AS $$
    SELECT
        id,
        category,
        title,
        content,
        1 - (clinica_knowledge.embedding <=> query_embedding) AS similarity
    FROM public.clinica_knowledge
    WHERE 1 - (clinica_knowledge.embedding <=> query_embedding) > match_threshold
    ORDER BY clinica_knowledge.embedding <=> query_embedding
    LIMIT match_count;
$$;