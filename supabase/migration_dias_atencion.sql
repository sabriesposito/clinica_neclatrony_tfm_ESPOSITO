-- ==============================================================================
-- MIGRACIÓN: AGREGAR COLUMNA dias_atencion EN SUPABASE (clinica_doctores)
-- Clínica Dental Neclatrony
-- ==============================================================================

-- 1. Agregar la columna dias_atencion a la tabla clinica_doctores
ALTER TABLE public.clinica_doctores 
ADD COLUMN IF NOT EXISTS dias_atencion VARCHAR(100) DEFAULT 'Lunes a Viernes';

-- 2. Poblar / actualizar los días de atención específicos de cada doctor
UPDATE public.clinica_doctores 
SET dias_atencion = 'Lunes a Viernes' 
WHERE nombre_completo ILIKE '%Martínez%' 
   OR nombre_completo ILIKE '%Rodríguez%' 
   OR nombre_completo ILIKE '%López%' 
   OR nombre_completo ILIKE '%Sánchez%' 
   OR nombre_completo ILIKE '%Morales%';

UPDATE public.clinica_doctores 
SET dias_atencion = 'Lunes a Jueves' 
WHERE nombre_completo ILIKE '%García%';

UPDATE public.clinica_doctores 
SET dias_atencion = 'Lun, Mié, Vie' 
WHERE nombre_completo ILIKE '%Fernández%';

UPDATE public.clinica_doctores 
SET dias_atencion = 'Mar, Jue' 
WHERE nombre_completo ILIKE '%Torres%';

-- 3. Si algún doctor no tiene valor, asegurar el predeterminado
UPDATE public.clinica_doctores 
SET dias_atencion = 'Lunes a Viernes' 
WHERE dias_atencion IS NULL;

-- 4. Verificar resultado final
SELECT id, nombre_completo, especialidad, consultorio_asignado, dias_atencion, horario_inicio, horario_fin 
FROM public.clinica_doctores 
ORDER BY consultorio_asignado ASC;
