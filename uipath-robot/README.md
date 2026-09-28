# Proyecto UiPath Studio — Automatización ERP Clínica Dental Neclatrony

Este proyecto RPA automatiza la inserción de citas médicas en el ERP clínico heredado de la **Clínica Dental Neclatrony**, completando la hiperautomatización del proceso junto a n8n, Telegram y Supabase.

---

## 1. Características Técnicas
* **Plataforma:** UiPath Studio (Target Framework: Windows, Modern UI Automation).
* **Entorno Destino:** ERP Web Legado de Neclatrony (`http://72.61.24.118:8080/`).
* **Arquitectura de Selectores:** Selectores CSS directos y estables sobre elementos HTML nativos:
  - Navegación: `#btn-nueva-cita`
  - Campos: `#input-dni-paciente`, `#input-nombre-paciente`, `#input-telefono-paciente`, `#input-email-paciente`
  - Desplegables: `#select-tratamiento`, `#select-medico`
  - Fechas: `#input-fecha-cita`, `#input-hora-cita`
  - Acción y Confirmación: `#btn-guardar-cita`, `#mensaje-confirmacion[data-cita-id]`
* **Manejo de Excepciones:** Bloque `Try-Catch` con control de errores en tiempo de ejecución y logs de auditoría.

---

## 2. Cómo Abrir y Ejecutar el Proyecto en UiPath Studio
1. Descomprime el archivo `ClinicaNeclatrony_UiPath_Project.zip` o abre esta carpeta en tu equipo.
2. Abre **UiPath Studio**.
3. Selecciona **"Abrir proyecto local"** (Open a Local Project) y selecciona el archivo `project.json`.
4. UiPath restaurará automáticamente las dependencias (`UiPath.UIAutomation.Activities`, `UiPath.System.Activities`).
5. Abre `Main.xaml`.
6. Haz clic en **Run File** (o `F5` / `Debug`).
7. El robot abrirá Google Chrome o Microsoft Edge en `http://72.61.24.118:8080/`, completará el turno de prueba y extraerá el ID generado en el ERP (ej: `C-1004`).

---

## 3. Parámetros de Entrada (InArguments)
* `in_ErpUrl`: URL del ERP (`http://72.61.24.118:8080/`)
* `in_DniPaciente`: DNI/NIF del paciente (ej: `38522432`)
* `in_NombrePaciente`: Nombre completo (ej: `Sabrina Esposito`)
* `in_TelefonoPaciente`: Teléfono de contacto
* `in_Tratamiento`: Tratamiento dental (ej: `Implante dental`, `Limpieza dental`, etc.)
* `in_FechaCita`: Fecha en formato `YYYY-MM-DD`
* `in_HoraCita`: Hora en formato `HH:MM`
* `in_Doctor`: Facultativo asignado

## 4. Parámetros de Salida (OutArguments)
* `out_ErpCitaId`: Código único generado por el ERP de la clínica.
* `out_Exito`: Booleano (`True`/`False`) indicando la finalización correcta.
