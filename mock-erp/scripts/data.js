// ── NECLATRONY – Mock Data & Storage ──────────────────────────────────────

const TRATAMIENTOS = [
  "Limpieza dental",
  "Blanqueamiento dental",
  "Ortodoncia – Consulta inicial",
  "Ortodoncia – Revisión",
  "Empaste",
  "Extracción",
  "Implante dental",
  "Endodoncia",
  "Periodoncia",
  "Cirugía oral",
  "Radiografía panorámica",
  "Revisión general",
];

const HORARIOS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","16:00","16:30","17:00","17:30","18:00","18:30",
];

const INITIAL_MEDICOS = [
  { id: "M001", nombre: "Dra. Martínez",  especialidad: "Odontología general · Estética dental" },
  { id: "M002", nombre: "Dr. Rodríguez",  especialidad: "Ortodoncia · Ortodoncia invisible" },
  { id: "M003", nombre: "Dra. López",     especialidad: "Estética dental · Blanqueamiento" },
  { id: "M004", nombre: "Dr. Sánchez",    especialidad: "Cirugía oral · Implantología" },
  { id: "M005", nombre: "Dra. García",    especialidad: "Periodoncia · Odontología general" },
  { id: "M006", nombre: "Dr. Fernández",  especialidad: "Endodoncia · Cirugía oral" },
  { id: "M007", nombre: "Dra. Torres",    especialidad: "Odontopediatría" },
  { id: "M008", nombre: "Dr. Morales",    especialidad: "Prostodoncia · Prótesis dental" },
];

const INITIAL_PACIENTES = [
  { id: "P001", nombre: "Ana García Ruiz", dni: "12345678A", telefono: "612345678", email: "ana.garcia@email.com", fechaNacimiento: "1985-03-14", historial: [] },
  { id: "P002", nombre: "Carlos Martínez Pérez", dni: "23456789B", telefono: "623456789", email: "carlos.mp@email.com", fechaNacimiento: "1972-07-22", historial: [] },
  { id: "P003", nombre: "Laura Sánchez Torres", dni: "34567890C", telefono: "634567890", email: "lsanchez@email.com", fechaNacimiento: "1990-11-05", historial: [] },
  { id: "P004", nombre: "Miguel López Fernández", dni: "45678901D", telefono: "645678901", email: "mlopez@email.com", fechaNacimiento: "1968-01-30", historial: [] },
  { id: "P005", nombre: "Sofía Ruiz Morales", dni: "56789012E", telefono: "656789012", email: "sofia.ruiz@email.com", fechaNacimiento: "1995-06-18", historial: [] },
];

const hoy = new Date();
const fmt = (d) => d.toISOString().split("T")[0];
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

const INITIAL_CITAS = [
  { id: "C001", pacienteId: "P001", pacienteNombre: "Ana García Ruiz", tratamiento: "Limpieza dental", fecha: fmt(hoy), hora: "09:00", medico: "Dra. Martínez", estado: "confirmada", notas: "" },
  { id: "C002", pacienteId: "P002", pacienteNombre: "Carlos Martínez Pérez", tratamiento: "Ortodoncia – Revisión", fecha: fmt(hoy), hora: "10:30", medico: "Dr. Rodríguez", estado: "pendiente", notas: "Paciente con brackets desde hace 8 meses" },
  { id: "C003", pacienteId: "P003", pacienteNombre: "Laura Sánchez Torres", tratamiento: "Blanqueamiento dental", fecha: fmt(hoy), hora: "12:00", medico: "Dra. López", estado: "confirmada", notas: "" },
  { id: "C004", pacienteId: "P004", pacienteNombre: "Miguel López Fernández", tratamiento: "Implante dental", fecha: fmt(addDays(hoy, 1)), hora: "09:30", medico: "Dr. Sánchez", estado: "pendiente", notas: "Segunda sesión" },
  { id: "C005", pacienteId: "P005", pacienteNombre: "Sofía Ruiz Morales", tratamiento: "Revisión general", fecha: fmt(addDays(hoy, 1)), hora: "11:00", medico: "Dra. Martínez", estado: "confirmada", notas: "" },
  { id: "C006", pacienteId: "P001", pacienteNombre: "Ana García Ruiz", tratamiento: "Radiografía panorámica", fecha: fmt(addDays(hoy, 2)), hora: "16:00", medico: "Dra. Martínez", estado: "pendiente", notas: "" },
  { id: "C007", pacienteId: "P003", pacienteNombre: "Laura Sánchez Torres", tratamiento: "Empaste", fecha: fmt(addDays(hoy, -1)), hora: "10:00", medico: "Dra. López", estado: "completada", notas: "" },
  { id: "C008", pacienteId: "P002", pacienteNombre: "Carlos Martínez Pérez", tratamiento: "Limpieza dental", fecha: fmt(addDays(hoy, -2)), hora: "09:00", medico: "Dr. Rodríguez", estado: "cancelada", notas: "Canceló por viaje" },
];

// ── Storage ────────────────────────────────────────────────────────────────

function initData() {
  if (!localStorage.getItem("neclatrony_pacientes")) {
    localStorage.setItem("neclatrony_pacientes", JSON.stringify(INITIAL_PACIENTES));
  }
  if (!localStorage.getItem("neclatrony_citas")) {
    localStorage.setItem("neclatrony_citas", JSON.stringify(INITIAL_CITAS));
  }
  if (!localStorage.getItem("neclatrony_medicos_v2")) {
    localStorage.setItem("neclatrony_medicos", JSON.stringify(INITIAL_MEDICOS));
    localStorage.setItem("neclatrony_medicos_v2", "1");
  }
}

function getMedicos() {
  return JSON.parse(localStorage.getItem("neclatrony_medicos") || "[]");
}

function saveMedicos(data) {
  localStorage.setItem("neclatrony_medicos", JSON.stringify(data));
}

function getPacientes() {
  return JSON.parse(localStorage.getItem("neclatrony_pacientes") || "[]");
}

function getCitas() {
  return JSON.parse(localStorage.getItem("neclatrony_citas") || "[]");
}

function savePacientes(data) {
  localStorage.setItem("neclatrony_pacientes", JSON.stringify(data));
}

function saveCitas(data) {
  localStorage.setItem("neclatrony_citas", JSON.stringify(data));
}

function generateId(prefix) {
  return prefix + Date.now().toString(36).toUpperCase();
}

function getCitasHoy() {
  const hoyStr = fmt(new Date());
  return getCitas().filter(c => c.fecha === hoyStr);
}

function getSlotsBloqueados(fecha) {
  return getCitas()
    .filter(c => c.fecha === fecha && c.estado !== "cancelada")
    .map(c => c.hora);
}

function getSlotsDisponibles(fecha) {
  const bloqueados = getSlotsBloqueados(fecha);
  return HORARIOS.filter(h => !bloqueados.includes(h));
}
