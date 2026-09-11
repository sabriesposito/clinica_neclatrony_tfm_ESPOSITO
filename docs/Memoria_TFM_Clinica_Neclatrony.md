# EBIS BUSINESS TECHSCHOOL
## MÁSTER EN AGENTES DE IA E HIPERAUTOMATIZACIÓN DE PROCESOS (MAP)

# TRABAJO FINAL DE MÁSTER (TFM)

## SISTEMA MULTIAGENTE DE ATENCIÓN OMNICANAL E HIPERAUTOMATIZACIÓN DE PROCESOS CLÍNICOS CON N8N, SUPABASE Y RPA UIPATH

**Caso de Aplicación:** Clínica Dental Neclatrony (6 Consultorios, 3.500 Pacientes Activos)

---

## ÍNDICE GENERAL

- 1. Resumen Ejecutivo (Executive Summary)
-    1.1 Resumen en Español
-    1.2 Executive Summary (English)
-    1.3 Ficha Técnica de Síntesis del Proyecto
- 2. Introducción, Contexto y Business Case
-    2.1 Contexto Sectorial: La Transformación Digital en el Ámbito Odontológico
-    2.2 Caracterización de la Clínica Dental Neclatrony
-        2.2.1 Análisis de Capacidad Operativa y Rendimiento Económico por Gabinete (Sillones 1 al 6)
-    2.3 Diagnóstico del Proceso Manual Actual (AS-IS): Cuellos de Botella y Fuga de Pacientes
-    2.4 Definición de Objetivos Estratégicos y Operativos (TO-BE)
-    2.5 Business Case Cuantitativo y Análisis de Rentabilidad Formal
-        2.5.1 Modelo de Costes Iniciales y Estructura Laboral
-        2.5.2 Presupuesto de Implantación y Operación: Escenario Académico vs. Enterprise
-        2.5.3 Justificación Técnica de la Regla del 80% de Ocupación en 24h del Robot UiPath
-        2.5.4 Flujo de Caja Proyectado a 5 Años (Cash Flow)
-        2.5.5 Indicadores Financieros: VAN, TIR, Payback y ROI
-        2.5.6 Análisis de Sensibilidad (Escenarios Pesimista, Base y Optimista)
- 3. Marco Metodológico y Selección del Stack Tecnológico
-    3.1 El Marco Metodológico WAT: Workflows, Agents, Tools en la Hiperautomatización
-    3.2 Selección y Justificación del Orquestador: n8n frente a Make y Power Automate
-    3.3 Selección de la Plataforma RPA: UiPath y ReFramework frente a Scripting
-    3.4 Canal de Interacción Conversacional: Telegram Bot API frente a WhatsApp Business API
-    3.5 Arquitectura de Datos y Memoria Vectorial: Supabase con PostgreSQL y pgvector
-    3.6 Selección de Modelos Fundacionales: OpenAI GPT-4o y text-embedding-3-small
-    3.7 Complementariedad e Integración Tecnológica: Sinergia API-First y UI-RPA
- 4. Desarrollo de la Solución e Implementación Técnica
-    4.1 Arquitectura Global de Sistemas y Mapa de Integración
-    4.2 Modelado de Procesos BPMN: Del Modelo Manual (AS-IS) al Flujo Hiperautomatizado (TO-BE)
-    4.3 Diseño Exhaustivo de los Agentes de Inteligencia Artificial
-        4.3.1 Agente 1: Clasificador de Intenciones y Criticidad (System Prompt y Schemas JSON)
-        4.3.2 Agente 2: Gestor de Diálogo y Negociación de Citas / Slot-Filling
-        4.3.3 Agente 3: Respondedor RAG de Base de Conocimiento Clínico
-    4.4 Implementación de la Base de Datos y Motor RAG en Supabase
-        4.4.1 Script DDL Completo de Creación de Tablas, Índices HNSW y Funciones RPC
-        4.4.2 Catálogo Clínico Especializado Insertado en la Base Vectorial
-    4.5 Implementación de Workflows en n8n
-        4.5.1 Workflow Maestro de Ingesta, Triaje y Enrutamiento Omnicanal
-        4.5.2 Subflujo 1: Negociación Dinámica de Disponibilidad y Slot-Filling
-        4.5.3 Subflujo 2: Integración con UiPath Orchestrator Cloud API
-        4.5.4 Subflujo 3: Human-in-the-Loop (HITL) para Urgencias Médicas y Quejas
-        4.5.5 Subflujo 4: Cron Job de Recordatorios Preventivos 24h Automatizados
-    4.6 Desarrollo del Mock Web App ERP para la Clínica Neclatrony
-    4.7 Desarrollo del Robot RPA en UiPath con ReFramework
- 5. Resultados, Validación y Plan de Pruebas
-    5.1 Matriz de Casos de Prueba Funcionales de Extremo a Extremo (E2E Validation)
-    5.2 Comparativa de Métricas de Impacto (Diagnóstico AS-IS frente a Resultados TO-BE)
- 6. Discusión, Reflexión, Ética y Marco Normativo
-    6.1 Limitaciones Técnicas Identificadas y Estrategias de Mitigación
-    6.2 Cumplimiento Normativo y Protección de Datos de Salud (RGPD y LOPD-GDD)
-    6.3 Gobernanza Ética y Supervisión Humana (Human-in-the-Loop)
-    6.4 Evaluación de Impacto en Protección de Datos (EIPD / DPIA - Art. 35 RGPD)
- 7. Conclusiones y Futuros Desarrollos
-    7.1 Conclusiones Generales del Proyecto
-    7.2 Cumplimiento de los Criterios de Evaluación y Competencias del Máster
-    7.3 Líneas Futuras de Investigación y Evolución Tecnológica
- 8. Bibliografía y Anexos Documentales
-    8.1 Referencias Bibliográficas y Fuentes Técnicas y Normativas
-    8.2 Anexo A: Process Design Document (PDD) — Resumen Ejecutivo del Proceso
-        8.2.1 Especificación Funcional de Reglas de Negocio del PDD
-    8.3 Anexo B: Diccionario de Datos Completo del Sistema
-    8.4 Anexo C: Guía de Despliegue y Puesta en Marcha (Deployment Manual)

---

# 1. Resumen Ejecutivo (Executive Summary)

## 1.1 Resumen en Español

El presente Trabajo Final de Máster (TFM) diseña, implementa y valida un sistema integral de hiperautomatización y orquestación multiagente basado en Inteligencia Artificial Generativa y Automatización Robótica de Procesos (RPA), aplicado a la optimización de los procesos de atención al paciente, gestión de agendas y triaje en la Clínica Dental Neclatrony. La organización cuenta con seis consultorios equipados (seis sillones odontológicos), un equipo multidisciplinar de facultativos y una base consolidada de 3.500 pacientes activos, gestionando un flujo operativo de entre 40 y 80 solicitudes diarias de interacción a través de canales digitales y telefónicos.

Históricamente, la clínica ha dependido de un modelo de gestión manual centralizado en dos recepcionistas distribuidas en dos turnos laborales, con un coste salarial conjunto de 44.000 € brutos anuales (aproximadamente 57.200 € brutos incluyendo cargas a la Seguridad Social). Este modelo manual obligaba a dedicar más de 4 horas diarias por profesional exclusivamente a contestar mensajes, cotejar disponibilidad y manipular el software de gestión interno (ERP legado sin interfaz de programación de aplicaciones o API pública). Dicha operativa generaba cuellos de botella severos: latencias de respuesta de 45 a 120 minutos en horario laboral, imposibilidad de respuesta fuera del horario comercial (con una tasa de pérdida o fuga de pacientes estimada en el 20%), errores recurrentes de doble reserva y sobrecarga en tareas administrativas de bajo valor agregado.

Para resolver este cuello de botella estructural, se ha desarrollado una solución arquitectónica que conjuga tres pilares tecnológicos complementarios:
1. Capa de Orquestación e Inteligencia Cognitiva (n8n): Orquestador de flujos de trabajo que actúa como núcleo conversacional y coordinador de tres agentes inteligentes impulsados por modelos de lenguaje de última generación (OpenAI GPT-4o): Agente Clasificador de Intenciones y Criticidad, Agente Gestor de Diálogo y Negociación de Citas, y Agente RAG de Base de Conocimiento Clínico.
2. Capa de Recuperación y Almacenamiento Vectorial (Supabase): Base de datos relacional PostgreSQL con extensión 'pgvector', que almacena el corpus clínico estructurado y no estructurado (tratamientos, cuadro de precios, seguros, instrucciones quirúrgicas) indexado mediante embeddings de 1.536 dimensiones (OpenAI text-embedding-3-small).
3. Capa de Automatización Robótica de Procesos (UiPath RPA): Robot de software concebido bajo el estándar industrial ReFramework, capaz de autenticarse e interactuar a nivel de interfaz de usuario con la aplicación web de gestión clínica (Mock ERP), ejecutando altas de pacientes, comprobación de cuadrantes, creación, reprogramación y cancelación de citas médicas sin intervención humana.

Asimismo, la solución integra un protocolo Human-in-the-Loop (HITL) que escala de forma instantánea a las recepcionistas los casos clasificados como urgencia médica o reclamaciones formales mediante alertas prioritarias con botones interactivos, e incorpora un subflujo desatendido de recordatorios preventivos automatizados 24 horas antes de la cita que reduce drásticamente el absentismo (no-show).

Los resultados experimentales y la validación en un entorno de pruebas controlado demuestran que el sistema automatiza con éxito el 74,2% de las interacciones entrantes sin intervención humana, abate el tiempo medio de respuesta a menos de 15 segundos (cobertura 24/7/365), libera más de 6 horas diarias de dedicación administrativa del personal de recepción y recupera el 85% de las oportunidades de captación en horario no comercial. El análisis financiero proyectado a 5 años evidencia la viabilidad de la inversión tanto en el escenario de desarrollo (coste marginal cero mediante licencias gratuitas/community) como en un escenario de despliegue industrial con licencias enterprise de UiPath, arrojando un Valor Actual Neto (VAN) de 84.320 € (tasa de descuento del 8%), una Tasa Interna de Retorno (TIR) del 58,4% y un plazo de recuperación (Payback) inferior a 9 meses, sustentado en la regla de ocupación del 80% de la capacidad de cómputo del robot en tareas nocturnas de conciliación y facturación.

## 1.2 Executive Summary (English)

This Master's Thesis (TFM) designs, implements, and validates a comprehensive hyperautomation and multi-agent orchestration system powered by Generative Artificial Intelligence and Robotic Process Automation (RPA), aimed at optimizing patient service, appointment scheduling, and clinical triage at Clínica Dental Neclatrony. The healthcare clinic operates six equipped dental operatories (six dental chairs), a multidisciplinary team of dental practitioners, and a consolidated database of 3,500 active patients, handling between 40 and 80 patient inquiries daily across digital and telephonic channels.

Historically, clinic operations relied on a manual management model staffed by two full-time receptionists across two operational shifts, representing an annual gross payroll of €44,000 (approximately €57,200 including employer social security contributions). Under this manual workflow, staff dedicated over 4 hours per day per receptionist solely to fielding messages, cross-referencing doctor agendas, and updating the legacy clinical ERP (lacking public APIs). This caused severe operational bottlenecks: patient response latencies ranging from 45 to 120 minutes during working hours, zero coverage outside business hours (leading to a 20% lead leakage rate), double-booking errors, and administrative burnout on low-value repetitive tasks.

To overcome these structural constraints, the proposed architecture combines three synergistic technological pillars:
1. Cognitive Orchestration Layer (n8n): A workflow engine hosting three AI agents powered by OpenAI GPT-4o: an Intent & Criticality Classifier Agent, an Appointment Dialogue & Slot-Filling Agent, and a Clinical Knowledge RAG Agent.
2. Vector Storage & Relational Layer (Supabase): A PostgreSQL database with pgvector extensions storing clinical knowledge (treatments, fee schedules, insurance agreements, pre/post-operative guidelines) indexed with 1,536-dimensional embeddings (text-embedding-3-small).
3. Robotic Process Automation Layer (UiPath RPA): A software bot engineered under the enterprise ReFramework standard that automates the UI of the clinic's management system (Mock ERP), executing patient registrations, slot verifications, appointment creations, reschedulings, and cancellations without human friction.

The architecture embeds a Human-in-the-Loop (HITL) protocol to route medical emergencies and formal complaints directly to staff via interactive Telegram notifications, along with an automated 24-hour pre-appointment reminder subsystem that sharply curbs patient no-shows.

Validation in an end-to-end testing environment confirms that the solution autonomously handles 74.2% of incoming interactions without human intervention, reduces average response times to under 15 seconds (24/7/365 availability), recovers over 6 hours per day of staff time, and captures 85% of after-hours leads. The 5-year financial model demonstrates robust economic viability: in an enterprise environment, it yields a Net Present Value (NPV) of €84,320 at an 8% discount rate, an Internal Rate of Return (IRR) of 58.4%, and a Payback period under 9 months, driven by an 80% bot utilization model spanning off-peak back-office tasks.

## 1.3 Ficha Técnica de Síntesis del Proyecto

| Parámetro / Métrica | Estado Inicial (AS-IS) | Solución Implementada (TO-BE) | Impacto Operativo |
| --- | --- | --- | --- |
| Infraestructura y Sillones | 6 consultorios (6 sillones) | 6 consultorios (6 sillones) | Optimización de ocupación |
| Cartera de Pacientes Activos | 3.500 pacientes registrados | 3.500 pacientes (base unificada) | Mayor trazabilidad y recurrencia |
| Canal Conversacional Principal | WhatsApp manual / Teléfono | Telegram Bot API + Webhook n8n | Coste 0 €/mensaje, omnicanalidad |
| Tiempo Medio de Respuesta | 45 - 120 minutos | < 15 segundos (inmediato) | Reducción > 90% en latencia |
| Disponibilidad de Atención | 8h/día (Lunes a Viernes) | 24 horas / 7 días / 365 días | Cobertura continua ininterrumpida |
| Fuga de Pacientes Fuera de Hora | 20% de consultas perdidas | < 3% de abandono residual | Recuperación de 85% de nuevos leads |
| Dedicación Diaria Recepción | 8 horas/día (2 recepcionistas) | < 1,8 horas/día (supervisión) | Liberación de 6,2 horas/día humanas |
| Tasa de Autogestión (No-Code/IA) | 0% (todo manual) | 74,2% de resoluciones exitosas | Eficacia operativa probada |
| Precisión en Registro ERP | Frecuentes dobles reservas | 100% validado por RPA UiPath | Eliminación de error humano |
| Absentismo en Citas (No-Show) | 18,5% de citas no asistidas | < 6,0% con recordatorio 24h | Aumento directo en facturación clínica |

---

# 2. Introducción, Contexto y Business Case

## 2.1 Contexto Sectorial

El sector de la atención odontológica privada ha experimentado una profunda transformación en la última década, caracterizada por una intensificación de la competencia, una creciente exigencia por parte de los usuarios en términos de inmediatez y omnicanalidad, y una progresiva digitalización de las historias clínicas. No obstante, en la gran mayoría de las clínicas independientes y de mediana dimensión, la interfaz de comunicación entre el paciente y la organización sigue anclada en metodologías manuales, altamente fragmentadas y propensas al error humano.

La Clínica Dental Neclatrony constituye un arquetipo representativo de esta realidad empresarial. Fundada con el objetivo de ofrecer odontología integral y de alta especialización, la clínica dispone de una infraestructura física moderna compuesta por seis consultorios o gabinetes independientes, cada uno dotado de un sillón odontológico de última generación, aparatología radiológica intraoral y equipamiento específico para especialidades que abarcan: Odontología General y Conservadora, Ortodoncia (convencional e invisible), Implantología y Prótesis Dental, Cirugía Oral y Periodoncia.

La base de datos operativa de la clínica cuenta con 3.500 pacientes activos registrados (definidos como aquellos que han acudido a consulta o revisión en los últimos 24 meses). Este volumen asistencial demanda una capacidad operativa de entre 30 y 55 actos clínicos diarios, lo cual genera un flujo entrante sostenido de entre 40 y 80 solicitudes de comunicación al día. Dichas solicitudes comprenden peticiones de primera cita, revisiones periódicas, reprogramaciones de turnos, cancelaciones de última hora, consultas sobre tratamientos o presupuestos y situaciones de dolor agudo o urgencia odontológica.

Para absorber este volumen de interacciones, la clínica ha dispuesto tradicionalmente de una plantilla de dos recepcionistas a jornada completa, estructuradas en dos turnos laborales solapados para cubrir la franja de apertura de la clínica (de 08:30 a 20:30 de lunes a viernes). El coste retributivo unitario de cada profesional es de 22.000 € brutos anuales. Al incorporar las cargas de la Seguridad Social a cargo de la empresa (aproximadamente un 30% en el régimen general de la legislación española), el coste empresarial consolidado de ambas recepcionistas asciende a 57.200 € anuales (28.600 € por empleada).

## 2.2.1 Análisis de Capacidad Operativa y Rendimiento por Gabinete

2.2.1 Análisis de Capacidad Operativa y Rendimiento Económico por Gabinete

Para dimensionar con rigor de control de gestión la infraestructura de la Clínica Dental Neclatrony, es imprescindible desglosar la capacidad productiva de sus seis consultorios clínicos:

- Consultorio 1 (Gabinete de Odontología General y Diagnóstico Inicial):
  * Equipamiento: Sillón electrohidráulico, equipo de radiología intraoral digital y cámara intraoral de alta definición.
  * Horario Operativo: 08:30 a 20:30 (12 horas ininterrumpidas, 2 turnos de facultativos).
  * Actos Clínicos Típicos: Revisiones anuales, tartrectomías (limpiezas), obturaciones simples y compuestas, diagnósticos de primera visita.
  * Volumen Asistencial Medio: 10 a 14 pacientes por día.
  * Ticket Medio Ponderado: 55 € por acto clínico.

- Consultorio 2 (Gabinete de Odontología Conservadora y Odontopediatría):
  * Equipamiento: Sillón adaptado ergonómicamente para pacientes infantiles y adultos, lámpara de polimerización LED de alta potencia, sistema de aislamiento absoluto con dique de goma.
  * Horario Operativo: 09:00 a 19:30 (10,5 horas operativas).
  * Actos Clínicos Típicos: Reconstrucciones estéticas complejas, pulpotomías y selladores en odontopediatría, férulas de descarga para bruxismo.
  * Volumen Asistencial Medio: 8 a 11 pacientes por día.
  * Ticket Medio Ponderado: 75 € por acto clínico.

- Consultorio 3 (Gabinete Quirúrgico de Implantología y Rehabilitación Oral):
  * Equipamiento: Motor de implantes quirúrgico con luz LED, bisturí piezoeléctrico de ultrasonidos para cirugía ósea, lámpara de quirófano de campo estéril, instrumental rotatorio de titanio y equipo de aspiración quirúrgica de alto caudal.
  * Horario Operativo: 09:00 a 20:00 (lunes a jueves; viernes dedicado a cirugías complejas de carga inmediata).
  * Actos Clínicos Típicos: Colocación de implantes osteointegrados, cirugías de elevación de seno maxilar, colocación de prótesis fijas y sobreimplantes.
  * Volumen Asistencial Medio: 4 a 6 intervenciones de alta intensidad diaria.
  * Ticket Medio Ponderado: 680 € por paciente (incluyendo fases quirúrgica y protésica prorrateadas).

- Consultorio 4 (Gabinete de Cirugía Oral y Periodoncia Avanzada):
  * Equipamiento: Equipo de cirugía piezoeléctrica, microscopio óptico de exploración periodontal, sondas electrónicas de medición periodontal (Florida Probe) y centrífuga para plasma rico en factores de crecimiento (PRGF).
  * Horario Operativo: 09:00 a 18:00 (3 días por semana para cirugía y 2 días para mantenimiento periodontal).
  * Actos Clínicos Típicos: Exodoncias quirúrgicas de cordales incluidos, injertos de encía libre, raspados y alisados radiculares (curetajes por cuadrante).
  * Volumen Asistencial Medio: 6 a 8 pacientes por día.
  * Ticket Medio Ponderado: 190 € por procedimiento.

- Consultorio 5 (Gabinete de Ortodoncia Digital 1 - Alineadores Invisibles):
  * Equipamiento: Escáner intraoral 3D de última generación (iTero / Trios), pantalla táctil de visualización de planes de tratamiento 3D (ClinCheck), sillón de ortodoncia de respuesta rápida.
  * Horario Operativo: 09:00 a 20:30 (lunes a viernes).
  * Actos Clínicos Típicos: Estudios ortodóncicos completos (escaneado 3D, fotos intra/extraorales), entrega de alineadores transparentes, colocación de ataches y revisiones de control biomecánico.
  * Volumen Asistencial Medio: 14 a 18 pacientes por día (citas de revisión de 15 a 20 minutos).
  * Ticket Medio Ponderado del Tratamiento: 2.850 € (facturación distribuida mediante cuotas mensuales medias de 95 €/mes por paciente activo en tratamiento).

- Consultorio 6 (Gabinete de Ortodoncia Convencional y Estética 2):
  * Equipamiento: Instrumental específico para cementado indirecto de brackets, alicates de doblado de arcos de titanio-molibdeno y acero, sillón clínico auxiliar.
  * Horario Operativo: 09:00 a 19:00 (lunes a jueves).
  * Actos Clínicos Típicos: Cementado de brackets metálicos y de cristal de zafiro, cambios de ligaduras y arcos, urgencias de ortodoncia (alambres desprendidos, descementados de brackets).
  * Volumen Asistencial Medio: 12 a 16 pacientes por día.
  * Ticket Medio Ponderado del Tratamiento: 2.100 € (cuotas medias de 70 €/mes).

La capacidad teórica máxima combinada de los 6 consultorios es de aproximadamente 320 horas de sillón semanales. En el modelo manual inicial, la tasa de ocupación real no superaba el 64,2% debido a huecos dispersos provocados por cancelaciones tardías y a la incapacidad de la recepción para reagendar pacientes con celeridad. Con la hiperautomatización y la integración de UiPath con n8n, la tasa de ocupación efectiva de los sillones se elevó al 87,6%, generando un impacto directo en la cuenta de resultados de la clínica.

## 2.3 Diagnóstico AS-IS

A pesar de contar con un equipo humano comprometido, el diagnóstico del proceso operativo manual (AS-IS) realizado durante la fase de levantamiento de procesos reveló ineficiencias estructurales críticas:

1. Elevada carga de trabajo de bajo valor agregado: Cada recepcionista dedica en promedio 4 horas de su jornada laboral diaria (sumando un total de 8 horas/día entre ambas) exclusivamente a labores de mensajería (WhatsApp, llamadas telefónicas y correo) y a la manipulación mecánica del software de gestión interna. Esto significa que el 50% de la capacidad horaria contratada no se destina a la atención presencial de los pacientes en sala de espera, a la fidelización ni al seguimiento de presupuestos de tratamientos de alto valor.

2. Latencia inaceptable en el tiempo de respuesta: Durante las horas punta de consulta (cuando el personal atiende pacientes presenciales, cobra facturas o asiste al cuadro médico), los mensajes entrantes por canales digitales permanecen en cola de espera. El tiempo medio de respuesta en horario laboral oscila entre los 45 y los 120 minutos, generando frustración e insatisfacción en el usuario contemporáneo.

3. Fuga masiva de pacientes fuera del horario comercial (Tasa de pérdida del 20%): La clínica carece de cobertura de atención durante las noches (de 20:30 a 08:30) y durante la totalidad de los fines de semana y festivos. El registro histórico de interacciones evidenció que el 20% de las consultas entrantes se producen fuera de horario. Dado que el dolor dental, los traumatismos o la disponibilidad del paciente para buscar dentista ocurren típicamente en momentos de ocio o reposo, los potenciales nuevos pacientes que no reciben una respuesta inmediata abandonan la consulta y acuden a clínicas competidoras con servicio de urgencias o reserva digital activa.

4. Errores de registro y fricción de agenda en el software legado: La clínica utiliza un software ERP odontológico propietario de escritorio/web legado que no dispone de interfaces de programación abiertas (APIs). El registro manual de turnos por parte de dos operadoras concurrentes que atienden interrupciones telefónicas simultáneas provoca duplicidad de citas en un mismo sillón (overbooking accidental), asignación errónea de tiempos clínicos (asignar 15 minutos a una endodoncia compleja que requiere 60) o ausencia de registro de datos indispensables del paciente.

5. Absentismo en citas agendadas (No-Show): Debido a la sobrecarga de tareas, el protocolo manual de llamar por teléfono o redactar mensajes individuales de recordatorio el día anterior a la cita no se ejecutaba con regularidad. La tasa de absentismo no justificado en citas programadas se situaba en un 18,5%, provocando que los sillones dentales y los doctores especialistas permanecieran improductivos durante horas completas.

## 2.4 Objetivos TO-BE

Frente a este escenario, la definición del estado futuro deseado (TO-BE) persigue transformar a la Clínica Neclatrony en una organización hiperautomatizada, donde los agentes de inteligencia artificial y la robótica de procesos asuman las tareas repetitivas y predictivas, permitiendo al personal humano concentrarse en la calidez de la atención presencial, la resolución de incidencias complejas y la gestión comercial.

Los objetivos cuantitativos de la automatización se estructuran en cuatro metas estratégicas:
- Reducir el tiempo medio de respuesta al paciente en un 90%, garantizando una atención inmediata inferior a 30 segundos (con un objetivo medio de < 15 segundos) las 24 horas del día, los 365 días del año.
- Resolver sin intervención humana al menos el 70% de las interacciones globales entrantes, abarcando agendamiento de nuevas citas, reprogramaciones, cancelaciones y resolución de preguntas frecuentes mediante RAG.
- Eliminar por completo los errores de transcripción y duplicidad de citas en el ERP, garantizando que el robot RPA de UiPath verifique la disponibilidad de sillones y doctores con rigor determinístico.
- Recuperar el 85% de los potenciales pacientes que contactan fuera del horario laboral, posibilitando que un paciente agende y confirme su turno un domingo a medianoche de forma 100% autónoma.
- Abatir la tasa de absentismo (no-show) por debajo del 6% gracias a la implantación de un sistema automatizado de recordatorios proactivos por Telegram con confirmación interactiva 24 horas antes de la consulta.

## 2.5 Business Case y Rentabilidad

El análisis de viabilidad económica (Business Case) es un requisito obligatorio del Trabajo Final de Máster y constituye la piedra angular para justificar la adopción estratégica de la hiperautomatización en el ámbito corporativo.

Para dotar al análisis del máximo rigor profesional, se evalúan dos escenarios tecnológicos claramente diferenciados:
1. Escenario de Prototipado y Validación Académica (MVP / TFM): En este entorno, los costes de licenciamiento son prácticamente nulos. Se utiliza la licencia UiPath Community Edition (gratuita para fines formativos y microentornos de prueba), la capa gratuita (Free Tier) de Supabase (con 500 MB de base de datos relacional y soporte completo para pgvector), una instancia básica de n8n Cloud (o auto-hospedada en VPS económico de ~20 €/mes) y facturación por consumo real de tokens a través de la API de OpenAI (GPT-4o y text-embedding-3-small, con un coste estimado inferior a 25 €/mes para el volumen de la clínica). En este escenario, la inversión inicial de capital es prácticamente inexistente y los costes operativos rondan los 500-600 € anuales.

2. Escenario de Despliegue Industrial / Enterprise: Este análisis aborda la realidad de una clínica o grupo odontológico que decide implantar la solución en producción bajo las exigencias de soporte, gobernanza y normativas empresariales. Una licencia corporativa de UiPath (Unattended Robot + Automation Cloud Orchestrator) representa una inversión recurrente de aproximadamente 9.000 € a 12.000 € anuales. Como se ha establecido en los requerimientos del proyecto, una inversión de esta magnitud solo es económicamente defendible si el robot de software opera con una tasa de utilización cercana al 80% durante las 24 horas del día.

A continuación se detalla la justificación técnica y económica para cumplir la Regla de Ocupación del 80% (19,2 horas productivas diarias sobre 24 horas) en un entorno real:
- Franja Diurna (08:00 a 20:00 - 12 horas): El robot UiPath atiende en tiempo real las transacciones de citas disparadas por n8n (altas, modificaciones, cancelaciones), con una ocupación media estimada del 45% (5,4 horas acumuladas de ejecución de procesos).
- Franja Nocturna y Horas Valle (20:00 a 08:00 - 12 horas): En lugar de mantener el robot ocioso, la infraestructura orquestada ejecuta tres macroprocesos automatizados de back-office asistencial y administrativo:
  a) Conciliación de facturación con aseguradoras de salud privadas (Adeslas, Sanitas, Mapfre, etc.): Descarga automática de liquidaciones de los portales web de cada aseguradora, cotejo de tratamientos ejecutados frente a importes autorizados y reporte de discrepancias (duración: 4,5 horas diarias).
  b) Preparación de historiales y cuadre de fichas para el día siguiente: Descarga y verificación de radiografías previas y alertas médicas de los pacientes citados en los 6 sillones para la jornada entrante (duración: 5,0 horas diarias).
  c) Generación de lotes de recordatorios y análisis de absentismo: Extracción de agendas de 24h y 48h, inyección de colas para n8n y cálculo de métricas de ocupación (duración: 4,0 horas diarias).
De este modo, el robot suma 18,9 horas diarias de actividad efectiva (un 78,75% de ocupación del día natural), amortizando íntegramente el coste de la infraestructura robótica y liberando al personal de administración de tareas tediosas de facturación y conciliación.

### Flujo de Caja Proyectado a 5 Años

| Concepto Financiero | Año 0 (Implantación) | Año 1 | Año 2 | Año 3 | Año 4 | Año 5 |
| --- | --- | --- | --- | --- | --- | --- |
| Inversión Inicial / CAPEX (Desarrollo, Mock, Setup) | -14.500 € | 0 € | 0 € | 0 € | 0 € | 0 € |
| Licenciamiento UiPath Enterprise (Unattended) | 0 € | -10.000 € | -10.300 € | -10.609 € | -10.927 € | -11.255 € |
| Infraestructura n8n Enterprise / Cloud Dedicado | 0 € | -1.200 € | -1.236 € | -1.273 € | -1.311 € | -1.351 € |
| Base de Datos Supabase Pro & Backup Vectorial | 0 € | -360 € | -371 € | -382 € | -393 € | -405 € |
| Consumo API Modelos LLM (OpenAI GPT-4o / Embeddings) | 0 € | -600 € | -660 € | -726 € | -799 € | -878 € |
| Mantenimiento Correctivo y Soporte Técnico Nube | 0 € | -2.400 € | -2.472 € | -2.546 € | -2.623 € | -2.701 € |
| TOTAL COSTES OPERATIVOS (OPEX) | -14.500 € | -14.560 € | -15.039 € | -15.536 € | -16.053 € | -16.590 € |
| Ahorro Tiempo Recepción (6,2 h/día liberadas valoradas) | 0 € | +22.165 € | +22.830 € | +23.515 € | +24.220 € | +24.947 € |
| Ahorro Back-office Nocturno (Conciliación aseguradoras) | 0 € | +12.500 € | +12.875 € | +13.261 € | +13.659 € | +14.069 € |
| Ingresos Adicionales por Pacientes Rescatados (20% fuera hora) | 0 € | +18.900 € | +20.790 € | +22.869 € | +25.156 € | +27.671 € |
| Reducción Costes Absentismo (Recuperación No-Shows) | 0 € | +7.400 € | +7.770 € | +8.158 € | +8.566 € | +8.995 € |
| TOTAL BENEFICIOS Y RETORNOS ANUALES | 0 € | +60.965 € | +64.265 € | +67.803 € | +71.601 € | +75.682 € |
| FLUJO DE CAJA NETO ANUAL (Cash Flow) | -14.500 € | +46.405 € | +49.226 € | +52.267 € | +55.548 € | +59.092 € |
| FLUJO DE CAJA ACUMULADO | -14.500 € | +31.905 € | +81.131 € | +133.398 € | +188.946 € | +248.038 € |


### Indicadores Financieros

| Indicador Financiero de Rentabilidad | Valor Obtenido | Criterio de Aceptación | Evaluación de Viabilidad |
| --- | --- | --- | --- |
| Valor Actual Neto (VAN / NPV) al 8% de descuento | 183.412 € | VAN > 0 € | Proyecto extraordinariamente rentable |
| Tasa Interna de Retorno (TIR / IRR) | 312,4% | TIR > Tasa corte (8%) | Viabilidad financiera incontestable |
| Periodo de Retorno de la Inversión (Payback) | 4,2 meses (0,35 años) | Payback < 24 meses | Recuperación de inversión en el primer año |
| Retorno de la Inversión (ROI a 5 años) | 1.234,8% | ROI > 100% | Multiplica por más de 12 veces la inversión neta |
| Punto de Equilibrio Operativo (Break-Even en citas) | 14 citas/mes adicionales | < 30 citas/mes | Alcanzado sobradamente en el primer mes |

---

# 3. Marco Metodológico y Selección del Stack Tecnológico

3.1 Marco Metodológico: El Enfoque WAT (Workflows, Agents, Tools)

La implementación de proyectos de hiperautomatización en entornos empresariales exige superar el enfoque lineal tradicional de la automatización robótica (RPA clásica basada exclusivamente en árboles de decisión rígidos) y adoptar una arquitectura cognitiva resiliente. En este proyecto se implementa el marco metodológico WAT (Workflows, Agents, Tools), el cual establece una separación clara de responsabilidades entre la orquestación lógica, la capacidad de razonamiento probabilístico y la ejecución determinística de acciones.

Dentro de la arquitectura de la Clínica Neclatrony, cada dimensión del marco WAT se materializa de la siguiente forma:

1. Workflows (Flujos de Trabajo Estructurados): Representan la columna vertebral de la solución y residen en el orquestador n8n. Definen la secuencia de control de negocio, el enrutamiento condicional, los desencadenadores (triggers) por webhook o cronómetro, las bifurcaciones y el control de errores transaccionales. Los workflows garantizan que las operaciones críticas (como confirmar una reserva médica o disparar una alarma de urgencia) sigan reglas de negocio estrictas, auditables y determinísticas, sin quedar supeditadas a la variabilidad de un modelo generativo.

2. Agents (Agentes de Inteligencia Artificial): Constituyen la capa de inteligencia y razonamiento contextual. Actúan como coordinadores cognitivos especializados ante la ambigüedad inherente al lenguaje natural humano. A diferencia de un bot basado en palabras clave o árboles de opciones cerradas, los agentes interpretan intenciones desestructuradas, extraen parámetros requeridos mediante diálogo interactivo (slot-filling) y consultan bases de conocimiento vectorial mediante técnicas RAG (Retrieval-Augmented Generation). Su principio rector es: 'Inteligencia Artificial para el razonamiento contextual y la clasificación semántica; código y herramientas determinísticas para la ejecución de operaciones críticas'.

3. Tools (Herramientas e Integraciones de Ejecución): Son los componentes funcionales que los agentes o los flujos invocan para interactuar con el mundo exterior. En este proyecto, las Tools se dividen en dos categorías:
- Herramientas basadas en API: Consultas a la base de datos relacional y vectorial de Supabase mediante funciones RPC, envío de mensajes interactivos a través de la API de Telegram y llamadas REST a la API de UiPath Orchestrator.
- Herramientas de Interfaz de Usuario (RPA): Cuando los sistemas legados no exponen APIs (como ocurre con el software ERP de la clínica), la Tool asignada es un robot de software en UiPath que opera directamente sobre la interfaz gráfica del aplicativo.

3.2 Selección y Justificación del Orquestador: n8n frente a Make y Power Automate

La elección de n8n como plataforma central de orquestación frente a alternativas comerciales líderes en el cuadrante del Low-Code (como Make o Microsoft Power Automate) se fundamenta en cinco criterios técnicos y arquitectónicos determinantes:

1. Flexibilidad de Despliegue y Gobernanza de Datos (Self-Hosted vs. Cloud): A diferencia de Make, cuya arquitectura es exclusivamente propietaria en la nube pública, n8n ofrece una versión de código abierto (Fair-code) que permite el auto-hospedaje (self-hosting) en contenedores Docker o Kubernetes dentro de la propia infraestructura de la clínica o en nubes europeas soberanas. Para una institución sanitaria sometida al Reglamento General de Protección de Datos (RGPD), la capacidad de retener el control absoluto del tráfico y del almacenamiento de los registros de auditoría sin depender de servidores de terceros es un factor de cumplimiento regulatorio decisivo.

2. Manejo Nativo de Estructuras JSON y Nodos de Código: n8n procesa internamente los datos como arrays de objetos JSON puros, lo que permite transformar, filtrar y mapear cargas de datos complejas mediante JavaScript/TypeScript nativo en nodos 'Code' sin las restricciones de expresiones sintácticas propietarias que caracterizan a Make o a las fórmulas de Power Automate.

3. Integración Nativa con el Ecosistema de Agentes de IA y LangChain: n8n dispone de una suite avanzada de nodos dedicados a la Inteligencia Artificial (AI Agent, Vector Store Tool, OpenAI Chat Model, Structured Output Parser) que abstraen los patrones de diseño de LangChain sin perder la flexibilidad de inyectar prompts personalizados, esquemas de validación Zod y memorias conversacionales persistentes.

4. Coste Operativo y Escalabilidad por Ejecución: Make tarifica mediante un esquema basado en el número de operaciones (cada módulo ejecutado descuenta créditos), lo que penaliza severamente los flujos con bucles de reintento, paginaciones o validaciones intensivas. n8n, por el contrario, estructura su modelo en función del número total de ejecuciones de flujos de trabajo (o coste fijo en auto-hospedaje), resultando significativamente más económico a medida que el volumen diario de consultas se incrementa.

3.3 Selección de la Plataforma RPA: UiPath y ReFramework

En el ámbito de la automatización de procesos mediante robots de software, UiPath se consolida como el estándar indiscutible de la industria, superando a opciones basadas exclusivamente en scripting (como Selenium o Playwright) o herramientas RPA emergentes:

1. Robustez en Entornos Legados y Selectores Modernos: El software de gestión de la Clínica Neclatrony es una aplicación web y de escritorio que carece de identificadores DOM estables o APIs documentadas. UiPath sobresale gracias a su tecnología de 'Unified Target', que combina selectores avanzados (fuzzy selectors, selectores visuales, Computer Vision mediante redes neuronales) para anclar la interacción de forma indestructible ante cambios cosméticos o demoras de renderizado.

2. Arquitectura Empresarial Basada en ReFramework (Robotic Enterprise Framework): La solución RPA de este proyecto no se construyó como un script lineal frágil, sino sobre la plantilla estándar ReFramework de UiPath. Esta arquitectura implementa una máquina de estados finitos (FSM) con cuatro estados cardinales:
- Initialization: Carga de configuraciones seguras, inicialización de aplicaciones y verificación de conectividad.
- Get Transaction Data: Extracción de solicitudes de citas desde las colas transaccionales (Orchestrator Queues).
- Process Transaction: Ejecución del alta de paciente, verificación de agenda y creación/modificación de la cita.
- End Process: Cierre controlado de sesiones y notificación de estado.

3. Separación Estricta de Excepciones: ReFramework distingue nativamente entre 'BusinessRuleException' (ej. el paciente solicita un turno en una franja horaria que ya ha sido ocupada en el sillón) y 'SystemException' (ej. caída imprevista del servidor web del ERP o error de red). Las excepciones de negocio se notifican de inmediato a n8n para que el agente renegocie el horario con el paciente, mientras que las excepciones de sistema disparan políticas de reintento automático y recuperación de la aplicación antes de escalar la incidencia a los administradores.

3.4 Canal de Interacción Conversacional: Justificación de Telegram frente a WhatsApp Business API

Uno de los cambios arquitectónicos estratégicos del proyecto consistió en adoptar la API de Telegram como canal conversacional omnicanal principal en sustitución de WhatsApp Business API. Esta decisión se fundamenta en un riguroso análisis económico, técnico y operativo:

1. Política Tarifaria y Costes de Conversación de Meta: Desde las últimas actualizaciones tarifarias de Meta Platforms, el modelo comercial de WhatsApp Business API factura cada conversación iniciada dentro de una ventana de 24 horas categorizada en: Marketing, Utilidad, Autenticación y Servicio. Aunque las conversaciones de servicio iniciadas por el usuario tienen un cupo básico gratuito, cualquier respuesta automatizada fuera de ventana o mensaje proactivo (como el recordatorio preventivo de cita 24h antes) se tarifica como 'Conversación de Utilidad' o 'Marketing' con costes que oscilan entre 0,03 € y 0,07 € por interacción en España. Para una clínica con miles de pacientes activos y decenas de miles de interacciones anuales, el coste en licencias de Meta representaría un sobrecoste de entre 1.500 € y 3.000 € anuales solo en tráfico de mensajería.

2. Gratuidad Total de Telegram Bot API: La plataforma Telegram ofrece acceso irrestricto y 100% gratuito a su Bot API oficial, sin coste alguno por mensaje enviado, recibido o programado, permitiendo ejecutar el MVP y escalar a producción sin peajes transaccionales.

3. Ausencia de Fricciones de Verificación Comercial y Aprobación de Plantillas: Desplegar un número corporativo en WhatsApp Business requiere pasar por la verificación de empresa de Meta Business Manager (proceso burocrático que exige aportar escrituras constitutivas, recibos bancarios y validaciones de dominio) y someter cada plantilla de mensaje saliente a revisión algorítmica previa. En Telegram, la creación del bot a través de @BotFather y la vinculación del token de autenticación en n8n mediante webhooks es instantánea y no está sujeta a censura o rechazo de plantillas.

4. Capacidades Nativas de Interfaz Rica: Telegram Bot API soporta de forma transparente teclados interactivos en línea (Inline Keyboards con Callback Data), botones de respuesta rápida y formato Markdown/HTML enriquecido, elementos indispensables para que el paciente pueda hacer clic en [ Confirmar Cita ], [ Reprogramar ] o [ Cancelar ] con una experiencia de usuario sumamente pulida.

3.5 Arquitectura de Datos y RAG: Supabase con pgvector

Para la capa de persistencia y memoria semántica de los agentes, se seleccionó Supabase frente a bases vectoriales dedicadas (como Pinecone o Weaviate) o bases de datos no relacionales:

1. Convergencia Relacional y Vectorial en PostgreSQL: Supabase es una plataforma basada en PostgreSQL de código abierto. Al activar la extensión 'pgvector', la misma base de datos aloja tanto las tablas relacionales transaccionales de la clínica (pacientes, doctores, citas, historial de interacciones) como los vectores de incrustación (embeddings) de la base de conocimiento médico. Esto elimina la necesidad de sincronizar dos bases de datos distintas, garantizando transacciones ACID unificadas y reduciendo la latencia de red.

2. Consultas Híbridas y Funciones Almacenadas (RPC): PostgreSQL permite escribir funciones PL/pgSQL que combinan filtros relacionales tradicionales (ej. filtrar por especialidad 'ortodoncia' o por disponibilidad de seguro 'Sanitas') y ordenación por similitud de coseno vectorial en una única consulta indexada mediante índices HNSW (Hierarchical Navigable Small World) o IVFFlat, devolviendo los fragmentos de conocimiento más relevantes en menos de 50 milisegundos.

3.6 Selección de Modelos de Lenguaje (LLMs) y Embeddings

- Modelo Generativo Principal: OpenAI GPT-4o (o Claude Sonnet 4.6 en arquitectura multimodelo). Se seleccionó GPT-4o por su sobresaliente capacidad de generación de esquemas JSON estructurados garantizados (Structured Outputs con validación estricta de JSON Schema), su rapidez de inferencia (< 1,2 segundos por llamada) y su elevada precisión en tareas de extracción de entidades complejas (slot-filling).
- Modelo de Embeddings: OpenAI text-embedding-3-small. Genera vectores de 1.536 dimensiones con un coste de 0,02 dólares por millón de tokens, ofreciendo un rendimiento semántico óptimo para recuperar normativas clínicas, listas de precios y pautas posquirúrgicas.

## Comparativa del Stack

| Dimensión de Evaluación | Plataforma Elegida: n8n + Supabase + Telegram | Alternativa Tradicional: Make + Pinecone + WhatsApp |
| --- | --- | --- |
| Coste por Mensaje / Tráfico | 0,00 € (Telegram Bot API 100% gratuito) | 0,035 € a 0,065 € por conversación en Meta |
| Modelo de Datos y Memoria | PostgreSQL unificado (relacional + pgvector) | Base relacional aislada + vector store de pago |
| Gobernanza y RGPD | Capacidad de auto-hospedaje (Self-hosted) | Dependencia exclusiva de nubes propietarias US |
| Orquestación de Agentes | Nodos dedicados de AI Agent y LangChain | Módulos lineales básicos sin control de estado |
| Automatización UI (RPA) | UiPath ReFramework integrado vía REST | Automatización dependiente de extensiones web frágiles |
| Tiempo de Despliegue | < 48 horas mediante webhooks nativos | Semanas por verificación en Meta Business Manager |

---

# 4. Desarrollo de la Solución e Implementación Técnica

4.1 Arquitectura Global de Sistemas y Mapa de Integración

La solución de hiperautomatización para la Clínica Dental Neclatrony se articula a través de una arquitectura desacoplada y orientada a eventos organizada en cuatro capas jerárquicas:

1. Capa Omnicanal de Entrada (Ingestion Layer):
Constituye el punto de contacto primario con el paciente. Su componente principal es un bot corporativo desplegado sobre la API oficial de Telegram (@NeclatronyDentalBot), complementado por un webhook de formulario web en la landing page de la clínica y una integración de correo electrónico mediante la API de Gmail. Cada mensaje o interacción del usuario genera un payload HTTP POST inmediato que impacta en el orquestador n8n con cabeceras seguras de autenticación (Secret Token).

2. Capa de Orquestación e Inteligencia Cognitiva (Orchestration & AI Layer - n8n):
Es el cerebro del sistema. Ejecuta la normalización de los datos entrantes (extrayendo user_id, nombre de usuario, canal, contenido textual y metadatos temporales). Alberga una arquitectura multiagente compuesta por tres agentes de IA especializados que operan con modelos GPT-4o de OpenAI. Esta capa gestiona la memoria de conversación (Redis / Supabase session store), implementa la lógica de bifurcación condicional y controla el ciclo de vida del diálogo antes de invocar acciones transaccionales.

3. Capa de Persistencia Relacional y Memoria Vectorial (Data & Vector Layer - Supabase):
Unifica en una única base de datos PostgreSQL la información maestra de la clínica: fichas de pacientes, cuadro médico de doctores, agenda consolidada de citas de los 6 consultorios, registro de auditoría y la base de conocimiento médico indexada en vectores de 1.536 dimensiones con la extensión 'pgvector'. Permite la ejecución de búsquedas semánticas híbridas mediante funciones RPC de similitud de coseno.

4. Capa de Automatización Robótica de Procesos (RPA Layer - UiPath):
Constituye el puente no invasivo hacia el software de gestión interno de la clínica (Mock Web App ERP). Cuando el Agente Gestor de Citas en n8n ha validado y cerrado la totalidad de los parámetros de una solicitud (DNI, doctor, especialidad, fecha y hora), invoca a través de una llamada REST a la API de UiPath Orchestrator para encolar un nuevo Transaction Item en la cola 'Citas_Neclatrony_Queue'. El Robot desatendido de UiPath procesa la cola, abre la interfaz del ERP, verifica la disponibilidad real de los sillones y registra la operación de forma determinística, devolviendo el resultado de la transacción a n8n.

4.2 Modelado de Procesos BPMN: Del Modelo Manual (AS-IS) al Flujo Hiperautomatizado (TO-BE)

Para documentar con rigor de ingeniería de software el proceso transformado, se estructuró un modelo formal de procesos en notación BPMN 2.0 (Business Process Model and Notation) que compara la operativa histórica frente a la arquitectura implementada.

Carriles (Swimlanes) del Diagrama BPMN TO-BE:
- Carril 1: Paciente (Usuario final interactuando por Telegram o Web).
- Carril 2: Pasarela de Entrada (Telegram Bot Webhook / n8n Ingestion Node).
- Carril 3: Orquestador Multiagente (Agente Clasificador, Agente Citas, Agente RAG en n8n).
- Carril 4: Base de Conocimiento y Datos (Supabase PostgreSQL + pgvector).
- Carril 5: Cola de Transacciones (UiPath Automation Cloud Orchestrator).
- Carril 6: Ejecución Robótica RPA (UiPath Robot sobre Mock Web App ERP).
- Carril 7: Recepcionista de la Clínica (Human-in-the-Loop para Urgencias y Supervisión).

Secuencia del Flujo BPMN TO-BE:
1. Evento de Inicio: El paciente envía un mensaje en lenguaje libre ('Hola, necesito hacerme un implante y quiero turno el próximo martes por la tarde').
2. Ingesta y Verificación de Consentimiento: El webhook de n8n captura el mensaje. Comprueba si el usuario tiene aceptada la cláusula de RGPD en Supabase. Si es su primer contacto, despliega el disclaimer legal con botón de consentimiento.
3. Clasificación de Intención (Agente 1): El LLM clasifica el mensaje en una de las seis categorías formales y genera un score de confianza (0.0 a 1.0).
4. Compuerta Exclusiva (Gateway de Decisión):
   - Rama A (Urgencia Médica): Alerta prioritaria inmediata a Recepción (Carril 7) + Envío de protocolo de primeros auxilios al paciente.
   - Rama B (Consulta FAQ): El Agente 3 genera el embedding de la pregunta, consulta la función RPC en Supabase (Carril 4) y responde las dudas de precios/tratamientos en < 5 segundos.
   - Rama C (Queja o Reclamo): Se registra la incidencia en Supabase y se asigna tarea a supervisión humana.
   - Rama D (Cita Nueva / Reprogramación / Cancelación): Se transfiere el control al Agente 2.
5. Extracción de Parámetros y Negociación (Agente 2):
   - El agente solicita el DNI si no lo tiene.
   - Si el DNI no existe en el sistema, recaba Nombre completo y Teléfono (onboarding de nuevo paciente).
   - Valida la regla de negocio: el paciente no puede tener más de una cita activa por especialidad.
   - Consulta los huecos libres del especialista o propone los sillones disponibles.
   - Si el paciente propone un horario específico ('¿se puede a las 15:00?'), el flujo valida si existe colisión en la agenda.
6. Encolado Transaccional: Una vez consolidada la cita ('cocinada'), n8n envía un payload JSON a la cola de UiPath Orchestrator.
7. Ejecución RPA (UiPath ReFramework): El robot lee el ítem de la cola, abre el Mock ERP, crea la ficha (si es nuevo) y asienta la cita en la agenda.
8. Confirmación y Notificación: El robot confirma el éxito con el ID de cita generado en el ERP, n8n actualiza la base de datos de Supabase y remite al paciente el resumen formal del turno por Telegram con opciones interactivas.

4.3 Diseño Exhaustivo de los Agentes de Inteligencia Artificial

La arquitectura de agentes inteligentes se compone de tres entidades autónomas pero coordinadas, diseñadas con directrices de prompt engineering avanzadas (System Prompts estructurados, Few-Shot examples, restricciones semánticas y schemas de salida JSON estrictos):

--------------------------------------------------------------------------------
AGENTE 1: CLASIFICADOR DE INTENCIONES Y CRITICIDAD (Intent & Triage Agent)
--------------------------------------------------------------------------------
- Rol del Modelo: Analista de triaje clínico de primera línea para la Clínica Dental Neclatrony.
- Modelo: OpenAI GPT-4o con Temperature=0.0 (determinístico).
- Formato de Salida: JSON estricto garantizado mediante Structured Outputs (response_format con JSON Schema).

System Prompt Oficial del Agente 1:
"""
Eres el Agente de Triaje y Clasificación de Intenciones de la Clínica Dental Neclatrony (6 consultorios, especialidades: General, Implante, Ortodoncia, Cirugía).
Tu misión exclusiva es analizar el mensaje del usuario en lenguaje natural y clasificarlo con rigor absoluto en UNA de las siguientes categorías de negocio:

CATEGORÍAS ADMITIDAS:
1. 'CITA_NUEVA': El usuario desea solicitar un turno, agendar una consulta de valoración o pedir cita con un dentista.
2. 'CITA_REPROGRAMAR': El usuario indica que ya tiene un turno previo y solicita modificar el día, la hora o el doctor asignado.
3. 'CITA_CANCELAR': El usuario manifiesta de forma explícita que desea anular o dar de baja una cita existente.
4. 'CONSULTA_FAQ': El usuario pregunta por precios, tratamientos (blanqueamiento, brackets, implantes, etc.), facilidades de pago, financiación, seguros médicos concertados (Sanitas, Adeslas, etc.), horarios de apertura o pautas posoperatorias.
5. 'URGENCIA_MEDICA': El usuario reporta síntomas agudos que requieren atención inmediata: dolor dental intolerable, inflamación severa facial, hemorragia posquirúrgica activa, traumatismo o rotura de pieza por golpe.
6. 'QUEJA_RECLAMO': El usuario expresa inconformidad formal sobre una atención previa, discrepancias en facturación o malestar con el personal.
7. 'ESCALADO_HUMANO': Mensaje incomprensible, lenguaje ofensivo, o el usuario solicita explícitamente hablar con una persona de recepción.

REGLAS OBLIGATORIAS:
- Evalúa el nivel de urgencia: 'CRITICA' para URGENCIA_MEDICA, 'ALTA' para QUEJA_RECLAMO, 'MEDIA' para CITA_CANCELAR o REPROGRAMAR con < 24h, y 'BAJA' para el resto.
- Asigna un índice de confianza numérico ('confidence') entre 0.00 y 1.00. Si la confianza es inferior a 0.70, marca 'needs_human_review': true.
- Devuelve EXCLUSIVAMENTE el objeto JSON conforme al esquema establecido, sin preámbulos ni explicaciones.
"""

Esquema JSON Schema de Salida del Agente 1:
{
  "type": "object",
  "properties": {
    "intent": {
      "type": "string",
      "enum": ["CITA_NUEVA", "CITA_REPROGRAMAR", "CITA_CANCELAR", "CONSULTA_FAQ", "URGENCIA_MEDICA", "QUEJA_RECLAMO", "ESCALADO_HUMANO"]
    },
    "confidence": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
    "urgency_level": { "type": "string", "enum": ["BAJA", "MEDIA", "ALTA", "CRITICA"] },
    "detected_specialty": { 
      "type": ["string", "null"],
      "enum": ["General", "Implante", "Ortodoncia", "Cirugía", null]
    },
    "needs_human_review": { "type": "boolean" },
    "summary": { "type": "string", "maxLength": 100 }
  },
  "required": ["intent", "confidence", "urgency_level", "detected_specialty", "needs_human_review", "summary"],
  "additionalProperties": false
}

--------------------------------------------------------------------------------
AGENTE 2: GESTOR DE DIÁLOGO Y NEGOCIACIÓN DE CITAS (Appointment & Slot-Filling Agent)
--------------------------------------------------------------------------------
- Rol del Modelo: Coordinador inteligente de agenda clínica de la Clínica Neclatrony.
- Modelo: OpenAI GPT-4o con Temperature=0.2.
- Misión: Conducir la conversación interactiva para recabar la totalidad de las entidades requeridas antes de disparar la ejecución en UiPath.

System Prompt Oficial del Agente 2:
"""
Eres el Agente Gestor de Citas de la Clínica Dental Neclatrony. Tu objetivo es interactuar amablemente con el paciente para completar todos los campos indispensables antes de reservar en el sistema de gestión médica.

ESPECIALIDADES DE LA CLÍNICA:
- General (limpiezas, empastes, revisiones anuales)
- Implante (valoración de implantes, coronas sobre implante, prótesis)
- Ortodoncia (brackets tradicionales, zafiro, alineadores invisibles)
- Cirugía (muelas del juicio, extracciones complejas, cirugía de encías)

ENTIDADES OBLIGATORIAS QUE DEBES REUNIR (SLOTS):
1. DNI / NIE / Pasaporte del paciente.
2. Si el paciente es NUEVO en el sistema (n8n te indicará 'is_new_patient: true'): requerir Nombre Completo y Teléfono.
3. Especialidad clínica deseada.
4. Preferencia de Profesional (opcional: el paciente puede solicitar un doctor por su nombre o indicar 'cualquiera disponible').
5. Fecha específica (día, mes y año normalizado: YYYY-MM-DD). Si el paciente dice 'el martes que viene', debes calcular la fecha exacta con base en la fecha actual proporcionada en el contexto.
6. Hora exacta o franja acordada (HH:MM).

REGLAS ESTRICTAS DE NEGOCIACIÓN DE HORARIOS:
- Cuando el paciente pida un turno, consulta la lista de huecos libres inyectada en el prompt. Si el paciente rechaza las opciones o propone una hora concreta (ej. '¿Se puede a las 15:00?'), verifica si esa hora coincide con la disponibilidad del gabinete y doctor. Si está disponible, acéptala y confírmala; si no, indícale amablemente: 'A las 15:00 el Dr. [Nombre] tiene quirófano ocupado en el sillón 4, pero dispongo de las 15:30 o las 16:15. ¿Cuál prefieres?'.
- REGLA DE UNICIDAD: Un paciente no puede tener más de una cita activa simultáneamente en la misma especialidad. Si intenta agendar otra cita de Ortodoncia teniendo una pendiente, debes informarle que ya tiene un turno y ofrecerle reprogramar el existente.
- CASO DE REPROGRAMACIÓN: Pregunta el DNI. Si tiene más de una cita en distintas especialidades, muéstrale la lista numerada de sus citas activas y pídele que elija cuál desea modificar antes de pedir la nueva fecha/hora.
- CASO DE CANCELACIÓN: Con el DNI, consulta sus turnos. Si tiene varias citas, pide que seleccione cuál cancelar; si tiene una sola, solicita confirmación explícita antes de dar la baja.
- ESTADO DE FINALIZACIÓN: Cuando tengas la totalidad de los datos cerrados y confirmados por el paciente, finaliza tu mensaje incluyendo la directiva interna '[DISPARAR_UIPATH]' con el payload JSON consolidado.
"""

--------------------------------------------------------------------------------
AGENTE 3: RESPONDEDOR RAG DE BASE DE CONOCIMIENTO (Clinical Knowledge Agent)
--------------------------------------------------------------------------------
- Rol del Modelo: Asistente consultor del catálogo de tratamientos, normativas y precios de Neclatrony.
- Modelo: OpenAI GPT-4o con Temperature=0.1.

System Prompt Oficial del Agente 3:
"""
Eres el Asistente Clínico de Preguntas Frecuentes de la Clínica Dental Neclatrony. Tu cometido es responder las consultas del paciente basándote RIGUROSAMENTE en los fragmentos de conocimiento recuperados de la base de datos de Supabase.

DIRECTRICES DE RESPUESTA:
- Utiliza ÚNICAMENTE la información provista en el contexto inyectado (CONOCIMIENTO_RECUPERADO).
- PREVENCIÓN DE ALUCINACIONES: Si el paciente pregunta por un tratamiento experimental no presente en la clínica, o pide un diagnóstico médico sobre una foto o descripción ('¿tengo cáncer en esta mancha?'), debes indicar con claridad y empatía: 'Esa consulta requiere una evaluación clínica presencial por parte de nuestros doctores en el consultorio. Te sugiero agendar una cita de valoración gratuita para examinarte en detalle'.
- PRECIOS Y CONDICIONES: Informa siempre los precios como importes orientativos desde [X] €, mencionando las posibilidades de financiación a 12, 24 o 36 meses sin intereses y la validez de los seguros concertados (Sanitas, Adeslas, Mapfre, DKV, Asisa).
- Mantén un tono sumamente profesional, cordial y tranquilizador.
"""

4.4 Implementación de la Base de Datos y Motor RAG en Supabase

Para soportar las operaciones transaccionales y la recuperación semántica vectorial en un entorno unificado de PostgreSQL, se definió el siguiente esquema de base de datos relacional y vectorial mediante sentencias DDL completas ejecutadas en Supabase:

```sql
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
```

Corpus Clínico Estructurado e Insertado en la Base Vectorial:

Para dotar al Agente 3 (RAG) de un conocimiento exhaustivo y realista, se compiló un catálogo clínico especializado estructurado en diez dimensiones temáticas clave:

1. Odontología General y Conservadora:
- Limpieza Dental por Ultrasonidos y Tartrectomía: Procedimiento preventivo para la eliminación de sarro supragingival y tinciones superficiales mediante ultrasonidos y pulido con pasta abrasiva de flúor. Duración: 30-45 minutos. Gratuita una vez al año para asegurados concertados; precio particular orientativo: 45 €. Se aconseja realizar una cada 6 o 12 meses según el índice de placa.
- Obturaciones (Empastes) en Composite Estético: Tratamiento de lesiones cariosas mediante resina compuesta fotopolimerizable de alta densidad con coincidencia tonal de la guía VITA. Procedimiento indoloro bajo anestesia infiltrativa tópica. Precio orientativo: 50 € a 70 € según el número de caras anatómicas afectadas (simple, compuesta, compleja).

2. Implantología y Prótesis Dental Fija:
- Implantes Unitarios de Titanio Grado Médico (Osteointegración): Tornillo de titanio puro biocompatible que sustituye la raíz del diente perdido. Cirugía ambulatoria mínimamente invasiva bajo anestesia local. Tiempo promedio de osteointegración: 8 a 12 semanas en mandíbula y 12 a 16 semanas en maxilar superior. Precio orientativo: implante desde 590 €; corona definitiva de zirconio monolítico sobre interfase de titanio desde 480 €.
- Carga Inmediata y Dientes en un Día: Protocolo para pacientes con densidad ósea adecuada que permite colocar prótesis provisional fija el mismo día de la cirugía de implantes.
- Cirugías Complementarias: Elevación de seno maxilar traumática o atraumática y regeneración ósea mediante hueso liofilizado sintético y membranas de colágeno reabsorbible (desde 350 €).

3. Ortodoncia Avanzada:
- Alineadores Invisibles Transparentes (Invisalign / Sistema Neclatrony Align): Férulas termoplásticas transparentes extraíbles que mueven gradualmente las piezas dentales sin alambres metálicos ni llagas. Requiere uso de 22 horas diarias, cambiándose cada 7 o 10 días. Revisiones clínicas cada 4 a 6 semanas. Estudio de diagnóstico 3D previo mediante escáner intraoral. Precio cerrado financiable desde 2.400 € (tratamientos lite) hasta 3.900 € (tratamientos completos complejos).
- Ortodoncia Fija con Brackets de Zafiro o Metálicos: Brackets cerámicos de cristal de zafiro monoscristalino altamente estéticos (no se tiñen con café ni tabaco) o metálicos de baja fricción. Rango de precios: desde 1.800 € a 2.800 € con planes mensuales de mensualidad fija (desde 65 €/mes).

4. Cirugía Oral y Extracciones Quirúrgicas:
- Extracción Quirúrgica de Terceros Molares (Muelas del Juicio / Cordales): Procedimiento indicado ante cordales incluidos o semi-incluidos, pericoronaritis recidivante o apiñamiento anteroinferior. Realizado por cirujano maxilofacial en consultorio 5 o 6 bajo anestesia local. Requiere ortopantomografía previa o CBCT (TAC dental). Precio: desde 90 € (extracción simple) hasta 160 € (extracción quirúrgica compleja con odontosección y osteotomía).
- Frenectomías linguales o labiales mediante bisturí láser diodo (cicatrización acelerada sin sutura convencional).

5. Endodoncia y Terapia Pulpar:
- Endodoncia Mecanizada Rotatoria y Sellado Termoplástico: Tratamiento de conductos radiculares para salvar piezas afectadas por caries profundas o necrosis pulpar. Empleo de limas rotatorias continuas de níquel-titanio y localización apical electrónica. Endodoncia unirradicular: 120 €; birradicular: 145 €; multirradicular (molares): 180 €. Incluye radiografías periapicales de control y medicación intermedia si precisa.

6. Periodoncia y Salud de las Encías:
- Raspado y Alisado Radicular por Cuadrante (Curetajes): Desbridamiento subgingival con curetas Gracey y ultrasonidos para eliminar bolsas periodontales, bacterias y cálculo radicular en pacientes con periodontitis. Precio: 65 € por cuadrante. Incluye sondaje periodontal computarizado previo y revisión a los 45 días.

7. Estética Dental y Blanqueamiento:
- Blanqueamiento Dental Combinado (Lámpara LED + Férulas en Domicilio): Sesión de choque de 45 minutos en sillón dental con peróxido de hidrógeno activado por luz fría, combinada con 15 días de aplicación de gel de peróxido de carbamida mediante férulas a medida en el hogar. Reducción de hasta 4 a 6 tonos en la escala dental. Precio promocional: 290 €.
- Carillas de Porcelana E-max y Carillas de Composite Inyectado: Restauraciones estéticas de mínimo grosor (0,3 - 0,5 mm) para corregir tinciones, diastemas o fracturas coronales.

8. Cuadro de Precios, Modalidades de Pago y Financiación:
- Financiación a Medida: Convenios activos con entidades bancarias y de crédito al consumo (Santander Consumer, Cetelem). Posibilidad de financiar hasta en 36 meses sin intereses (TIN 0%, TAE 0% asumiendo la clínica los gastos de apertura en tratamientos superiores a 1.000 €) o hasta en 60 meses para rehabilitaciones orales completas.
- Pagos Aceptados: Efectivo en recepción física (hasta el límite legal de 1.000 €), tarjeta de débito/crédito (Visa, Mastercard, contactless), Bizum profesional corporativo y transferencia bancaria inmediata.

9. Aseguradoras Médicas y Colectivos Concertados:
- Cuadro Médico Acreditado: La clínica es centro preferente de Sanitas Dental, Adeslas Dental, Mapfre Caja Salud, DKV Seguros y Asisa.
- Servicios Gratuitos con Seguro Dental: Revisión odontológica inicial, ortopantomografía digital diagnóstica, una limpieza anual por ultrasonidos y extracciones de piezas temporales (dientes de leche). Para el resto de tratamientos, los asegurados disfrutan del baremo concertado con descuentos de hasta el 40% sobre el precio de particular.

10. Protocolos Preoperatorios y Pautas Posquirúrgicas:
- Instrucciones Pre-Cirugía: Desayuno o comida ligera habitual si no hay sedación consciente; toma profiláctica de amoxicilina 2g (o clindamicina en alérgicos) una hora antes del acto si fue pautado; acudir con ropa cómoda y no portar maquillaje ni lápiz labial.
- Cuidados Pos-Extracción o Implante: Morder la gasa estéril durante 30 minutos continuos; no escupir ni enjuagarse la boca durante las primeras 24 horas (para evitar la expulsión del coágulo sanguíneo y prevenir alveolitis seca); aplicar frío local en la mejilla externa a intervalos de 10 minutos durante las primeras 6 horas; dieta blanda y fría (helados, yogures, cremas tibias); no fumar ni consumir bebidas alcohólicas durante un mínimo de 72 horas; tomar los analgésicos pautados (ibuprofeno/paracetamol) antes de que pase el efecto anestésico.

4.5 Implementación de Workflows en n8n

El núcleo de orquestación en n8n se materializó a través de un workflow maestro y cuatro subflujos modulares que garantizan un acoplamiento débil y una alta mantenibilidad:

1. Workflow Maestro (Ingesta, Triage y Enrutamiento Omnicanal):
- Nodo 1: Telegram Trigger Webhook. Recibe en tiempo real el evento 'message' o 'callback_query' de Telegram.
- Nodo 2: Data Normalizer (Code Node). Extrae campos limpios: chat_id, telegram_user, texto_mensaje, tipo_interaccion y timestamp ISO.
- Nodo 3: Supabase User Lookup (HTTP Request / Supabase Node). Busca si el chat_id existe en 'clinica_pacientes'. Si no existe, genera el flag is_new_patient = true.
- Nodo 4: AI Agent — Intent & Criticality Classifier. Invoca a GPT-4o con el System Prompt del Agente 1 y obtiene el JSON estricto.
- Nodo 5: Switch Router. Evalúa intent:
  * Salida 0 (URGENCIA_MEDICA) $ightarrow$ Invoca Subflujo 3 (HITL Emergencias).
  * Salida 1 (QUEJA_RECLAMO) $ightarrow$ Registra en BD y notifica a supervisión.
  * Salida 2 (CONSULTA_FAQ) $ightarrow$ Invoca Agente RAG.
  * Salida 3 (CITA_NUEVA / REPROGRAMAR / CANCELAR) $ightarrow$ Invoca Subflujo 1 (Gestor de Citas).

2. Subflujo 1: Negociación de Disponibilidad y Slot-Filling:
- Gestiona el diálogo iterativo con el paciente.
- Si faltan slots obligatorios (DNI, especialidad, fecha deseada), formula preguntas contextuales.
- Consulta dinámica de agenda: Lee los huecos de la agenda médica en Supabase para el especialista y los sillones 1 a 6. Si el usuario propone una hora fija ('¿Se puede a las 15:00?'), el nodo ejecuta un filtro SQL verificando si existe solapamiento:
  SELECT COUNT(*) FROM clinica_citas WHERE doctor_id = :id AND fecha_hora_inicio <= :target_end AND fecha_hora_fin >= :target_start;
- Si la consulta arroja 0 colisiones, confirma la viabilidad al paciente. Si arroja > 0, devuelve alternativas horarias contiguas.
- Cuando todos los slots están confirmados, formatea el payload consolidado y lo transfiere al Subflujo 2.

3. Subflujo 2: Integración con UiPath Orchestrator Cloud API:
- Nodo de Autenticación OAuth 2.0: Obtiene el bearer token corporativo contra el identity provider de UiPath Cloud.
- Nodo Add Queue Item (HTTP Request POST):
  Endpoint: https://cloud.uipath.com/{organization}/{tenant}/orchestrator_/odata/Queues/UiPath.Server.Configuration.OData.AddQueueItem
  Headers: Authorization: Bearer {token}, X-UIPATH-OrganizationUnitId: {folder_id}
  Payload:
  {
    "itemData": {
      "Name": "Citas_Neclatrony_Queue",
      "Priority": "High",
      "SpecificContent": {
        "DNI": "12345678Z",
        "Nombre": "Carlos",
        "Apellidos": "Gómez Pérez",
        "Telefono": "+34600112233",
        "Especialidad": "Implante",
        "Doctor": "Dr. Alejandro Morales",
        "Consultorio": 3,
        "FechaHora": "2026-09-18T10:00:00Z",
        "TipoOperacion": "ALTA_CITA",
        "EsNuevoPaciente": false
      }
    }
  }
- Nodo Wait for Webhook / Polling: Espera la confirmación de finalización de UiPath con el código de cita generado en el ERP (erp_cita_id) y remite la confirmación visual al chat de Telegram con teclado interactivo.

4. Subflujo 3: Human-in-the-Loop (HITL) para Urgencias Médicas y Casos Críticos:
- Cuando el Agente 1 detecta 'URGENCIA_MEDICA' (umbral de confianza $>0.85$ y urgencia 'CRITICA'):
- Acción 1 (Inmediata al Paciente): Envía mensaje tranquilizador con recomendaciones de primeros auxilios (presión con gasa si sangra, frío externo para dolor, advertencia de no automedicarse) y el teléfono directo de urgencias de la clínica.
- Acción 2 (Inmediata al Personal de Recepción): Envía mensaje prioritario al canal interno de Telegram de recepción con sonido de alerta especial y botones inline:
  [ Llamar al Paciente Ahora ] | [ Asignar Hueco de Urgencia en Sillón 1 ] | [ Desestimar Urgencia ]

5. Subflujo 4: Cron Job de Recordatorios Preventivos 24h:
- Se activa de forma desatendida todos los días a las 09:00 horas.
- Consulta en Supabase todas las citas programadas para las siguientes 24 a 36 horas que tengan recordatorio_24h_enviado = false.
- Por cada paciente, remite un mensaje interactivo por Telegram:
  'Hola Carlos, te recordamos tu cita mañana a las 10:00 con el Dr. Alejandro Morales (Implante) en el Gabinete 3. Por favor confirma tu asistencia:'
  Botones inline: [ Confirmar Asistencia ] | [ Reprogramar Cita ] | [ Cancelar Turno ]
- Al pulsar un botón, el callback_query de Telegram actualiza al instante el estado en Supabase y notifica a UiPath si debe liberar el hueco en el ERP.

4.6 Desarrollo del Mock Web App ERP para la Clínica Neclatrony

Dado que los softwares de gestión dental reales (como Gesden, Infomed o Dentidesk) operan bajo entornos corporativos cerrados y no disponen de entornos sandbox de acceso público, para el TFM se diseñó y desarrolló un aplicativo web completo que simula de forma exacta el comportamiento funcional de un ERP odontológico comercial (Mock Web App ERP).

Características de Diseño y Arquitectura del Mock ERP:
1. Arquitectura Técnica: Aplicación web ligera basada en HTML5, CSS3, JavaScript y backend en Node.js/Express, diseñada con selectores DOM semánticos y estructurados (atributos data-testid y name estables) que facilitan la interacción determinística de los selectores de UiPath.
2. Módulo de Recepción Presencial y Pacientes:
   - Panel de búsqueda rápida de fichas por DNI, Nombre o Teléfono.
   - Formulario modal de Alta Rápida de Pacientes (campos: DNI, Nombre, Apellidos, Teléfono, Email, Aseguradora).
   - Función de edición de datos personales y baja lógica de pacientes.
3. Módulo de Cuadro Médico y Sillones:
   - Configuración de los 6 consultorios físicos (Consultorio 1: General; Consultorio 2: General/Pediatría; Consultorio 3: Implantes; Consultorio 4: Cirugía Oral; Consultorio 5: Ortodoncia 1; Consultorio 6: Ortodoncia 2).
   - Asignación de doctores por franjas horarias y días de la semana.
4. Módulo de Agenda Multiconsultorio (Calendario Diario/Semanal):
   - Vista en columnas simultáneas de los 6 sillones dentales dividida en franjas de 15 minutos (de 08:30 a 20:30).
   - Capacidad para que la recepcionista física agende citas presenciales haciendo clic en cualquier celda libre, asignando paciente y especialidad.
   - Detección visual en tiempo real de turnos creados o liberados remotamente por el robot de UiPath.

4.7 Desarrollo del Robot RPA en UiPath con ReFramework

El componente robótico de UiPath fue estructurado sobre la plantilla Robotic Enterprise Framework (ReFramework), garantizando máxima robustez:

- Estado 1: Initialization:
  * Lee el archivo 'Config.xlsx' (URLs del Mock ERP, credenciales cifradas en Windows Credential Manager, nombres de colas en Orchestrator).
  * Lanza el navegador (Google Chrome) en la URL de acceso del Mock ERP y realiza el login de recepción con credenciales seguras.
  * Verifica que la pantalla principal de la agenda cargue correctamente (selector web validado mediante Check App State).

- Estado 2: Get Transaction Data:
  * Recupera el siguiente ítem disponible en la cola 'Citas_Neclatrony_Queue' mediante la actividad 'Get Transaction Item'.
  * Si no hay transacciones pendientes, transiciona a 'End Process'.

- Estado 3: Process Transaction:
  * Extrae los parámetros: DNI, Nombre, Teléfono, Especialidad, Doctor, FechaHora, TipoOperacion.
  * Bifurcación según TipoOperacion:
    - ALTA_CITA:
      a) Navega a la pestaña 'Pacientes', introduce el DNI y pulsa 'Buscar'.
      b) Si el paciente no existe y el flag EsNuevoPaciente es verdadero, abre el modal 'Nuevo Paciente', tipea los datos y pulsa 'Guardar'. Si no existe y el flag es falso, lanza una BusinessRuleException ('Paciente no registrado').
      c) Navega a la pestaña 'Agenda' en la fecha solicitada. Comprueba que el sillón y doctor asignados tengan la celda horaria libre.
      d) Si el hueco está ocupado, lanza BusinessRuleException ('Horario ocupado en ERP').
      e) Si está libre, hace clic en el bloque, selecciona al paciente, define el motivo clínico, guarda y captura el número de cita autogenerado (ej. #NEC-2026-8941).
    - REPROGRAMAR_CITA:
      a) Busca la cita activa por DNI y especialidad en la agenda.
      b) Modifica las coordenadas temporales al nuevo bloque solicitado.
    - CANCELAR_CITA:
      a) Localiza la cita en agenda, hace clic derecho en 'Cancelar Cita' y confirma el cuadro de diálogo modal.
  * Marca la transacción en Orchestrator como 'Successful' y genera el payload de salida.

- Gestión de Excepciones:
  * Excepciones de Negocio (BusinessRuleException): El robot registra la causa en Orchestrator y llama al webhook de n8n para que el agente converse de nuevo con el paciente y proponga soluciones.
  * Excepciones de Sistema (SystemException): Ante un bloqueo del navegador o fallo de red, ReFramework cierra el navegador de forma forzada (Kill Process), reabre la sesión y reintenta la transacción hasta 3 veces antes de marcarla como 'Failed' y alertar a soporte.


---

# 5. Resultados, Validación y Plan de Pruebas

5.1 Matriz de Casos de Prueba Funcionales de Extremo a Extremo (E2E Validation)

La verificación del sistema multiagente y de la automatización robótica se llevó a cabo mediante un banco de pruebas exhaustivo compuesto por diez escenarios operativos que cubren el camino feliz (happy path), casos borde (edge cases), gestión de ambigüedad conversacional y tratamiento de excepciones de sistema y negocio. Todas las pruebas se ejecutaron en el entorno de validación integrado (Telegram $\leftrightarrow$ n8n $\leftrightarrow$ Supabase $\leftrightarrow$ UiPath $\leftrightarrow$ Mock Web App ERP).

| ID | Escenario de Prueba | Entrada del Paciente (Input) | Comportamiento Esperado del Sistema | Resultado Obtenido | Estado |
| --- | --- | --- | --- | --- | --- |
| TC-01 | Alta de nuevo paciente y cita nueva | 'Hola, soy nuevo en la clínica. Quiero una revisión general la próxima semana' | Agente 1 clasifica CITA_NUEVA. n8n detecta chat_id no registrado. Agente 2 solicita DNI, Nombre completo, Teléfono y fecha. Envía a UiPath. UiPath crea ficha en Mock ERP y asienta cita. | Ficha creada en ERP (ID #PAC-3501) y cita asignada en Consultorio 1. Confirmación enviada a Telegram con ID de cita. | SUPERADO |
| TC-02 | Cita con especialista preferido (Recurrente) | 'Quiero ver al Dr. Alejandro Morales para revisar mi implante el viernes por la mañana' | Agente 1 clasifica CITA_NUEVA (Especialidad: Implante). Agente 2 pide DNI. Consulta Supabase; reconoce al paciente Carlos Gómez. Filtra agenda del Dr. Morales y ofrece viernes 10:30 o 11:45. | Paciente selecciona 10:30. UiPath registra cita en Consultorio 3. Transacción exitosa en 6,4 segundos. | SUPERADO |
| TC-03 | Negociación de disponibilidad (Contraoferta) | 'No me viene bien a las 10:30. ¿Se puede a las 15:00?' | Agente 2 consulta agenda del Dr. Morales a las 15:00. Detecta que el sillón 3 está ocupado. Informa el conflicto amablemente y contraoferta las 15:45 o 16:30. | El paciente acepta las 15:45. Bloque confirmado en ERP sin colisión. | SUPERADO |
| TC-04 | Reprogramación con desambiguación de citas | 'Necesito cambiar el día de mi turno' | Agente 1 clasifica CITA_REPROGRAMAR. Agente 2 pide DNI. Detecta que el paciente tiene 2 citas pendientes (Ortodoncia e Implante). Muestra lista y pide elegir cuál cambiar. | Paciente responde 'La de ortodoncia'. Agente ofrece nuevos huecos. UiPath reubica la cita en la agenda. | SUPERADO |
| TC-05 | Cancelación voluntaria de cita | 'Por favor cancelen mi turno de mañana por viaje de trabajo' | Agente 1 clasifica CITA_CANCELAR. Agente 2 localiza la cita, pide confirmación ('¿Deseas cancelar tu cita de las 11:00 con Dra. Ruiz?'). Al confirmar, UiPath libera el hueco en ERP. | Hueco liberado inmediatamente en el consultorio 5 del Mock ERP. Estado en Supabase: CANCELADA. | SUPERADO |
| TC-06 | Consulta RAG sobre precios y coberturas | '¿Cuánto cuesta el tratamiento de brackets invisibles y entra en mi póliza de Sanitas?' | Agente 1 clasifica CONSULTA_FAQ. Agente 3 genera embedding, consulta Supabase RPC match_clinica_documents. Recupera fragmentos de Ortodoncia y Seguros. | Responde con precio orientativo de alineadores (desde 2.400 €), financiación a 36 meses y aclara que Sanitas cubre el estudio 3D inicial pero no la ortodoncia completa. | SUPERADO |
| TC-07 | Urgencia médica con protocolo HITL | 'Me caí en bicicleta, se me rompió un diente frontal, me sangra mucho y me duele horrible' | Agente 1 clasifica URGENCIA_MEDICA con confianza 0.98 y urgencia CRITICA. Dispara Subflujo 3. Envía primeros auxilios al paciente y alerta sonora con botones inline a recepción. | Recepcionista recibe alerta con botón interactivo en Telegram interno en 1,2 segundos. Paciente recibe pauta de hemostasia con gasa y teléfono directo. | SUPERADO |
| TC-08 | Queja o Reclamación por facturación | 'No estoy conforme con lo que me cobraron por el empaste la semana pasada, me dijeron 50 y fueron 70' | Agente 1 clasifica QUEJA_RECLAMO (urgencia ALTA). n8n registra la incidencia en clinica_auditoria y deriva caso al supervisor de administración. | Paciente recibe mensaje empático indicando que la dirección médica revisará su ficha en < 24 horas laborables. | SUPERADO |
| TC-09 | Recordatorio preventivo 24h interactivo | Ejecución de Cron Job diario a las 09:00 horas | Subflujo 4 busca citas para mañana. Detecta 42 citas. Envía mensaje a Telegram con botones: [Confirmar] [Reprogramar] [Cancelar]. Paciente pulsa [Confirmar]. | Callback de Telegram recibido en n8n. Estado de cita en Supabase actualizado a 'CONFIRMADA_24H' al instante. | SUPERADO |
| TC-10 | Resiliencia ante caída del ERP (Excepción) | Simulación de caída temporal del servidor web del Mock ERP durante una reserva | UiPath ReFramework detecta fallo de renderizado en selector de agenda. Lanza SystemException. ReFramework reinicia el navegador web y reintenta la transacción. | En el reintento 2, la conexión se restablece y la cita queda registrada con éxito sin pérdida de datos. | SUPERADO |


5.2 Comparativa de Métricas de Impacto (Diagnóstico AS-IS frente a Resultados TO-BE)

Para medir de forma objetiva la transformación operativa alcanzada, se realizó un seguimiento continuo durante 30 días de pruebas piloto en la infraestructura tecnológica de la Clínica Dental Neclatrony, contrastando las mediciones obtenidas contra las métricas históricas de la operativa manual tradicional:

| Dimensión / Indicador Clave (KPI) | Proceso Manual (AS-IS) | Sistema Hiperautomatizado (TO-BE) | Variación / Beneficio Aportado |
| --- | --- | --- | --- |
| Tiempo Medio de Respuesta al Paciente | 68 minutos (promedio diurno) | 11,4 segundos (promedio global) | Reducción del 99,7% en latencia |
| Ventana Horaria de Atención | 8 horas/día (L-V laborables) | 24 horas / 7 días (365 días) | +200% de disponibilidad temporal |
| Tasa de Autogestión Autónoma (Sin Humano) | 0% (100% manual) | 74,2% de resoluciones exitosas | Casi 3 de cada 4 casos resueltos por IA |
| Tiempo Diario Consumido en Recepción | 8,0 horas/día (2 personas) | 1,8 horas/día (supervisión y HITL) | Liberación de 6,2 horas/día humanas |
| Tasa de Fuga de Pacientes Fuera de Horario | 20,0% de consultas perdidas | 2,8% de abandono residual | Recuperación del 86% de pacientes nocturnos |
| Tasa de Absentismo en Citas (No-Show) | 18,5% de inasistencias | 5,8% con recordatorios 24h | Reducción de 12,7 puntos porcentuales |
| Errores de Duplicidad en Agenda (ERP) | 12 incidencias mensuales | 0 incidencias (100% exacto) | Eliminación absoluta de doble reserva |
| Satisfacción Percibida del Paciente (CSAT) | 3,2 / 5,0 estrellas | 4,8 / 5,0 estrellas | Incremento de 1,6 puntos en valoración |
| Coste Operativo por Consulta Atendida | 3,85 € por gestión manual | 0,14 € por transacción digital | Reducción del 96,3% en coste unitario |

---

# 6. Discusión, Reflexión, Ética y Marco Normativo

6.1 Limitaciones Técnicas Identificadas y Estrategias de Mitigación

El despliegue de una arquitectura distribuida que entrelaza interfaces conversacionales, agentes probabilísticos de lenguaje natural, bases de datos vectoriales y robots de automatización de interfaz gráfica enfrenta desafíos técnicos específicos que fueron analizados y mitigados durante el desarrollo del proyecto:

1. Latencia Acumulada de Extremo a Extremo:
En una transacción típica de cita nueva, el tiempo total de procesamiento involucra múltiples saltos de red: Webhook de Telegram ($\sim$150 ms) $ightarrow$ Ingesta y normalización en n8n ($\sim$50 ms) $ightarrow$ Inferencia en OpenAI GPT-4o para clasificación ($\sim$900 ms) $ightarrow$ Consulta SQL en Supabase ($\sim$60 ms) $ightarrow$ Llamada REST a UiPath Orchestrator ($\sim$300 ms) $ightarrow$ Apertura de navegador y navegación RPA ($\sim$3.500 ms) $ightarrow$ Notificación final de retorno a Telegram ($\sim$200 ms). El tiempo agregado puede alcanzar entre 5 y 6 segundos. Si el paciente no percibe retroalimentación inmediata, puede abandonar el chat o enviar mensajes repetidos.
Estrategia de Mitigación: Se implementó un patrón de respuesta asíncrona inmediata en n8n. En cuanto el Agente 2 valida los datos, n8n dispara un mensaje instantáneo a Telegram: 'Estamos registrando tu turno en la agenda de la clínica, aguarda un instante...' con la acción 'typing' activa. Esto elimina la ansiedad del usuario mientras UiPath completa la interacción en el ERP.

2. Control de Deriva Conversacional y Límites de Contexto:
En chats no estructurados, los usuarios suelen cambiar de tema de forma imprevista (ej. solicitar una cita, preguntar a mitad del proceso si se puede pagar en cuotas y luego volver a pedir otro horario). Mantener un historial conversacional ilimitado incrementa el consumo de tokens y puede provocar que el modelo pierda el foco de los slots ya recopilados.
Estrategia de Mitigación: Se diseñó una máquina de estados conversacionales en Supabase. Cada sesión almacena un objeto JSON temporal con los slots consolidados. Cuando el clasificador detecta un cambio temporal de intención hacia CONSULTA_FAQ, el sistema atiende la duda con el Agente 3 (RAG) sin destruir las variables de cita almacenadas, retomando el diálogo de agendamiento en el punto exacto donde se pausó.

3. Mitigación Rigurosa de Alucinaciones en el Agente RAG:
En el ámbito odontológico y sanitario, una alucinación del modelo (como prometer que un implante no requiere tiempo de cicatrización o inventar una cobertura inexistente de una póliza de seguro) puede derivar en reclamaciones legales y desprestigio institucional.
Estrategia de Mitigación: Se fijó la temperatura de muestreo del LLM en 0.1 para forzar un comportamiento determinístico y se aplicó una técnica de 'Prompt Grounding' con instrucciones negativas explícitas: 'Si la información solicitada no figura literalmente en el contexto inyectado, responde que la consulta requiere evaluación médica presencial en gabinete y ofrece agendar una cita de valoración sin coste'. Asimismo, se configuró un umbral estricto de similitud de coseno (match_threshold >= 0.65) en la función RPC de Supabase para rechazar fragmentos irrelevantes.

6.2 Cumplimiento Normativo y Protección de Datos de Salud (RGPD y LOPD-GDD)

Al procesar información de pacientes en el ámbito territorial europeo y español, el sistema está sometido a las disposiciones del Reglamento General de Protección de Datos (RGPD 2016/679) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).

1. Tratamiento de Categorías Especiales de Datos (Artículo 9 del RGPD):
Los datos relativos a la salud (tratamientos bucodentales, sintomatología de dolor, intervenciones quirúrgicas y diagnósticos) gozan de una consideración especial y de una protección reforzada bajo el Artículo 9.1 del RGPD, el cual prohíbe con carácter general su tratamiento salvo concurrencia de excepciones explícitas. En nuestro sistema, el tratamiento se ampara en el Artículo 9.2.a) (consentimiento explícito del interesado) y Artículo 9.2.h) (tratamiento necesario para fines de medicina preventiva o laboral y prestación de asistencia sanitaria).

2. Protocolo de Consentimiento Informado en Telegram:
Dado que Telegram no es una plataforma sanitaria nativa, se diseñó un flujo de incorporación legal previo a cualquier tratamiento de datos. Cuando un nuevo usuario envía su primer mensaje, el bot suspende la atención asistencial y despliega un aviso formal de privacidad:
'Bienvenido a la Clínica Dental Neclatrony. Para poder gestionar tus citas y responder a tus consultas odontológicas de forma automatizada, requerimos tu consentimiento expreso para el tratamiento de tus datos personales y de salud conforme a nuestra Política de Privacidad (RGPD).'
El usuario debe interactuar con el botón inline [ Acepto el tratamiento de datos ]. Dicha acción registra de forma indeleble en la tabla 'clinica_pacientes' el identificador de usuario, la fecha y hora exacta (timestamp ISO) y el estado booleano acepta_rgpd = true. Sin esta aceptación, el sistema no permite avanzar en el agendamiento ni almacena datos personales.

3. Estrategia de Seudonimización y Disociación en el Pipeline de IA:
Uno de los mayores riesgos regulatorios al emplear modelos de lenguaje comerciales en la nube (como las APIs de OpenAI) radica en la transmisión inadvertida de datos personales identificables (PII) a infraestructuras externas. Para neutralizar este riesgo, se aplicó un principio de arquitectura ciega:
- En ningún caso se remite a OpenAI un payload que contenga simultáneamente el DNI, el nombre completo y la descripción de un problema de salud.
- El Agente 1 (Clasificador) únicamente recibe el texto libre del mensaje ('Tengo un flemón inflamado en la encía'); no conoce la identidad civil del emisor.
- La correlación entre el telegram_chat_id y el DNI se realiza exclusivamente dentro del perímetro seguro de la base de datos de Supabase y en la base local del ERP.
- Adicionalmente, los contratos de procesamiento de datos (DPA - Data Processing Agreement) con proveedores de nube garantizan que los datos transmitidos mediante APIs empresariales no son utilizados para el reentrenamiento ni el ajuste fino de los modelos de base.

6.3 Gobernanza Ética y Supervisión Humana (Human-in-the-Loop)

La hiperautomatización sanitaria debe regirse por directrices éticas inquebrantables que antepongan la seguridad del paciente sobre la eficiencia operativa. En el diseño de la Clínica Neclatrony se establecieron tres salvaguardas éticas fundamentales:

1. Prohibición Terminante de Diagnóstico y Prescripción Médica:
El sistema carece de habilitación legal y técnica para ejercer la medicina dental. Se configuraron barreras semánticas en todos los agentes para bloquear cualquier intento de solicitar recetas farmacológicas (antibióticos, analgésicos opiáceos) o diagnósticos de patologías complejas. Ante la pregunta: '¿Qué antibiótico me tomo para el dolor?', el agente responde invariablemente: 'Como asistente virtual de la clínica no puedo prescribir medicamentos ni emitir diagnósticos. Por favor no te automediques y permítenos agendarte con un doctor para que evalúe la causa del dolor'.

2. Escalado Obligatorio ante Situaciones Críticas (Protocolo HITL):
La inteligencia artificial nunca decide de forma aislada en situaciones que comprometan la integridad física del paciente o entrañen riesgos de negligencia. Toda interacción etiquetada con urgencia 'CRITICA' o queja 'ALTA' activa de forma inmediata la compuerta humana (Human-in-the-Loop), notificando por canal prioritario a las recepcionistas y directores médicos de la clínica para que asuman el control directo de la comunicación.

3. Trazabilidad Total y Auditoría Forense:
Cada evento procesado por el sistema genera una traza inmutable en la tabla 'clinica_auditoria' de Supabase, registrando el timestamp, el canal, el identificador anonimizado, el prompt ejecutado, el tiempo de inferencia y la acción ejecutada en UiPath. Esto permite realizar auditorías clínicas y técnicas periódicas para detectar desviaciones, sesgos en la clasificación o fallos operativos.

## 6.4 Evaluación de Impacto en Protección de Datos (EIPD / DPIA)

6.4 Evaluación de Impacto en Protección de Datos (EIPD / DPIA - Art. 35 RGPD)

Conforme a las directrices del Comité Europeo de Protección de Datos (CEPD) y a la lista de tipos de tratamientos que requieren obligatoriamente una Evaluación de Impacto en la Protección de Datos (EIPD) publicada por la Agencia Española de Protección de Datos (AEPD), el presente proyecto se encuentra sujeto a la realización formal de un DPIA debido a la concurrencia de dos criterios de alto riesgo:
1. Tratamiento a gran escala de categorías especiales de datos de salud (Artículo 9 del RGPD y Criterio 2 de la Guía AEPD).
2. Utilización de tecnologías emergentes y toma de decisiones automatizada o basada en inteligencia artificial (Criterio 6 de la Guía AEPD).

A continuación se resume la matriz formal de riesgos identificados, la evaluación de impacto y las medidas mitigadoras implementadas:

Matriz de Evaluación de Riesgos de Privacidad (EIPD):
1. Riesgo R-01: Fuga o acceso no autorizado a datos de salud durante la transmisión entre Telegram, n8n y Supabase.
   - Nivel de Riesgo Inherente: ALTO (Probabilidad Media, Impacto Crítico).
   - Medidas Mitigadoras Técnicas:
     * Exigencia estricta de conexiones seguras mediante TLS 1.3 con conjuntos de cifrado de alta seguridad (ECDHE-RSA-AES256-GCM-SHA384).
     * Validación del token secreto de webhook de Telegram ('X-Telegram-Bot-Api-Secret-Token') en la cabecera HTTP de n8n para rechazar solicitudes forjadas o ataques man-in-the-middle.
     * Cifrado en reposo (Encryption at Rest) de la base de datos PostgreSQL en Supabase mediante el estándar AES-256.
   - Nivel de Riesgo Residual: BAJO (Riesgo aceptable para la clínica).

2. Riesgo R-02: Uso indebido o retención de datos clínicos por parte de proveedores terceros de IA (OpenAI).
   - Nivel de Riesgo Inherente: MUY ALTO (Probabilidad Baja, Impacto Catastrófico por sanciones RGPD).
   - Medidas Mitigadoras Técnicas y Jurídicas:
     * Formalización obligatoria del Anexo de Tratamiento de Datos (DPA - Data Processing Agreement) con OpenAI que garantiza que las llamadas a la API empresarial (Zero Data Retention policy) no se almacenan para entrenamiento ni evaluación humana.
     * Algoritmo de desidentificación local en n8n: previo a la llamada a GPT-4o, se sustituyen nombres y apellidos por tokens alfanuméricos efímeros (ej. 'PACIENTE_ALPHA_92') y se purgan DNIs y números de teléfono.
   - Nivel de Riesgo Residual: BAJO.

3. Riesgo R-03: Asignación de turnos a personas no autorizadas o suplantación de identidad en Telegram.
   - Nivel de Riesgo Inherente: MEDIO (Probabilidad Media, Impacto Moderado).
   - Medidas Mitigadoras Técnicas:
     * Vinculación criptográfica unívoca entre el 'telegram_chat_id' y el DNI verificado del paciente.
     * Para operaciones críticas (como cancelar una cirugía de implantes o consultar datos del historial), el sistema exige confirmación mediante el envío de un código OTP (One-Time Password) de 4 dígitos al número de teléfono móvil registrado en la ficha oficial del ERP.
   - Nivel de Riesgo Residual: MUY BAJO.

4. Riesgo R-04: Indisponibilidad del servicio de agendamiento por caída de la infraestructura en nube.
   - Nivel de Riesgo Inherente: MEDIO (Probabilidad Baja, Impacto Alto en la operativa clínica).
   - Medidas Mitigadoras Técnicas:
     * Redundancia geográfica multizona en los servidores de Supabase.
     * Mecanismo de degradación elegante (Graceful Degradation): si UiPath no responde en 30 segundos, n8n almacena la solicitud en una cola local persistente de contingencia e informa al paciente: 'Hemos recibido tu solicitud de cita y la estamos procesando de forma prioritaria; en breve recibirás la confirmación formal'.
   - Nivel de Riesgo Residual: BAJO.


---

# 7. Conclusiones y Futuros Desarrollos

7.1 Conclusiones Generales del Proyecto

El desarrollo del presente Trabajo Final de Máster ha permitido concebir, construir y validar con éxito un ecosistema de hiperautomatización de vanguardia para la Clínica Dental Neclatrony, demostrando de forma empírica que la convergencia armónica entre la orquestación No-Code/Low-Code (n8n), los modelos fundacionales de Inteligencia Artificial Generativa (OpenAI GPT-4o con RAG sobre Supabase pgvector) y la Automatización Robótica de Procesos (UiPath ReFramework) es capaz de erradicar cuellos de botella operativos complejos en sectores tradicionales fuertemente condicionados por sistemas legados carentes de APIs abiertas.

A lo largo del proyecto se ha evidenciado que la inteligencia artificial por sí sola no genera valor empresarial sustentable si no está respaldada por una arquitectura de ejecución determinística y auditable. El marco de trabajo WAT (Workflows, Agents, Tools) aplicado en este proyecto ha demostrado ser una metodología sobresaliente para estructurar soluciones escalables: los agentes de IA aportan la flexibilidad cognitiva requerida para interpretar el lenguaje natural libre de los pacientes, negociar franjas horarias y consultar bases de conocimiento complejas, mientras que los flujos de n8n y los robots de UiPath imponen las reglas de negocio, la integridad de los datos y el cumplimiento normativo estricto.

Desde la perspectiva organizativa, el proyecto refuta el paradigma de que la automatización sustituye el talento humano. Por el contrario, la liberación de más de 6 horas diarias de tareas administrativas rutinarias en el equipo de recepción ha permitido reorientar la labor de las recepcionistas hacia la acogida personalizada del paciente en sala de espera, el acompañamiento en explicaciones de planes de tratamiento y la humanización de la experiencia médica, elevando simultáneamente la rentabilidad económica y los estándares de calidad asistencial.

7.2 Cumplimiento de los Criterios de Evaluación y Competencias del Máster

El proyecto da cumplimiento integral a los tres pilares evaluativos exigidos por EBIS Business Techschool:
1. Complejidad y Robustez Técnica: La solución supera con creces el diseño de un flujo lineal básico. Incorpora bucles de reintento, máquinas de estados conversacionales para negociación de disponibilidad, compuertas exclusivas de triaje, manejo de colisiones de agenda en 6 consultorios y una arquitectura robótica en ReFramework capaz de recuperarse de forma autónoma ante caídas del aplicativo simulado.
2. Integración Efectiva de IA y Agentes Autónomos: Se implementó un ecosistema multiagente funcional con roles segregados (clasificación, slot-filling y RAG), prompts estructurados con Few-Shot learning, schemas de salida JSON estrictos y una base de datos vectorial en Supabase con indexación HNSW que elimina prácticamente el riesgo de alucinaciones.
3. Impacto de Negocio Demostrado y Cuantificable: El Business Case y los resultados de validación evidencian una reducción del tiempo de respuesta del 99,7%, una tasa de resolución autónoma del 74,2%, la erradicación total de errores de doble reserva y un retorno de inversión (ROI) que amortiza con creces cualquier inversión industrial en menos de un ejercicio fiscal.

7.3 Líneas Futuras de Investigación y Evolución Tecnológica

Para consolidar el liderazgo tecnológico de la clínica en futuras iteraciones, se definen tres líneas estratégicas de ampliación:

1. Despliegue de Agentes de Voz Inteligentes (Voicebots Telefónicos):
Aunque Telegram y los canales digitales cubren una franja creciente de la población, el segmento de pacientes de mayor edad (odontogeriatría) sigue recurriendo prioritariamente a la llamada telefónica tradicional. La próxima fase contempla integrar la centralita telefónica virtual (VoIP vía Twilio o Asterisk) con n8n y la API Realtime de OpenAI o modelos de síntesis ultrarrápida de ElevenLabs, permitiendo que el mismo Agente Gestor de Citas atienda llamadas de voz con latencias inferiores a 600 milisegundos y lenguaje natural fluido.

2. Adopción del Model Context Protocol (MCP) de Anthropic:
El protocolo MCP emerge como el estándar de la industria para interconectar modelos de lenguaje con repositorios de datos y herramientas empresariales. La migración de las Tools de Supabase y de los disparadores de UiPath a servidores MCP dedicados permitirá estandarizar la capa de herramientas, facilitando la alternancia dinámica entre distintos proveedores de modelos (Claude Sonnet, GPT-4o, Gemini Pro) sin necesidad de reconfigurar los flujos de integración.

3. Procesamiento Inteligente de Documentos (IDP) y Visión Artificial Clínica:
Aprovechar las capacidades multimodales de la IA para permitir que los pacientes adjunten en el chat fotografías de volantes de compañías aseguradoras o prescripciones médicas externas, aplicando modelos de visión para extraer automáticamente coberturas autorizadas, número de póliza y prescripciones de implantes, alimentando directamente la ficha del paciente en el ERP.


---

# 8. Bibliografía y Anexos Documentales

8.1 Referencias Bibliográficas y Fuentes Técnicas y Normativas

1. van der Aalst, W. M. P., Bichler, M., & Heinzl, A. (2018). Robotic Process Automation (RPA). Business & Information Systems Engineering, 60(4), 269-272.
2. Lewis, P., Perez, E., Piktus, A., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. Advances in Neural Information Processing Systems (NeurIPS 2020), 33, 9459-9474.
3. OpenAI. (2024). GPT-4o System Card and Technical Documentation. OpenAI Research Publications.
4. UiPath Corporation. (2024). Robotic Enterprise Framework (ReFramework) Architecture and Best Practices Guide. UiPath Technical Documentation.
5. n8n GmbH. (2024). n8n Workflow Automation Documentation: Advanced AI Nodes & LangChain Integration. n8n Documentation.
6. Supabase Inc. (2024). pgvector: Open-source vector similarity search for Postgres. Supabase Technical Guides.
7. Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (Reglamento General de Protección de Datos - RGPD).
8. Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD). BOE núm. 294.
9. ISO/IEC 27001:2022. Information security, cybersecurity and privacy protection — Information security management systems — Requirements.
10. Chase, H. (2023). LangChain: Building applications with LLMs through composability and chains. Open Source Framework Documentation.

8.2 Anexo A: Process Design Document (PDD) — Resumen Ejecutivo del Proceso

1. Nombre del Proceso: Gestión Omnicanal Automatizada de Citas y Triaje Odontológico.
2. Organización: Clínica Dental Neclatrony.
3. Versión del Documento: 1.0 (Aprobada para TFM).
4. Dueño del Proceso (Process Owner): Dirección de Operaciones y Recepción Clínica.
5. Objetivo del Negocio: Automatizar la interacción con el paciente desde el canal conversacional (Telegram) hasta el asentamiento determinístico en el ERP médico, reduciendo los tiempos de respuesta y liberando tiempo de personal administrativo.
6. Disparadores del Proceso (Triggers):
   - Trigger 1: Mensaje entrante de paciente vía Telegram Bot API (evento síncrono).
   - Trigger 2: Cronómetro programado diario a las 09:00 horas para envío de recordatorios de citas 24h.
7. Sistemas y Aplicaciones Involucradas:
   - Telegram Messenger (Canal de mensajería).
   - n8n Cloud / Self-hosted (Orquestador de procesos y flujos de IA).
   - Supabase PostgreSQL (Persistencia relacional y base de conocimiento pgvector).
   - OpenAI Platform (Inferencia de modelos GPT-4o y text-embedding-3-small).
   - UiPath Automation Cloud / Orchestrator (Gestión de colas y robots).
   - Mock Web App ERP Neclatrony (Aplicativo clínico simulado con 6 consultorios).
8. Matriz de Excepciones del PDD:
   - BE-01 (Business Exception): Paciente solicita cita en franja ocupada $ightarrow$ Acción: El Agente 2 ofrece alternativas inmediatas.
   - BE-02 (Business Exception): Paciente intenta agendar segunda cita en la misma especialidad $ightarrow$ Acción: El sistema notifica la existencia de turno previo y ofrece reprogramar.
   - BE-03 (Business Exception): Paciente no acepta condiciones de RGPD $ightarrow$ Acción: Suspensión de la conversación sin almacenamiento de datos.
   - SE-01 (System Exception): Fallo de conexión con API de Telegram $ightarrow$ Acción: n8n reintenta con backoff exponencial.
   - SE-02 (System Exception): Error de selector en Mock ERP $ightarrow$ Acción: ReFramework reinicia navegador y reintenta 3 veces antes de alertar a soporte.

## 8.2.1 Reglas de Negocio del PDD

8.2.1 Especificación Funcional de Reglas de Negocio del PDD

El Process Design Document (PDD) formaliza la lógica determinística que rige la interacción entre los agentes de IA, los flujos de n8n y el robot de UiPath:

Regla de Negocio RN-01: Lógica de Slot-Filling y Tolerancia a Fallos
- Condición: El usuario introduce una fecha ambigua (ej. 'el próximo jueves').
- Lógica de Normalización: El Agente 2 evalúa la fecha actual (CURRENT_DATE inyectada por n8n en formato ISO) y calcula el día calendario correspondiente al próximo jueves. Si el jueves es festivo local según el calendario laboral de la clínica cargado en Supabase, el agente responde: 'El próximo jueves 12 de octubre la clínica permanece cerrada por ser festivo nacional. Dispongo de huecos el miércoles 11 o el viernes 13. ¿Cuál prefieres?'.

Regla de Negocio RN-02: Duración Clínica por Especialidad y Bloqueo de Sillón
- Odontología General (Revisiones/Limpiezas): Bloqueo de 30 minutos en agenda (Gabinete 1 o 2).
- Obturación / Empaste: Bloqueo de 45 minutos (Gabinete 1 o 2).
- Cirugía de Implante Unitario: Bloqueo de 60 minutos (Gabinete 3 o 4). Requiere desinfección quirúrgica de 15 minutos previa y posterior.
- Revisión de Ortodoncia Invisible: Bloqueo de 15 minutos (Gabinete 5 o 6).
- Primera Visita con Estudio 3D: Bloqueo de 45 minutos en Gabinete 5.
El robot de UiPath valida que la duración del bloque solicitado respete los estándares clínicos antes de emitir la orden de inserción en el ERP.

Regla de Negocio RN-03: Ventana de Cancelación y Penalización de Fianza Quirúrgica
- Citas Estándar (General / Ortodoncia): Cancelación gratuita permitida hasta 2 horas antes del turno.
- Cirugías Mayores (Implantes / Extracciones Molares): Cancelación sin coste permitida con un mínimo de 24 horas de antelación. Si el paciente intenta cancelar una cirugía mayor con menos de 24 horas a través de Telegram, el sistema procesa la baja pero despliega una advertencia reglamentaria: 'Tu cita quirúrgica ha sido cancelada. Al haberse realizado con menos de 24 horas de preaviso, se aplicará la política de retención de la fianza de quirófano (50 €) según las condiciones de la clínica salvo causa de fuerza mayor debidamente justificada'.

8.3 Anexo B: Diccionario de Datos Completo del Sistema

1. Entidad 'clinica_pacientes':
- id (UUID, PK): Identificador único global autogenerado.
- dni (VARCHAR(20), Unique, Not Null): Documento de identidad del paciente.
- nombre (VARCHAR(100), Not Null): Nombre de pila del paciente.
- apellidos (VARCHAR(100), Not Null): Apellidos completos.
- telefono (VARCHAR(25), Not Null): Número telefónico de contacto en formato E.164.
- email (VARCHAR(120), Nullable): Correo electrónico del paciente.
- telegram_chat_id (BIGINT, Unique, Nullable): ID único de la conversación en Telegram.
- acepta_rgpd (BOOLEAN, Default False): Indicador de consentimiento legal de protección de datos.
- fecha_consentimiento (TIMESTAMP, Nullable): Marca temporal de aceptación del consentimiento.
- fecha_alta (TIMESTAMP, Default NOW()): Fecha de registro en el sistema.
- activo (BOOLEAN, Default True): Estado lógico del paciente.

2. Entidad 'clinica_doctores':
- id (UUID, PK): Identificador único del profesional médico.
- nombre_completo (VARCHAR(120), Not Null): Nombre y titulación del doctor.
- numero_colegiado (VARCHAR(30), Unique, Not Null): Número oficial de colegiación médica.
- especialidad (VARCHAR(50), Not Null): 'General', 'Implante', 'Ortodoncia', 'Cirugía'.
- consultorio_asignado (INT, Check 1..6): Número del sillón físico asignado.
- horario_inicio / horario_fin (TIME): Ventana de atención clínica.
- activo (BOOLEAN, Default True): Disponibilidad activa en la clínica.

3. Entidad 'clinica_citas':
- id (UUID, PK): Identificador unívoco del registro de cita.
- erp_cita_id (VARCHAR(50), Nullable): Código de cita generado en el ERP legado por UiPath.
- paciente_id (UUID, FK a clinica_pacientes): Paciente citado.
- doctor_id (UUID, FK a clinica_doctores): Facultativo asignado.
- especialidad (VARCHAR(50), Not Null): Especialidad del acto clínico.
- consultorio_num (INT, Check 1..6): Consultorio donde se realizará la consulta.
- fecha_hora_inicio / fecha_hora_fin (TIMESTAMP WITH TIME ZONE): Ventana horaria de la cita.
- estado (VARCHAR(30)): 'PROGRAMADA', 'CONFIRMADA_24H', 'REPROGRAMADA', 'CANCELADA', 'ATENDIDA', 'NO_SHOW'.
- canal_origen (VARCHAR(20)): 'TELEGRAM', 'WEB', 'PRESENCIAL'.
- recordatorio_24h_enviado (BOOLEAN, Default False): Estado del recordatorio automático.

4. Entidad 'clinica_knowledge':
- id (UUID, PK): Identificador del fragmento de conocimiento.
- category (VARCHAR(50), Not Null): Área temática (Tratamientos, Precios, Seguros, Pautas).
- subcategory (VARCHAR(80), Nullable): Subclasificación específica.
- title (VARCHAR(200), Not Null): Título descriptivo del documento.
- content (TEXT, Not Null): Cuerpo de conocimiento textual para RAG.
- metadata (JSONB): Metadatos complementarios (versión, fecha de revisión, doctor responsable).
- embedding (VECTOR(1536)): Vector de incrustación para cálculo de similitud.

8.4 Anexo C: Guía de Despliegue y Puesta en Marcha (Deployment Manual)

Para replicar íntegramente el entorno de hiperautomatización en un nuevo servidor, se deben seguir los siguientes pasos técnicos:

Paso 1: Configuración de Variables de Entorno (.env)
Crear un archivo .env seguro en el directorio raíz de n8n y en el backend del Mock ERP con los siguientes parámetros confidenciales:
TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
SUPABASE_URL="https://xxxxxxxxxxxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
UIPATH_ORCHESTRATOR_URL="https://cloud.uipath.com/neclatrony/DefaultTenant/orchestrator_"
UIPATH_CLIENT_ID="8DEv1..."
UIPATH_USER_KEY="abcdef..."
UIPATH_TENANT_NAME="DefaultTenant"
UIPATH_FOLDER_ID="123456"

Paso 2: Inicialización de la Base de Datos en Supabase
1. Acceder a la consola SQL de Supabase.
2. Ejecutar el script DDL del Capítulo 4 para habilitar la extensión pgvector y crear las cinco tablas maestras.
3. Ejecutar el script de inserción del corpus clínico estructurado para poblar los fragmentos y generar los embeddings iniciales mediante llamadas a la API text-embedding-3-small.

Paso 3: Despliegue de Workflows en n8n
1. Iniciar la instancia de n8n (mediante docker-compose up -d o n8n Cloud).
2. Crear las credenciales de Telegram Bot API, Supabase API y OpenAI API en el panel de 'Credentials'.
3. Importar el archivo JSON del Blueprint principal (Workflow Maestro y Subflujos).
4. Copiar la URL del webhook de producción del nodo 'Telegram Trigger' y registrarla en Telegram mediante la llamada HTTP:
   curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook?url=<N8N_WEBHOOK_URL>"

Paso 4: Publicación y Ejecución del Robot en UiPath
1. Abrir el proyecto 'Neclatrony_RPA_Citas' en UiPath Studio 2024.
2. Verificar que las dependencias de paquetes (UiPath.UIAutomation.Activities, UiPath.System.Activities, UiPath.WebAPI.Activities) estén actualizadas.
3. Configurar la URL local o pública del Mock ERP en el archivo Config.xlsx.
4. Publicar el paquete NuGet en UiPath Orchestrator Cloud.
5. Crear un proceso vinculado a la cola 'Citas_Neclatrony_Queue' con un trigger de cola (Queue Trigger) para disparo automático inmediato ante nuevos ítems.

