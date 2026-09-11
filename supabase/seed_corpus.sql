-- ==============================================================================
-- INSERCIÓN DE DATOS INICIALES Y CONOCIMIENTO RAG EN SUPABASE
-- Clínica Dental Neclatrony
-- ==============================================================================

-- 1. Cuadro Médico Inicial (Doctores y Gabinetes)
INSERT INTO public.clinica_doctores (nombre_completo, numero_colegiado, especialidad, consultorio_asignado) VALUES
('Dra. Martínez', 'COL-28001', 'General', 1),
('Dr. Rodríguez', 'COL-28002', 'Ortodoncia', 5),
('Dra. López', 'COL-28003', 'General', 2),
('Dr. Sánchez', 'COL-28004', 'Cirugía', 4),
('Dr. Morales', 'COL-28005', 'Implante', 3)
ON CONFLICT DO NOTHING;

-- 2. Base de Conocimiento Clínico para el Agente RAG
INSERT INTO public.clinica_knowledge (category, subcategory, title, content) VALUES
('TRATAMIENTO', 'General', 'Limpieza Dental y Tartrectomía', 
 'La limpieza dental con ultrasonidos elimina sarro y manchas superficiales. Duración aproximada: 30 a 45 minutos. Precio para particulares: 45 euros. Es gratuita una vez al año para asegurados de Sanitas, Adeslas, Mapfre, DKV y Asisa. Recomendada cada 6 a 12 meses.'),

('TRATAMIENTO', 'General', 'Obturaciones y Empastes de Composite', 
 'Tratamiento de caries dentales mediante resina compuesta estética de alta densidad. Precio orientativo: entre 50 y 70 euros según la extensión anatómica. Procedimiento totalmente indoloro bajo anestesia local tópica e infiltrativa.'),

('TRATAMIENTO', 'Implantes', 'Implantes Dentales de Titanio', 
 'Tornillo de titanio puro biocompatible que sustituye la raíz del diente perdido. Cirugía ambulatoria mínimamente invasiva con anestesia local. Tiempo promedio de osteointegración: 8 a 12 semanas. Precio orientativo: implante unitario desde 590 euros; corona definitiva de zirconio sobre implante desde 480 euros.'),

('TRATAMIENTO', 'Ortodoncia', 'Alineadores Invisibles (Invisalign)', 
 'Férulas termoplásticas transparentes y extraíbles. Requieren uso diario de 22 horas, cambiándose cada 7 o 10 días. Revisiones clínicas cada 4 a 6 semanas. Estudio diagnóstico 3D previo con escáner intraoral. Precio cerrado financiable desde 2.400 hasta 3.900 euros.'),

('TRATAMIENTO', 'Ortodoncia', 'Brackets Convencionales de Zafiro y Metálicos', 
 'Brackets fijos cerámicos de cristal de zafiro monoscristalino altamente estéticos o metálicos de baja fricción. Rango de precios: desde 1.800 a 2.800 euros con planes de cuotas fijas desde 65 euros al mes.'),

('TRATAMIENTO', 'Cirugía', 'Extracción Quirúrgica de Cordales (Muelas del Juicio)', 
 'Extracción quirúrgica realizada por cirujano bajo anestesia local en consultorio 4 o 6. Requiere radiografía panorámica previa. Precio: desde 90 euros (extracción simple) hasta 160 euros (extracción quirúrgica compleja con osteotomía).'),

('PRECIOS_PAGOS', 'Financiación', 'Planes de Financiación y Medios de Pago', 
 'Ofrecemos financiación a medida hasta en 36 meses sin intereses (TIN 0%, TAE 0%) para tratamientos superiores a 1.000 euros. Medios de pago aceptados: efectivo en recepción (hasta 1.000 euros), tarjetas de crédito/débito Visa/Mastercard y Bizum profesional.'),

('SEGUROS', 'Conciertos', 'Aseguradoras Médicas Concertadas', 
 'Centro concertado preferente con Sanitas Dental, Adeslas Dental, Mapfre Caja Salud, DKV Seguros y Asisa. Cobertura gratuita: revisión inicial, radiografía diagnóstica y una limpieza anual por ultrasonidos. Para el resto de tratamientos, tarifas concertadas con hasta 40% de descuento.'),

('PROTOCOLO', 'Postoperatorio', 'Instrucciones y Cuidados tras Cirugía o Extracción', 
 'Morder la gasa estéril durante 30 minutos continuos. No escupir ni enjuagarse la boca durante las primeras 24 horas para preservar el coágulo. Aplicar frío local externo a intervalos de 10 minutos. Dieta blanda y fría. No fumar ni consumir alcohol durante al menos 72 horas. Tomar la medicación analgésica pautada.')
ON CONFLICT DO NOTHING;
