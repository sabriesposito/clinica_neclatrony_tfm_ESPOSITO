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
  { id: "M001", nombre: "Dra. Martínez",  especialidad: "Odontología general · Estética dental", consultorio: 1, dias: "Lunes a Viernes", dias_indices: [1,2,3,4,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M002", nombre: "Dr. Rodríguez",  especialidad: "Ortodoncia · Ortodoncia invisible", consultorio: 5, dias: "Lunes a Viernes", dias_indices: [1,2,3,4,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M003", nombre: "Dra. López",     especialidad: "Estética dental · Blanqueamiento", consultorio: 2, dias: "Lunes a Viernes", dias_indices: [1,2,3,4,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M004", nombre: "Dr. Sánchez",    especialidad: "Cirugía oral · Implantología", consultorio: 4, dias: "Lunes a Viernes", dias_indices: [1,2,3,4,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M005", nombre: "Dra. García",    especialidad: "Periodoncia · Odontología general", consultorio: 1, dias: "Lunes a Jueves", dias_indices: [1,2,3,4], horario_inicio: "08:30:00", horario_fin: "20:30:00" },
  { id: "M006", nombre: "Dr. Fernández",  especialidad: "Endodoncia · Cirugía oral", consultorio: 3, dias: "Lun, Mié, Vie", dias_indices: [1,3,5], horario_inicio: "08:30:00", horario_fin: "20:30:00" },
  { id: "M007", nombre: "Dra. Torres",    especialidad: "Odontopediatría", consultorio: 2, dias: "Mar, Jue", dias_indices: [2,4], horario_inicio: "08:30:00", horario_fin: "20:30:00" },
  { id: "M008", nombre: "Dr. Morales",    especialidad: "Prostodoncia · Prótesis dental", consultorio: 6, dias: "Lunes a Viernes", dias_indices: [1,2,3,4,5], horario_inicio: "09:00:00", horario_fin: "18:00:00" },
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

const INITIAL_CITAS = [];

// ── Storage ────────────────────────────────────────────────────────────────

function initData() {
  if (!localStorage.getItem("neclatrony_pacientes")) {
    localStorage.setItem("neclatrony_pacientes", JSON.stringify(INITIAL_PACIENTES));
  }
  if (!localStorage.getItem("neclatrony_citas")) {
    localStorage.setItem("neclatrony_citas", JSON.stringify(INITIAL_CITAS));
  }
  if (!localStorage.getItem("neclatrony_citas_clean_v1")) {
    const existing = JSON.parse(localStorage.getItem("neclatrony_citas") || "[]");
    const soloReales = existing.filter(c => c && c.id && !c.id.startsWith("C00"));
    localStorage.setItem("neclatrony_citas", JSON.stringify(soloReales));
    localStorage.setItem("neclatrony_citas_clean_v1", "1");
  }
  if (!localStorage.getItem("neclatrony_medicos_v4")) {
    const existing = JSON.parse(localStorage.getItem("neclatrony_medicos") || "[]");
    if (existing.length > 0) {
      const merged = existing.map((m, i) => {
        const initM = INITIAL_MEDICOS.find(x => x.nombre.toLowerCase() === m.nombre.toLowerCase());
        return {
          consultorio: m.consultorio || m.consultorio_asignado || (i % 6 + 1),
          dias: (initM ? initM.dias : (m.dias || "Lunes a Viernes")),
          dias_indices: (initM ? initM.dias_indices : (m.dias_indices || [1,2,3,4,5])),
          horario_inicio: m.horario_inicio || "08:30:00",
          horario_fin: m.horario_fin || "20:30:00",
          ...m,
          dias: (initM && (!m.dias || m.dias === "Lunes a Viernes")) ? initM.dias : (m.dias || "Lunes a Viernes")
        };
      });
      localStorage.setItem("neclatrony_medicos", JSON.stringify(merged));
    } else {
      localStorage.setItem("neclatrony_medicos", JSON.stringify(INITIAL_MEDICOS));
    }
    localStorage.setItem("neclatrony_medicos_v4", "1");
  }
}

function getMedicos() {
  const list = JSON.parse(localStorage.getItem("neclatrony_medicos") || "[]");
  return list.map((m, idx) => ({
    consultorio: (idx % 6) + 1,
    horario_inicio: "08:30:00",
    horario_fin: "20:30:00",
    dias: "Lunes a Viernes",
    ...m
  }));
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
  return getCitas().filter(c => c.fecha === hoyStr && (c.estado || "").toLowerCase().trim() !== "cancelada");
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

// ── Configuración de la Clínica, Horarios y Vacaciones ──────────────────────
const DEFAULT_CONFIG = {
  horaApertura: "08:30",
  horaCierre: "20:30",
  duraciones: {
    "General": 30,
    "Ortodoncia": 30,
    "Limpieza dental": 30,
    "Blanqueamiento dental": 30,
    "Empaste": 30,
    "Periodoncia": 45,
    "Prótesis": 45,
    "Endodoncia": 45,
    "Cirugía": 60,
    "Implante": 60
  },
  bloqueosClinica: [],
  vacacionesDoctores: []
};

function getConfiguracion() {
  const saved = localStorage.getItem("neclatrony_config");
  if (!saved) {
    localStorage.setItem("neclatrony_config", JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  try {
    return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  } catch(e) {
    return DEFAULT_CONFIG;
  }
}

function saveConfiguracion(cfg) {
  localStorage.setItem("neclatrony_config", JSON.stringify(cfg));
}

function isClinicaBloqueada(fechaStr) {
  const cfg = getConfiguracion();
  return (cfg.bloqueosClinica || []).some(b => {
    return fechaStr >= b.fechaInicio && fechaStr <= (b.fechaFin || b.fechaInicio);
  });
}

function getDoctorVacaciones(doctorId, fechaStr) {
  const cfg = getConfiguracion();
  return (cfg.vacacionesDoctores || []).find(v => {
    return v.doctorId === doctorId && fechaStr >= v.fechaInicio && fechaStr <= (v.fechaFin || v.fechaInicio);
  });
}
