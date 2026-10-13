// ── NECLATRONY – App Logic ─────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initData();
  renderTopbarDate();
  renderDashboard();
  setupAgendaControls();
  renderAgenda();
  populateTratamientos();
  populateHorarios();
  populateMedicosSelect();
  renderPacientes();
  renderDoctores();
  setupNavigation();
  setupNuevaCitaForm();
  setupBusquedaPacientes();
  setupDoctoresForm();
  setupNuevoPacienteModal();
  setupEditarDoctorModal();
  setupConfiguracionPage();
  fetchPacientesFromSupabase();
  fetchDoctoresFromSupabase();
  fetchCitasFromSupabase();

  const badge = document.getElementById("badge-citas-hoy");
  if (badge) badge.textContent = getCitasHoy().length;

  // Mobile sidebar toggle
  const btnMenu = document.getElementById("btn-menu");
  const sidebar = document.querySelector(".sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");

  btnMenu.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    btnMenu.classList.toggle("open", open);
    backdrop.classList.toggle("visible", open);
  });

  backdrop.addEventListener("click", () => {
    sidebar.classList.remove("open");
    btnMenu.classList.remove("open");
    backdrop.classList.remove("visible");
  });
});

// ── Navigation ──────────────────────────────────────────────────────────────
function setupNavigation() {
  document.querySelectorAll(".nav-item[data-page]").forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;
      navigateTo(page);
    });
  });
}

function navigateTo(pageId) {
  // Close mobile sidebar
  document.querySelector(".sidebar").classList.remove("open");
  document.getElementById("btn-menu").classList.remove("open");
  document.getElementById("sidebar-backdrop").classList.remove("visible");

  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  const page = document.getElementById(`page-${pageId}`);

  if (navItem) navItem.classList.add("active");
  if (page) page.classList.add("active");

  if (pageId === "dashboard") renderDashboard();
  if (pageId === "agenda") renderAgendaView();
  if (pageId === "pacientes") renderPacientes();
  if (pageId === "doctores") renderDoctores();
  if (pageId === "configuracion") renderConfiguracionPage();
}

// ── Topbar Date ─────────────────────────────────────────────────────────────
function renderTopbarDate() {
  const el = document.getElementById("topbar-date");
  if (!el) return;
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  el.textContent = new Date().toLocaleDateString("es-ES", opts);
}

// ── Dashboard ───────────────────────────────────────────────────────────────
function renderDashboard() {
  const citas = getCitas();
  const hoyStr = new Date().toISOString().split("T")[0];
  const citasHoy = citas.filter(c => c.fecha === hoyStr);
  const pacientes = getPacientes();

  setEl("stat-citas-hoy", citasHoy.length);
  setEl("stat-pacientes", pacientes.length);
  setEl("stat-confirmadas", citasHoy.filter(c => c.estado === "confirmada").length);
  setEl("stat-pendientes", citas.filter(c => c.estado === "pendiente").length);

  // Agenda del día en dashboard
  const container = document.getElementById("dashboard-agenda");
  if (!container) return;

  const HORAS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","16:00","16:30","17:00","17:30","18:00","18:30"];
  container.innerHTML = "";

  HORAS.forEach(hora => {
    const cita = citasHoy.find(c => c.hora === hora);
    const row = document.createElement("div");
    row.className = "agenda-row";
    if (cita) {
      row.innerHTML = `
        <div class="agenda-time">${hora}</div>
        <div class="agenda-event ${cita.estado}" data-cita-id="${cita.id}">
          <div class="agenda-event-name">${cita.pacienteNombre}</div>
          <div class="agenda-event-detail">${cita.tratamiento} · ${cita.medico}</div>
        </div>`;
    } else {
      row.innerHTML = `
        <div class="agenda-time">${hora}</div>
        <div class="agenda-empty">Disponible</div>`;
    }
    container.appendChild(row);
  });

  // Próximas citas
  const proximas = citas
    .filter(c => c.fecha > hoyStr && c.estado !== "cancelada")
    .sort((a,b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
    .slice(0, 5);

  const proximasContainer = document.getElementById("proximas-citas");
  if (!proximasContainer) return;

  if (proximas.length === 0) {
    proximasContainer.innerHTML = `<div class="empty-state"><div class="empty-state-title">Sin citas próximas</div></div>`;
    return;
  }

  proximasContainer.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Paciente</th><th>Tratamiento</th><th>Fecha</th><th>Hora</th><th>Estado</th>
        </tr></thead>
        <tbody>
          ${proximas.map(c => `
            <tr>
              <td class="td-primary">${c.pacienteNombre}</td>
              <td>${c.tratamiento}</td>
              <td>${formatFecha(c.fecha)}</td>
              <td>${c.hora}</td>
              <td><span class="badge badge-${c.estado}">${capitalize(c.estado)}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

// ── Agenda Interactiva Multi-Día (3 Días) ──────────────────────────────────
let currentAgendaDate = new Date().toISOString().split("T")[0];

function setupAgendaControls() {
  const picker = document.getElementById("agenda-fecha");
  if (picker) {
    picker.value = currentAgendaDate;
    picker.addEventListener("change", (e) => {
      if (e.target.value) {
        currentAgendaDate = e.target.value;
        renderAgendaView();
      }
    });
  }

  const btnHoy = document.getElementById("btn-agenda-hoy");
  if (btnHoy) {
    btnHoy.addEventListener("click", () => {
      currentAgendaDate = new Date().toISOString().split("T")[0];
      if (picker) picker.value = currentAgendaDate;
      renderAgendaView();
    });
  }

  const btnPrev = document.getElementById("btn-agenda-prev");
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      const d = new Date(currentAgendaDate + "T12:00:00Z");
      d.setDate(d.getDate() - 1);
      currentAgendaDate = d.toISOString().split("T")[0];
      if (picker) picker.value = currentAgendaDate;
      renderAgendaView();
    });
  }

  const btnNext = document.getElementById("btn-agenda-next");
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      const d = new Date(currentAgendaDate + "T12:00:00Z");
      d.setDate(d.getDate() + 1);
      currentAgendaDate = d.toISOString().split("T")[0];
      if (picker) picker.value = currentAgendaDate;
      renderAgendaView();
    });
  }

  const selDoctor = document.getElementById("agenda-filtro-doctor");
  if (selDoctor) {
    selDoctor.addEventListener("change", () => {
      renderAgendaView();
    });
  }

  populateAgendaDoctorFilter();
}

function populateAgendaDoctorFilter() {
  const sel = document.getElementById("agenda-filtro-doctor");
  if (!sel) return;
  const currentVal = sel.value;
  const medicos = getMedicos();
  sel.innerHTML = '<option value="">Todos los doctores</option>' +
    medicos.map(m => `<option value="${m.nombre}">${m.nombre}</option>`).join("");
  if (currentVal) sel.value = currentVal;
}

function renderAgenda() { renderAgendaView(); }

function renderAgendaView() {
  const container = document.getElementById("agenda-3days-grid");
  if (!container) return;

  const doctorFiltro = (document.getElementById("agenda-filtro-doctor")?.value || "").trim().toLowerCase();
  const allCitas = getCitas();

  // 3-day dates array
  const baseD = new Date(currentAgendaDate + "T12:00:00Z");
  const dates = [0, 1, 2].map(offset => {
    const d = new Date(baseD);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split("T")[0];
  });

  // Calculate KPIs for the 3-day window
  const windowCitas = allCitas.filter(c => {
    const matchDate = dates.includes(c.fecha);
    const matchDoc = !doctorFiltro || (c.medico && c.medico.toLowerCase().includes(doctorFiltro));
    return matchDate && matchDoc;
  });

  const totalCitas = windowCitas.length;
  const confirmadas = windowCitas.filter(c => (c.estado || "").toLowerCase().trim() === "confirmada").length;
  const pendientes = windowCitas.filter(c => {
    const s = (c.estado || "").toLowerCase().trim();
    return s === "pendiente" || s === "programada";
  }).length;
  const canceladas = windowCitas.filter(c => (c.estado || "").toLowerCase().trim() === "cancelada").length;

  setEl("kpi-total-citas", totalCitas);
  setEl("kpi-confirmadas", confirmadas);
  setEl("kpi-pendientes", pendientes);
  setEl("kpi-canceladas", canceladas);
  setEl("agenda-resumen", `Mostrando ${totalCitas} citas entre ${formatFecha(dates[0])} y ${formatFecha(dates[2])}`);

  const HORAS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","16:00","16:30","17:00","17:30","18:00","18:30"];
  const hoyStr = new Date().toISOString().split("T")[0];
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  container.innerHTML = "";

  dates.forEach((dateStr, idx) => {
    const dObj = new Date(dateStr + "T12:00:00Z");
    const dayName = diasSemana[dObj.getUTCDay()];
    const dayNum = dObj.getUTCDate();
    const monthName = meses[dObj.getUTCMonth()];
    const isToday = (dateStr === hoyStr);
    const isTomorrow = (idx === 1 && dates[0] === hoyStr);

    let tag = "";
    if (isToday) tag = " (Hoy)";
    else if (isTomorrow) tag = " (Mañana)";

    const dayCitas = windowCitas.filter(c => c.fecha === dateStr);
    const isBloqueada = isClinicaBloqueada(dateStr);

    const col = document.createElement("div");
    col.className = "agenda-day-column";

    let colHtml = `
      <div class="agenda-day-header">
        <div>
          <div class="agenda-day-title">${dayName}${tag}</div>
          <div class="agenda-day-date">${dayNum} ${monthName} ${dObj.getUTCFullYear()}</div>
        </div>
        <span class="badge ${dayCitas.length > 0 ? 'badge-confirmada' : 'badge-completada'}" style="font-size:11px">
          ${dayCitas.length} cita${dayCitas.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div class="agenda-day-slots">
    `;

    if (isBloqueada) {
      colHtml += `
        <div class="banner-bloqueado">
          🔒 <strong>Clínica Cerrada</strong><br>
          No hay turnos disponibles por feriado o mantenimiento programado.
        </div>
      `;
    } else {
      HORAS.forEach(hora => {
        const cita = dayCitas.find(c => c.hora === hora);
        if (cita) {
          const rawEstado = (cita.estado || "").toLowerCase().trim();
          const isConfirmada = rawEstado === "confirmada";
          const isCancelada = rawEstado === "cancelada";
          const normClass = isConfirmada ? "confirmada" : (isCancelada ? "cancelada" : (rawEstado === "programada" ? "programada" : "pendiente"));
          const estadoLabel = rawEstado === "programada" ? "Programada" : (isConfirmada ? "Confirmada" : (isCancelada ? "Cancelada" : "Pendiente"));

          colHtml += `
            <div class="slot-card ${normClass}" title="${cita.pacienteNombre} (${cita.tratamiento} - ${cita.medico})">
              <div class="slot-row-main">
                <div class="slot-time-patient">
                  <span class="slot-time-badge">${hora} - ${calcularFinTurno(hora, cita.tratamiento)}</span>
                  <span class="slot-patient-name" onclick="buscarYVerPaciente('${cita.pacienteNombre}')">${cita.pacienteNombre}</span>
                </div>
                <div class="slot-row-actions">
                  <span class="badge badge-${normClass}">${estadoLabel}</span>
                  ${(!isConfirmada && !isCancelada) ? `<button class="btn-slot-action btn-slot-confirm" onclick="confirmarCita('${cita.id}')" title="Confirmar asistencia">✓</button>` : ''}
                  ${!isCancelada ? `<button class="btn-slot-action btn-slot-cancel" onclick="cancelarCita('${cita.id}')" title="Cancelar cita">✕</button>` : ''}
                </div>
              </div>
              <div class="slot-row-sub">
                <span class="slot-sub-text">${cita.tratamiento} · <strong>${cita.medico}</strong></span>
              </div>
            </div>
          `;
        } else {
          colHtml += `
            <button class="slot-empty-btn" onclick="irANuevaCita('${dateStr}','${hora}')">
              <span>+ ${hora}</span>
              <span style="font-weight:600">Disponible</span>
            </button>
          `;
        }
      });
    }

    colHtml += `</div>`;
    col.innerHTML = colHtml;
    container.appendChild(col);
  });
}

function calcularFinTurno(horaStr, especialidad) {
  if (!horaStr) return "10:30";
  const cfg = getConfiguracion();
  let dur = 30;
  if (cfg.duraciones) {
    if (especialidad && cfg.duraciones[especialidad]) dur = cfg.duraciones[especialidad];
    else if (especialidad && especialidad.toLowerCase().includes("cirug")) dur = cfg.duraciones["Cirugía Oral e Implantes"] || 60;
    else if (especialidad && especialidad.toLowerCase().includes("implante")) dur = cfg.duraciones["Cirugía Oral e Implantes"] || 60;
    else if (especialidad && especialidad.toLowerCase().includes("ortod")) dur = cfg.duraciones["Ortodoncia"] || 30;
    else if (especialidad && especialidad.toLowerCase().includes("endo")) dur = cfg.duraciones["Endodoncia / Periodoncia"] || 45;
  }
  const [h, m] = horaStr.split(":").map(Number);
  const totalM = h * 60 + m + dur;
  const finH = String(Math.floor(totalM / 60)).padStart(2, "0");
  const finM = String(totalM % 60).padStart(2, "0");
  return `${finH}:${finM}`;
}

window.buscarYVerPaciente = function(nombre) {
  const p = getPacientes().find(x => x.nombre.toLowerCase().includes(nombre.toLowerCase()));
  if (p) verPaciente(p.id);
  else showToast(`Paciente: ${nombre}`, "info");
};

function irANuevaCita(fecha, hora) {
  navigateTo("nueva-cita");
  setTimeout(() => {
    const f = document.getElementById("input-fecha-cita");
    const h = document.getElementById("input-hora-cita");
    if (f) f.value = fecha;
    if (h) h.value = hora;
  }, 50);
}

// ── Nueva Cita ────────────────────────────────────────────────────────────────
function populateTratamientos() {
  const sel = document.getElementById("select-tratamiento");
  if (!sel) return;
  TRATAMIENTOS.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t; opt.textContent = t;
    sel.appendChild(opt);
  });
}

function populateHorarios() {
  const sel = document.getElementById("input-hora-cita");
  if (!sel) return;
  HORARIOS.forEach(h => {
    const opt = document.createElement("option");
    opt.value = h; opt.textContent = h;
    sel.appendChild(opt);
  });
}

function setupNuevaCitaForm() {
  const form = document.getElementById("form-nueva-cita");
  if (!form) return;

  // DNI lookup
  const dniInput = document.getElementById("input-dni-paciente");
  dniInput.addEventListener("blur", () => {
    const pacientes = getPacientes();
    const p = pacientes.find(x => x.dni === dniInput.value.trim().toUpperCase());
    if (p) {
      setInputVal("input-nombre-paciente", p.nombre);
      setInputVal("input-telefono-paciente", p.telefono);
      setInputVal("input-email-paciente", p.email);
      showAlert("alert-form", "success", `Paciente encontrado: ${p.nombre}`);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    guardarCita();
  });

  document.getElementById("btn-limpiar-form").addEventListener("click", limpiarFormCita);
}

function guardarCita() {
  const nombre    = getVal("input-nombre-paciente");
  const dni       = getVal("input-dni-paciente");
  const telefono  = getVal("input-telefono-paciente");
  const email     = getVal("input-email-paciente");
  const tratamiento = getVal("select-tratamiento");
  const fecha     = getVal("input-fecha-cita");
  const hora      = getVal("input-hora-cita");
  const medico    = getVal("select-medico");
  const notas     = getVal("textarea-notas");

  if (!nombre || !tratamiento || !fecha || !hora) {
    showAlert("alert-form", "error", "Completa los campos obligatorios: nombre, tratamiento, fecha y hora.");
    return;
  }

  // Check slot availability
  const slots = getSlotsBloqueados(fecha);
  if (slots.includes(hora)) {
    showAlert("alert-form", "error", `El horario ${hora} del ${formatFecha(fecha)} ya está ocupado. Selecciona otro horario.`);
    return;
  }

  // Find or create patient
  const pacientes = getPacientes();
  let paciente = pacientes.find(p => p.dni === dni.toUpperCase());
  if (!paciente && nombre) {
    paciente = { id: generateId("P"), nombre, dni: dni.toUpperCase(), telefono, email, fechaNacimiento: "", historial: [] };
    pacientes.push(paciente);
    savePacientes(pacientes);
  }

  const nuevaCita = {
    id: generateId("C"),
    pacienteId: paciente ? paciente.id : "",
    pacienteNombre: nombre,
    tratamiento, fecha, hora, medico,
    estado: "pendiente",
    notas,
  };

  const citas = getCitas();
  citas.push(nuevaCita);
  saveCitas(citas);

  // Sincronización en tiempo real con Supabase (SSOT)
  syncCitaToSupabase({
    erp_cita_id: nuevaCita.id,
    dni: dni ? dni.toUpperCase().trim() : '',
    nombre: nombre,
    telefono: telefono,
    email: email,
    especialidad: tratamiento,
    fecha: fecha,
    hora: hora,
    medico: medico,
    canal_origen: 'PRESENCIAL'
  });

  const msg = `Cita registrada correctamente para ${nombre} el ${formatFecha(fecha)} a las ${hora}.`;
  showAlert("alert-form", "success", msg);
  document.getElementById("mensaje-confirmacion").textContent = msg;
  document.getElementById("mensaje-confirmacion").dataset.citaId = nuevaCita.id;

  limpiarFormCita(false);
  renderDashboard();
}

function limpiarFormCita(showMsg = true) {
  ["input-nombre-paciente","input-dni-paciente","input-telefono-paciente",
   "input-email-paciente","textarea-notas"].forEach(id => setInputVal(id, ""));
  setInputVal("select-tratamiento", "");
  setInputVal("select-medico", MEDICOS[0]);
  if (showMsg) hideAlert("alert-form");
}

// ── Pacientes ─────────────────────────────────────────────────────────────────
function renderPacientes(filtro = "") {
  let pacientes = getPacientes();
  if (filtro) {
    const q = filtro.toLowerCase();
    pacientes = pacientes.filter(p =>
      p.nombre.toLowerCase().includes(q) || p.dni.toLowerCase().includes(q) || p.telefono.includes(q)
    );
  }

  const tbody = document.getElementById("tbody-pacientes");
  if (!tbody) return;

  if (pacientes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--color-text-muted)">No se encontraron pacientes</td></tr>`;
    return;
  }

  const citas = getCitas();
  tbody.innerHTML = pacientes.map(p => {
    const citasPaciente = citas.filter(c => c.pacienteId === p.id);
    const ultima = citasPaciente.sort((a,b) => b.fecha.localeCompare(a.fecha))[0];
    return `
      <tr id="row-paciente-${p.id}" data-paciente-id="${p.id}">
        <td class="td-primary">${p.nombre}</td>
        <td>${p.dni}</td>
        <td>${p.telefono}</td>
        <td>${ultima ? formatFecha(ultima.fecha) : "—"}</td>
        <td>
          <div class="td-actions">
            <button class="btn btn-sm btn-secondary" id="btn-ver-${p.id}" onclick="verPaciente('${p.id}')">Ver ficha</button>
            <button class="btn btn-sm btn-primary" onclick="irANuevaCitaPaciente('${p.id}')">Nueva cita</button>
          </div>
        </td>
      </tr>`;
  }).join("");
}

function setupBusquedaPacientes() {
  const input = document.getElementById("input-buscar-paciente");
  if (!input) return;
  input.addEventListener("input", () => renderPacientes(input.value));
}

function irANuevaCitaPaciente(pacienteId) {
  const p = getPacientes().find(x => x.id === pacienteId);
  if (!p) return;
  navigateTo("nueva-cita");
  setTimeout(() => {
    setInputVal("input-nombre-paciente", p.nombre);
    setInputVal("input-dni-paciente", p.dni);
    setInputVal("input-telefono-paciente", p.telefono);
    setInputVal("input-email-paciente", p.email);
  }, 50);
}

// ── Ficha Paciente (modal) ────────────────────────────────────────────────────
function verPaciente(pacienteId) {
  const p = getPacientes().find(x => x.id === pacienteId);
  if (!p) return;
  const citas = getCitas().filter(c => c.pacienteId === pacienteId).sort((a,b) => b.fecha.localeCompare(a.fecha));

  document.getElementById("modal-paciente-nombre").textContent = p.nombre;
  document.getElementById("modal-paciente-dni").textContent = p.dni;
  document.getElementById("modal-paciente-tel").textContent = p.telefono;
  document.getElementById("modal-paciente-email").textContent = p.email;

  const histContainer = document.getElementById("modal-historial");
  if (citas.length === 0) {
    histContainer.innerHTML = `<p style="color:var(--color-text-muted);font-size:13px">Sin citas registradas.</p>`;
  } else {
    histContainer.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Tratamiento</th><th>Médico</th><th>Estado</th></tr></thead>
          <tbody>
            ${citas.map(c => `
              <tr>
                <td>${formatFecha(c.fecha)}</td>
                <td>${c.tratamiento}</td>
                <td>${c.medico}</td>
                <td><span class="badge badge-${c.estado}">${capitalize(c.estado)}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  }

  document.getElementById("modal-ficha-paciente").classList.add("open");
}

document.addEventListener("click", (e) => {
  if (e.target.id === "modal-ficha-paciente" || e.target.id === "btn-cerrar-modal") {
    document.getElementById("modal-ficha-paciente").classList.remove("open");
  }
});

// ── Confirmar / Cancelar citas ────────────────────────────────────────────────
window.confirmarCita = async function(citaId) {
  const citas = getCitas();
  const cita = citas.find(c => c.id === citaId);
  if (!cita) return;
  cita.estado = "confirmada";
  saveCitas(citas);
  showToast(`Cita de ${cita.pacienteNombre} confirmada y actualizada en Supabase.`, "success");
  renderAgendaView();
  renderDashboard();

  await updateCitaEstadoEnSupabase(citaId, "CONFIRMADA");
};

window.cancelarCita = function(citaId) {
  document.getElementById("modal-cancelar").classList.add("open");
  document.getElementById("btn-confirmar-cancelacion").onclick = async () => {
    const citas = getCitas();
    const cita = citas.find(c => c.id === citaId);
    if (cita) {
      cita.estado = "cancelada";
      saveCitas(citas);
    }
    document.getElementById("modal-cancelar").classList.remove("open");
    showToast("Cita cancelada y actualizada en Supabase.", "error");
    renderAgendaView();
    renderDashboard();

    await updateCitaEstadoEnSupabase(citaId, "CANCELADA");
  };
};

async function updateCitaEstadoEnSupabase(citaId, nuevoEstado) {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY,
    "Content-Type": "application/json"
  };

  try {
    // Determinar si es UUID o erp_cita_id (como NEC-8503)
    let url;
    if (citaId.includes("-") && citaId.length > 20) {
      url = `${SUPABASE_URL}/rest/v1/clinica_citas?id=eq.${citaId}`;
    } else {
      url = `${SUPABASE_URL}/rest/v1/clinica_citas?erp_cita_id=eq.${citaId}`;
    }

    const res = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        estado: nuevoEstado,
        fecha_actualizacion: new Date().toISOString()
      })
    });
    console.log(`[Supabase] Estado de cita ${citaId} actualizado a ${nuevoEstado} (status: ${res.status})`);
  } catch(e) {
    console.warn("[Supabase] Error actualizando estado:", e);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.id === "modal-cancelar" || e.target.id === "btn-cerrar-cancelar") {
    document.getElementById("modal-cancelar").classList.remove("open");
  }
});

// ── Doctores ──────────────────────────────────────────────────────────────────
function populateMedicosSelect() {
  const sel = document.getElementById("select-medico");
  if (!sel) return;
  const medicos = getMedicos();
  sel.innerHTML = medicos.map(m => `<option value="${m.nombre}">${m.nombre}</option>`).join("");
}

function renderDoctores() {
  const medicos = getMedicos();
  const tbody = document.getElementById("tbody-doctores");
  if (!tbody) return;

  setEl("doctores-count", `${medicos.length} doctor${medicos.length !== 1 ? "es" : ""}`);

  if (medicos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--color-text-muted)">No hay doctores registrados</td></tr>`;
    return;
  }

  tbody.innerHTML = medicos.map(m => `
    <tr id="row-medico-${m.id}">
      <td class="td-primary">${m.nombre}</td>
      <td>${m.especialidad || "—"}</td>
      <td>Gabinete ${m.consultorio || m.consultorio_asignado || 1}</td>
      <td>${m.horario_inicio ? m.horario_inicio.substring(0, 5) : '08:30'} - ${m.horario_fin ? m.horario_fin.substring(0, 5) : '20:30'}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-sm btn-secondary" onclick="abrirEditarDoctor('${m.id}')">Editar</button>
          <button class="btn btn-sm btn-danger" id="btn-eliminar-medico-${m.id}" onclick="eliminarMedico('${m.id}')">Eliminar</button>
        </div>
      </td>
    </tr>`).join("");
}

function setupDoctoresForm() {
  document.getElementById("btn-agregar-medico")?.addEventListener("click", () => {
    const nombre = document.getElementById("input-medico-nombre").value.trim();
    const especialidad = document.getElementById("input-medico-especialidad").value.trim();

    if (!nombre) {
      showAlert("alert-doctores", "error", "El nombre es obligatorio.");
      return;
    }

    const medicos = getMedicos();
    if (medicos.find(m => m.nombre.toLowerCase() === nombre.toLowerCase())) {
      showAlert("alert-doctores", "error", "Ya existe un doctor con ese nombre.");
      return;
    }

    medicos.push({ id: generateId("M"), nombre, especialidad, consultorio: 1, horario_inicio: "08:30:00", horario_fin: "20:30:00" });
    saveMedicos(medicos);
    document.getElementById("input-medico-nombre").value = "";
    document.getElementById("input-medico-especialidad").value = "";
    renderDoctores();
    populateMedicosSelect();
    populateAgendaDoctorFilter();
    showAlert("alert-doctores", "success", `${nombre} agregado correctamente.`);
  });
}

window.eliminarMedico = function(medicoId) {
  const medicos = getMedicos().filter(m => m.id !== medicoId);
  saveMedicos(medicos);
  renderDoctores();
  populateMedicosSelect();
  populateAgendaDoctorFilter();
  showToast("Doctor eliminado.", "error");
};

// ── Modal: Alta Nuevo Paciente ───────────────────────────────────────────────
function setupNuevoPacienteModal() {
  const btnAbrir = document.getElementById("btn-abrir-nuevo-paciente");
  const modal = document.getElementById("modal-nuevo-paciente");
  const btnCerrar = document.getElementById("btn-cerrar-nuevo-paciente");
  const form = document.getElementById("form-nuevo-paciente");

  if (btnAbrir && modal) {
    btnAbrir.addEventListener("click", () => {
      hideAlert("alert-nuevo-paciente");
      modal.classList.add("open");
    });
  }

  if (btnCerrar && modal) {
    btnCerrar.addEventListener("click", () => {
      modal.classList.remove("open");
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dni = getVal("nuevo-p-dni").toUpperCase();
      const tel = getVal("nuevo-p-telefono");
      const nom = getVal("nuevo-p-nombre");
      const email = getVal("nuevo-p-email");
      const rgpd = document.getElementById("nuevo-p-rgpd")?.checked ?? true;

      if (!dni || !tel || !nom) {
        showAlert("alert-nuevo-paciente", "error", "DNI, Teléfono y Nombre son campos obligatorios.");
        return;
      }

      const pacientes = getPacientes();
      if (pacientes.some(p => p.dni === dni)) {
        showAlert("alert-nuevo-paciente", "error", `Ya existe un paciente con el DNI ${dni}.`);
        return;
      }

      const nuevoP = {
        id: generateId("P"),
        nombre: nom,
        dni: dni,
        telefono: tel,
        email: email,
        fechaNacimiento: "",
        historial: []
      };

      pacientes.push(nuevoP);
      savePacientes(pacientes);
      renderPacientes();

      await syncPacienteToSupabase({
        dni,
        nombreCompleto: nom,
        telefono: tel,
        email,
        acepta_rgpd: rgpd
      });

      modal.classList.remove("open");
      form.reset();
      showToast(`Paciente ${nom} registrado con éxito en la clínica y en Supabase.`, "success");
    });
  }
}

async function syncPacienteToSupabase(data) {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };

  try {
    const partes = (data.nombreCompleto || "").trim().split(" ");
    const nombre = partes[0] || "Paciente";
    const apellidos = partes.slice(1).join(" ") || "";

    const payload = {
      dni: data.dni,
      nombre: nombre,
      apellidos: apellidos,
      telefono: data.telefono,
      email: data.email || null,
      acepta_rgpd: data.acepta_rgpd !== false,
      fecha_alta: new Date().toISOString()
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/clinica_pacientes`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
    console.log("[Sync ERP -> Supabase] Paciente sincronizado:", res.status);
  } catch(e) {
    console.warn("[Sync ERP -> Supabase] Error sincronizando paciente:", e);
  }
}

// ── Modal: Editar Doctor ────────────────────────────────────────────────────
function setupEditarDoctorModal() {
  const modal = document.getElementById("modal-editar-doctor");
  const btnCerrar = document.getElementById("btn-cerrar-editar-doctor");
  const form = document.getElementById("form-editar-doctor");

  if (btnCerrar && modal) {
    btnCerrar.addEventListener("click", () => modal.classList.remove("open"));
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = getVal("edit-doc-id");
      const nombre = getVal("edit-doc-nombre");
      const esp = getVal("edit-doc-especialidad");
      const consultorio = parseInt(getVal("edit-doc-consultorio") || "1", 10);
      const dias = getVal("edit-doc-dias");
      const hInicio = getVal("edit-doc-hora-inicio") || "08:30";
      const hFin = getVal("edit-doc-hora-fin") || "20:30";

      const medicos = getMedicos();
      const idx = medicos.findIndex(m => m.id === id);
      if (idx >= 0) {
        medicos[idx] = {
          ...medicos[idx],
          nombre,
          especialidad: esp,
          consultorio,
          dias,
          horario_inicio: hInicio,
          horario_fin: hFin
        };
        saveMedicos(medicos);
        renderDoctores();
        populateMedicosSelect();
        populateAgendaDoctorFilter();
      }

      await syncDoctorToSupabase({
        id,
        nombre,
        especialidad: esp,
        consultorio,
        horario_inicio: hInicio,
        horario_fin: hFin
      });

      modal.classList.remove("open");
      showToast(`Doctor ${nombre} actualizado correctamente en Supabase.`, "success");
    });
  }
}

window.abrirEditarDoctor = function(id) {
  const m = getMedicos().find(x => x.id === id);
  if (!m) return;
  setInputVal("edit-doc-id", m.id);
  setInputVal("edit-doc-nombre", m.nombre);
  setInputVal("edit-doc-especialidad", m.especialidad || "");
  setInputVal("edit-doc-consultorio", m.consultorio || m.consultorio_asignado || 1);
  setInputVal("edit-doc-dias", m.dias || "Lunes a Viernes");
  setInputVal("edit-doc-hora-inicio", m.horario_inicio ? m.horario_inicio.substring(0, 5) : "08:30");
  setInputVal("edit-doc-hora-fin", m.horario_fin ? m.horario_fin.substring(0, 5) : "20:30");

  hideAlert("alert-editar-doctor");
  document.getElementById("modal-editar-doctor")?.classList.add("open");
};

async function syncDoctorToSupabase(doc) {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY,
    "Content-Type": "application/json"
  };

  try {
    const payload = {
      especialidad: doc.especialidad,
      consultorio_asignado: doc.consultorio,
      horario_inicio: (doc.horario_inicio || "08:30") + ":00",
      horario_fin: (doc.horario_fin || "20:30") + ":00"
    };

    const url = `${SUPABASE_URL}/rest/v1/clinica_doctores?nombre_completo=ilike.*${encodeURIComponent(doc.nombre.replace(/^(Dr\.|Dra\.)\s*/, ''))}*`;
    await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload)
    });
  } catch(e) {
    console.warn("[Sync Doctor -> Supabase] Error:", e);
  }
}

// ── Configuración, Bloqueo de Clínica y Vacaciones ──────────────────────────
function setupConfiguracionPage() {
  renderConfiguracionPage();

  document.getElementById("btn-guardar-cfg-horarios")?.addEventListener("click", () => {
    const cfg = getConfiguracion();
    cfg.horaApertura = getVal("cfg-hora-apertura") || "08:30";
    cfg.horaCierre = getVal("cfg-hora-cierre") || "20:30";
    cfg.duraciones = {
      "Odontología General": parseInt(getVal("dur-general") || "30", 10),
      "Ortodoncia": parseInt(getVal("dur-ortodoncia") || "30", 10),
      "Cirugía Oral e Implantes": parseInt(getVal("dur-cirugia") || "60", 10),
      "Endodoncia / Periodoncia": parseInt(getVal("dur-endodoncia") || "45", 10)
    };
    saveConfiguracion(cfg);
    showToast("Horarios y duraciones guardados con éxito.", "success");
    renderAgendaView();
  });

  document.getElementById("btn-agregar-bloqueo")?.addEventListener("click", () => {
    const fInicio = getVal("bloqueo-fecha-inicio");
    const fFin = getVal("bloqueo-fecha-fin") || fInicio;
    const motivo = getVal("bloqueo-motivo") || "Cierre de clínica";

    if (!fInicio) {
      showToast("Ingresa la fecha de inicio del bloqueo.", "error");
      return;
    }

    const cfg = getConfiguracion();
    cfg.bloqueosClinica = cfg.bloqueosClinica || [];
    cfg.bloqueosClinica.push({
      id: "B" + Date.now(),
      fechaInicio: fInicio,
      fechaFin: fFin,
      motivo
    });
    saveConfiguracion(cfg);
    setInputVal("bloqueo-fecha-inicio", "");
    setInputVal("bloqueo-fecha-fin", "");
    setInputVal("bloqueo-motivo", "");
    renderListaBloqueos();
    renderAgendaView();
    showToast(`Clínica bloqueada del ${formatFecha(fInicio)} al ${formatFecha(fFin)}.`, "success");
  });

  document.getElementById("btn-registrar-vacaciones")?.addEventListener("click", async () => {
    const docOrigen = getVal("vac-doctor-origen");
    const docReemplazo = getVal("vac-doctor-reemplazo");
    const fInicio = getVal("vac-fecha-inicio");
    const fFin = getVal("vac-fecha-fin");

    if (!docOrigen || !docReemplazo || !fInicio || !fFin) {
      showToast("Completa todos los campos para registrar las vacaciones.", "error");
      return;
    }

    if (docOrigen === docReemplazo) {
      showToast("El profesional sustituto debe ser diferente al que sale de vacaciones.", "error");
      return;
    }

    const cfg = getConfiguracion();
    cfg.vacacionesDoctores = cfg.vacacionesDoctores || [];
    cfg.vacacionesDoctores.push({
      id: "V" + Date.now(),
      doctorOrigen: docOrigen,
      doctorReemplazo: docReemplazo,
      fechaInicio: fInicio,
      fechaFin: fFin,
      fechaRegistro: new Date().toISOString()
    });
    saveConfiguracion(cfg);

    const localCitas = getCitas();
    let reasignadas = 0;
    localCitas.forEach(c => {
      if (c.medico === docOrigen && c.fecha >= fInicio && c.fecha <= fFin && c.estado !== "cancelada") {
        c.medico = docReemplazo;
        c.notas = (c.notas ? c.notas + " · " : "") + `Reasignada por vacaciones de ${docOrigen}`;
        reasignadas++;
      }
    });
    saveCitas(localCitas);

    await reasignarCitasEnSupabase(docOrigen, docReemplazo, fInicio, fFin);

    setInputVal("vac-fecha-inicio", "");
    setInputVal("vac-fecha-fin", "");
    renderListaVacaciones();
    renderAgendaView();
    renderDashboard();
    showToast(`Vacaciones registradas. Se reasignaron ${reasignadas} turno(s) a ${docReemplazo}.`, "success");
  });
}

function renderConfiguracionPage() {
  const cfg = getConfiguracion();
  setInputVal("cfg-hora-apertura", cfg.horaApertura || "08:30");
  setInputVal("cfg-hora-cierre", cfg.horaCierre || "20:30");

  if (cfg.duraciones) {
    if (cfg.duraciones["Odontología General"]) setInputVal("dur-general", cfg.duraciones["Odontología General"]);
    if (cfg.duraciones["Ortodoncia"]) setInputVal("dur-ortodoncia", cfg.duraciones["Ortodoncia"]);
    if (cfg.duraciones["Cirugía Oral e Implantes"]) setInputVal("dur-cirugia", cfg.duraciones["Cirugía Oral e Implantes"]);
    if (cfg.duraciones["Endodoncia / Periodoncia"]) setInputVal("dur-endodoncia", cfg.duraciones["Endodoncia / Periodoncia"]);
  }

  const medicos = getMedicos();
  const selOrigen = document.getElementById("vac-doctor-origen");
  const selReemplazo = document.getElementById("vac-doctor-reemplazo");
  if (selOrigen && selReemplazo) {
    const opts = medicos.map(m => `<option value="${m.nombre}">${m.nombre} (${m.especialidad || 'General'})</option>`).join("");
    selOrigen.innerHTML = opts;
    selReemplazo.innerHTML = opts;
    if (medicos.length > 1) selReemplazo.selectedIndex = 1;
  }

  renderListaBloqueos();
  renderListaVacaciones();
}

function renderListaBloqueos() {
  const container = document.getElementById("lista-bloqueos");
  if (!container) return;
  const cfg = getConfiguracion();
  const bloqueos = cfg.bloqueosClinica || [];

  if (bloqueos.length === 0) {
    container.innerHTML = '<p style="color:var(--color-text-muted)">No hay cierres programados.</p>';
    return;
  }

  container.innerHTML = bloqueos.map(b => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#FEF2F2;border:1px solid #FECACA;border-radius:6px;margin-bottom:6px">
      <div>
        <strong style="color:#B91C1C">${b.motivo || 'Cierre de Clínica'}</strong>
        <div style="font-size:11px;color:#7F1D1D">Desde ${formatFecha(b.fechaInicio)} hasta ${formatFecha(b.fechaFin)}</div>
      </div>
      <button class="btn btn-sm btn-danger" onclick="eliminarBloqueoClinica('${b.id}')">Quitar</button>
    </div>
  `).join("");
}

window.eliminarBloqueoClinica = function(id) {
  const cfg = getConfiguracion();
  cfg.bloqueosClinica = (cfg.bloqueosClinica || []).filter(b => b.id !== id);
  saveConfiguracion(cfg);
  renderListaBloqueos();
  renderAgendaView();
  showToast("Bloqueo eliminado.", "success");
};

function renderListaVacaciones() {
  const container = document.getElementById("lista-vacaciones");
  if (!container) return;
  const cfg = getConfiguracion();
  const vacs = cfg.vacacionesDoctores || [];

  if (vacs.length === 0) {
    container.innerHTML = '<p style="color:var(--color-text-muted)">No hay registros de vacaciones activos.</p>';
    return;
  }

  container.innerHTML = vacs.map(v => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:6px;margin-bottom:6px">
      <div>
        <strong style="color:#166534">${v.doctorOrigen} ➜ Reemplaza: ${v.doctorReemplazo}</strong>
        <div style="font-size:11px;color:#14532D">Período: ${formatFecha(v.fechaInicio)} al ${formatFecha(v.fechaFin)}</div>
      </div>
      <button class="btn btn-sm btn-secondary" onclick="eliminarVacaciones('${v.id}')">Eliminar</button>
    </div>
  `).join("");
}

window.eliminarVacaciones = function(id) {
  const cfg = getConfiguracion();
  cfg.vacacionesDoctores = (cfg.vacacionesDoctores || []).filter(v => v.id !== id);
  saveConfiguracion(cfg);
  renderListaVacaciones();
  showToast("Registro de vacaciones eliminado.", "info");
};

async function reasignarCitasEnSupabase(doctorOrigenNombre, doctorReemplazoNombre, fechaInicio, fechaFin) {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY,
    "Content-Type": "application/json"
  };

  try {
    const docRes = await fetch(`${SUPABASE_URL}/rest/v1/clinica_doctores?select=*`, { headers });
    const docs = await docRes.json();
    if (!Array.isArray(docs)) return;

    const docOrigObj = docs.find(d => (d.nombre_completo || "").toLowerCase().includes(doctorOrigenNombre.toLowerCase().replace(/^(dr\.|dra\.)\s*/, '')));
    const docReempObj = docs.find(d => (d.nombre_completo || "").toLowerCase().includes(doctorReemplazoNombre.toLowerCase().replace(/^(dr\.|dra\.)\s*/, '')));

    if (!docOrigObj || !docReempObj) {
      console.warn("[Reasignar Supabase] Uno de los doctores no fue hallado en Supabase");
      return;
    }

    const patchUrl = `${SUPABASE_URL}/rest/v1/clinica_citas?doctor_id=eq.${docOrigObj.id}&fecha_hora_inicio=gte.${fechaInicio}T00:00:00Z&fecha_hora_inicio=lte.${fechaFin}T23:59:59Z`;
    await fetch(patchUrl, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        doctor_id: docReempObj.id,
        consultorio_num: docReempObj.consultorio_asignado || 1
      })
    });

    console.log(`[Reasignar Supabase] Citas de ${doctorOrigenNombre} reasignadas a ${doctorReemplazoNombre} en Supabase.`);
  } catch(e) {
    console.warn("[Reasignar Supabase] Error:", e);
  }
}

async function fetchPacientesFromSupabase() {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/clinica_pacientes?select=*`, { headers });
    if (!res.ok) return;
    const remotePacs = await res.json();
    if (!Array.isArray(remotePacs)) return;

    const localPacs = getPacientes();
    let updated = false;

    for (const rp of remotePacs) {
      const idx = localPacs.findIndex(p => p.dni === rp.dni);
      const nombreCompleto = `${rp.nombre} ${rp.apellidos || ''}`.trim();
      const pObj = {
        id: rp.id,
        dni: rp.dni,
        nombre: nombreCompleto,
        telefono: rp.telefono || "—",
        email: rp.email || "",
        fechaNacimiento: "",
        historial: []
      };

      if (idx >= 0) {
        localPacs[idx] = { ...localPacs[idx], ...pObj };
        updated = true;
      } else {
        localPacs.push(pObj);
        updated = true;
      }
    }

    if (updated) {
      savePacientes(localPacs);
      renderPacientes();
      renderDashboard();
    }
  } catch(e) {
    console.warn("[Sync Supabase -> ERP] Error fetching pacientes:", e);
  }
}

async function fetchDoctoresFromSupabase() {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/clinica_doctores?select=*`, { headers });
    if (!res.ok) return;
    const remoteDocs = await res.json();
    if (!Array.isArray(remoteDocs) || remoteDocs.length === 0) return;

    const localDocs = getMedicos();
    let updated = false;

    for (const rd of remoteDocs) {
      const idx = localDocs.findIndex(d => d.nombre.toLowerCase() === (rd.nombre_completo || "").toLowerCase());
      const dObj = {
        id: rd.id,
        nombre: rd.nombre_completo,
        especialidad: rd.especialidad || "Odontología General",
        consultorio: rd.consultorio_asignado || 1,
        horario_inicio: rd.horario_inicio || "08:30:00",
        horario_fin: rd.horario_fin || "20:30:00",
        dias: "Lunes a Viernes"
      };

      if (idx >= 0) {
        localDocs[idx] = { ...localDocs[idx], ...dObj };
        updated = true;
      } else {
        localDocs.push(dObj);
        updated = true;
      }
    }

    if (updated) {
      saveMedicos(localDocs);
      renderDoctores();
      populateMedicosSelect();
      populateAgendaDoctorFilter();
    }
  } catch(e) {
    console.warn("[Sync Supabase -> ERP] Error fetching doctores:", e);
  }
}

// ── Navigate exposed globally ─────────────────────────────────────────────────
window.navigateTo = navigateTo;
window.verPaciente = verPaciente;
window.irANuevaCitaPaciente = irANuevaCitaPaciente;
window.irANuevaCita = irANuevaCita;

// ── Helpers ───────────────────────────────────────────────────────────────────
function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function getVal(id) { const el = document.getElementById(id); return el ? el.value.trim() : ""; }
function setInputVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }
function capitalize(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ""; }
function formatFecha(iso) {
  if (!iso) return "—";
  const [y,m,d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function showAlert(id, type, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert alert-${type} visible`;
  el.querySelector(".alert-text").textContent = msg;
  if (type === "success") setTimeout(() => hideAlert(id), 5000);
}

function hideAlert(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("visible");
}

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast toast-${type} visible`;
  setTimeout(() => toast.classList.remove("visible"), 3500);
}

// ── Sincronización Bidireccional con Supabase (SSOT) ──────────────────────────
async function syncCitaToSupabase(data) {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };

  try {
    let pacienteId = null;
    const cleanDni = (data.dni || "").replace(/[^0-9A-Z]/gi, "");

    // 1. Buscar paciente por DNI si existe
    if (cleanDni) {
      const pResp = await fetch(`${SUPABASE_URL}/rest/v1/clinica_pacientes?dni=eq.${cleanDni}&select=id`, { headers });
      const pData = await pResp.json();
      if (Array.isArray(pData) && pData.length > 0) {
        pacienteId = pData[0].id;
      }
    }

    // 2. Si no existe, crear paciente en Supabase
    if (!pacienteId) {
      const partes = (data.nombre || "Paciente").trim().split(" ");
      const nombre = partes[0] || "Paciente";
      const apellidos = partes.slice(1).join(" ") || "";

      const nuevoP = {
        dni: cleanDni || ("PRES-" + Math.floor(10000000 + Math.random() * 90000000)),
        nombre: nombre,
        apellidos: apellidos,
        telefono: data.telefono || "Sin registrar",
        email: data.email || null,
        acepta_rgpd: true,
        fecha_alta: new Date().toISOString()
      };

      const insResp = await fetch(`${SUPABASE_URL}/rest/v1/clinica_pacientes`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(nuevoP)
      });
      const insData = await insResp.json();
      if (Array.isArray(insData) && insData.length > 0) {
        pacienteId = insData[0].id;
      }
    }

    // 3. Buscar doctor asignado
    const docResp = await fetch(`${SUPABASE_URL}/rest/v1/clinica_doctores?select=*`, { headers });
    const doctores = await docResp.json();
    let doctor = (Array.isArray(doctores) && doctores.length > 0) ? doctores[0] : { id: null, consultorio_asignado: 1 };
    if (Array.isArray(doctores) && data.medico) {
      const docFound = doctores.find(d => (d.nombre_completo || "").toLowerCase().includes((data.medico || "").toLowerCase()));
      if (docFound) doctor = docFound;
    }

    // 4. Formatear fecha y hora
    const fechaLimpia = (data.fecha || "").replace(/[^0-9-]/g, "") || new Date().toISOString().split("T")[0];
    const horaLimpia = (data.hora || "10:00").length === 5 ? `${data.hora}:00` : "10:00:00";
    const startIso = `${fechaLimpia}T${horaLimpia}Z`;
    const duracionMin = 30; // 30 minutos por defecto
    const endIso = new Date(new Date(startIso).getTime() + duracionMin * 60 * 1000).toISOString();

    // 5. Insertar cita en Supabase con canal PRESENCIAL
    const nuevaCita = {
      erp_cita_id: data.erp_cita_id,
      paciente_id: pacienteId,
      doctor_id: doctor.id,
      especialidad: data.especialidad || "General",
      consultorio_num: doctor.consultorio_asignado || 1,
      fecha_hora_inicio: startIso,
      fecha_hora_fin: endIso,
      estado: "PROGRAMADA",
      canal_origen: "PRESENCIAL"
    };

    const citaResp = await fetch(`${SUPABASE_URL}/rest/v1/clinica_citas`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(nuevaCita)
    });

    console.log("[Sync ERP -> Supabase] Cita sincronizada con éxito en Supabase:", data.erp_cita_id);
    showToast(`Sincronizado con base de datos central (Supabase): ${data.erp_cita_id}`, "success");
  } catch (err) {
    console.warn("[Sync ERP -> Supabase] Error sincronizando con Supabase:", err.message);
  }
}

// ── Sincronización Supabase -> ERP (Cargar citas remotas de Telegram / SSOT) ──
async function fetchCitasFromSupabase() {
  const SUPABASE_URL = "https://ibnkmbcnkrvwdtrjmcel.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibmttYmNua3J2d2R0cmptY2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTExNDc4MCwiZXhwIjoyMTA0NjkwNzgwfQ.DwRIy8-ktRewOdswssnA-oC_b4TVLa0jSrLmjkXIS40";
  const headers = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/clinica_citas?select=*,clinica_pacientes(id,nombre,apellidos,dni,telefono),clinica_doctores(nombre_completo)&order=fecha_hora_inicio.asc`, { headers });
    if (!res.ok) return;
    const remoteCitas = await res.json();
    if (!Array.isArray(remoteCitas)) return;

    const localCitas = getCitas();
    let updated = false;

    for (const rc of remoteCitas) {
      if (!rc.fecha_hora_inicio) continue;
      const fParts = rc.fecha_hora_inicio.split("T");
      const fecha = fParts[0];
      const hora = fParts[1] ? fParts[1].substring(0, 5) : "10:00";
      const pacNombre = rc.clinica_pacientes ? `${rc.clinica_pacientes.nombre} ${rc.clinica_pacientes.apellidos || ''}`.trim() : "Paciente";
      const medNombre = rc.clinica_doctores ? rc.clinica_doctores.nombre_completo : "Dra. Martínez";
      const citaId = rc.erp_cita_id || rc.id;

      const idx = localCitas.findIndex(c => c.id === citaId || c.erp_cita_id === citaId);
      const citaObj = {
        id: citaId,
        erp_cita_id: citaId,
        pacienteId: rc.paciente_id || "P_SUPA",
        pacienteNombre: pacNombre,
        tratamiento: rc.especialidad || "Consulta general",
        fecha: fecha,
        hora: hora,
        medico: medNombre,
        estado: (rc.estado || "confirmada").toLowerCase(),
        notas: `Canal: ${rc.canal_origen || 'TELEGRAM'}`
      };

      if (idx >= 0) {
        localCitas[idx] = { ...localCitas[idx], ...citaObj };
        updated = true;
      } else {
        localCitas.push(citaObj);
        updated = true;
      }
    }

    if (updated) {
      saveCitas(localCitas);
      renderDashboard();
      renderAgendaView();
    }
  } catch(e) {
    console.warn("[Sync Supabase -> ERP] Error cargando citas:", e);
  }
}

