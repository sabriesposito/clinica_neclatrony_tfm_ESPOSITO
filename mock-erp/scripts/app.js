// ── NECLATRONY – App Logic ─────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initData();
  renderTopbarDate();
  renderDashboard();
  renderAgenda();
  populateTratamientos();
  populateHorarios();
  populateMedicosSelect();
  renderPacientes();
  renderDoctores();
  setupNavigation();
  setupNuevaCitaForm();
  setupBusquedaPacientes();
  setupAgendaDatePicker();
  setupDoctoresForm();

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

// ── Agenda ───────────────────────────────────────────────────────────────────
function setupAgendaDatePicker() {
  const picker = document.getElementById("agenda-fecha");
  if (!picker) return;
  picker.value = new Date().toISOString().split("T")[0];
  picker.addEventListener("change", renderAgendaView);
}

function renderAgenda() { renderAgendaView(); }

function renderAgendaView() {
  const picker = document.getElementById("agenda-fecha");
  const fecha = picker ? picker.value : new Date().toISOString().split("T")[0];
  const citas = getCitas().filter(c => c.fecha === fecha);
  const container = document.getElementById("agenda-view");
  if (!container) return;

  const HORAS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","16:00","16:30","17:00","17:30","18:00","18:30"];

  container.innerHTML = "";
  HORAS.forEach(hora => {
    const cita = citas.find(c => c.hora === hora);
    const row = document.createElement("div");
    row.className = "agenda-row";

    if (cita) {
      row.innerHTML = `
        <div class="agenda-time">${hora}</div>
        <div class="agenda-event ${cita.estado}" style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div class="agenda-event-name">${cita.pacienteNombre}</div>
            <div class="agenda-event-detail">${cita.tratamiento} · ${cita.medico}</div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <span class="badge badge-${cita.estado}">${capitalize(cita.estado)}</span>
            ${cita.estado === "pendiente" ? `<button class="btn btn-sm btn-success" id="btn-confirmar-${cita.id}" onclick="confirmarCita('${cita.id}')">Confirmar</button>` : ""}
            ${cita.estado !== "cancelada" && cita.estado !== "completada" ? `<button class="btn btn-sm btn-danger" id="btn-cancelar-${cita.id}" onclick="cancelarCita('${cita.id}')">Cancelar</button>` : ""}
          </div>
        </div>`;
    } else {
      row.innerHTML = `
        <div class="agenda-time">${hora}</div>
        <div class="agenda-empty" id="slot-${hora.replace(":","")}" data-hora="${hora}" data-fecha="${fecha}">Disponible — <span style="color:var(--color-primary-mid);cursor:pointer;font-weight:600" onclick="irANuevaCita('${fecha}','${hora}')">+ Nueva cita</span></div>`;
    }
    container.appendChild(row);
  });

  // Resumen del día
  setEl("agenda-resumen", `${citas.filter(c=>c.estado!=="cancelada").length} citas · ${HORAS.length - citas.filter(c=>c.estado!=="cancelada").length} slots libres`);
}

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
window.confirmarCita = function(citaId) {
  const citas = getCitas();
  const cita = citas.find(c => c.id === citaId);
  if (!cita) return;
  cita.estado = "confirmada";
  saveCitas(citas);
  showToast(`Cita de ${cita.pacienteNombre} confirmada.`, "success");
  renderAgendaView();
  renderDashboard();
};

window.cancelarCita = function(citaId) {
  document.getElementById("modal-cancelar").classList.add("open");
  document.getElementById("btn-confirmar-cancelacion").onclick = () => {
    const citas = getCitas();
    const cita = citas.find(c => c.id === citaId);
    if (cita) { cita.estado = "cancelada"; saveCitas(citas); }
    document.getElementById("modal-cancelar").classList.remove("open");
    showToast("Cita cancelada.", "error");
    renderAgendaView();
    renderDashboard();
  };
};

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
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:32px;color:var(--color-text-muted)">No hay doctores registrados</td></tr>`;
    return;
  }

  tbody.innerHTML = medicos.map(m => `
    <tr id="row-medico-${m.id}">
      <td class="td-primary">${m.nombre}</td>
      <td>${m.especialidad || "—"}</td>
      <td>
        <button class="btn btn-sm btn-danger" id="btn-eliminar-medico-${m.id}" onclick="eliminarMedico('${m.id}')">Eliminar</button>
      </td>
    </tr>`).join("");
}

function setupDoctoresForm() {
  document.getElementById("btn-agregar-medico").addEventListener("click", () => {
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

    medicos.push({ id: generateId("M"), nombre, especialidad });
    saveMedicos(medicos);
    document.getElementById("input-medico-nombre").value = "";
    document.getElementById("input-medico-especialidad").value = "";
    renderDoctores();
    populateMedicosSelect();
    showAlert("alert-doctores", "success", `${nombre} agregado correctamente.`);
  });
}

window.eliminarMedico = function(medicoId) {
  const medicos = getMedicos().filter(m => m.id !== medicoId);
  saveMedicos(medicos);
  renderDoctores();
  populateMedicosSelect();
  showToast("Doctor eliminado.", "error");
};

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

    // 5. Insertar cita en Supabase con canal PRESENCIAL
    const nuevaCita = {
      erp_cita_id: data.erp_cita_id,
      paciente_id: pacienteId,
      doctor_id: doctor.id,
      especialidad: data.especialidad || "General",
      consultorio_num: doctor.consultorio_asignado || 1,
      fecha_hora_inicio: startIso,
      fecha_hora_fin: startIso,
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

