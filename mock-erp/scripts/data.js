// ── NECLATRONY – Mock Data & Storage (25 Pacientes - Agenda 80% Capacidad) ──

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
  { id: "M001", nombre: "Dra. Martínez",  especialidad: "General", consultorio: 1, dias: "Lun, Mar, Jue, Vie", dias_indices: [1,2,4,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M002", nombre: "Dr. Rodríguez",  especialidad: "Ortodoncia", consultorio: 5, dias: "Lunes a Jueves", dias_indices: [1,2,3,4], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M003", nombre: "Dra. López",     especialidad: "General", consultorio: 2, dias: "Mar, Mié, Jue, Vie", dias_indices: [2,3,4,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M004", nombre: "Dr. Sánchez",    especialidad: "Cirugía oral", consultorio: 4, dias: "Lun, Mié, Jue, Vie", dias_indices: [1,3,4,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
  { id: "M005", nombre: "Dra. García",    especialidad: "Periodoncia", consultorio: 5, dias: "Lunes a Jueves", dias_indices: [1,2,3,4], horario_inicio: "12:30:00", horario_fin: "18:30:00" },
  { id: "M006", nombre: "Dr. Fernández",  especialidad: "Endodoncia", consultorio: 6, dias: "Lun, Mié, Vie", dias_indices: [1,3,5], horario_inicio: "13:30:00", horario_fin: "19:30:00" },
  { id: "M007", nombre: "Dra. Torres",    especialidad: "Odontopediatría", consultorio: 1, dias: "Lunes a Viernes", dias_indices: [1,2,3,4,5], horario_inicio: "10:30:00", horario_fin: "15:00:00" },
  { id: "M008", nombre: "Dr. Morales",    especialidad: "Implante dental", consultorio: 3, dias: "Lun, Vie", dias_indices: [1,5], horario_inicio: "09:00:00", horario_fin: "20:00:00" },
];

const INITIAL_PACIENTES = [
  {
    "id": "2c485bb6-9d14-43ed-a5d9-5d0fe065b52d",
    "nombre": "Sofía Ruiz Morales",
    "dni": "56789012E",
    "telefono": "656789012",
    "email": "sofia.ruiz@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "d3037f1a-f23d-4687-b823-2e17213016d3",
    "nombre": "Carla",
    "dni": "12345689",
    "telefono": "518711654",
    "email": null,
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "05bac5fa-97ff-4ab7-b0c4-a494788edb7a",
    "nombre": "Miguel López Fernández",
    "dni": "45678901D",
    "telefono": "1111111",
    "email": "mlopez@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "dc13437d-cbd2-482e-b2a2-7a19f7f7162c",
    "nombre": "Giovanna Dapena",
    "dni": "45896235",
    "telefono": "123456854",
    "email": null,
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "e9e13797-856b-4fa0-a54b-6d589caa8b32",
    "nombre": "Tony Montana",
    "dni": "76543216",
    "telefono": "22334455",
    "email": null,
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "3af7def6-b6d6-493f-8e4e-278deb5f170f",
    "nombre": "Lali Esposito",
    "dni": "98765438",
    "telefono": "55668899",
    "email": null,
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "28f2dc07-f3f0-40c4-bbfb-35f2c9a71614",
    "nombre": "Pablo Zilber",
    "dni": "28800559",
    "telefono": "34498888",
    "email": null,
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "750a2b26-abb3-4f0c-b174-882a0ff4eaf0",
    "nombre": "Sabrina Esposito",
    "dni": "38522432",
    "telefono": "1166266845",
    "email": null,
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "24da22b7-91c0-41f2-bfca-48a36f9df698",
    "nombre": "Carlos Mendoza",
    "dni": "30112233",
    "telefono": "1144556677",
    "email": "carlos.mendoza@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "b8bd5cc6-416a-46b5-8e23-41011c111dc5",
    "nombre": "Lucía Navarro",
    "dni": "32445566",
    "telefono": "1155667788",
    "email": "lucia.navarro@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "16c05c1c-fd4c-490e-af92-0c578e714970",
    "nombre": "Martín Palermo",
    "dni": "23998877",
    "telefono": "1166778899",
    "email": "martin.palermo@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "ca9ec61a-5691-4ab4-ae1d-6694bf5d1a90",
    "nombre": "Valentina Rossi",
    "dni": "41223344",
    "telefono": "1177889900",
    "email": "valentina.rossi@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "6df727d2-c6e0-46c1-9ee3-8b13bdc65562",
    "nombre": "Diego Maradona",
    "dni": "14223344",
    "telefono": "1188990011",
    "email": "diego.maradona@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "988a0bff-82ae-4eb4-b93c-174ee09c73f2",
    "nombre": "Florencia Peña",
    "dni": "24556677",
    "telefono": "1199001122",
    "email": "florencia.pena@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "ab6bae81-9c6a-4e9a-b8c9-8959d2912538",
    "nombre": "Gonzalo Higuaín",
    "dni": "33445566",
    "telefono": "1122334455",
    "email": "gonzalo.higuain@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "479837f4-cfc6-4dae-bf73-198dc13c82fd",
    "nombre": "Camila O'Gorman",
    "dni": "36778899",
    "telefono": "1133445566",
    "email": "camila.ogorman@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "6d4e6355-b690-4733-a545-6eca072902a1",
    "nombre": "Mateo Benítez",
    "dni": "43112233",
    "telefono": "1144332211",
    "email": "mateo.benitez@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "ce1cb9b6-8262-45ae-8e89-31f0116c6f76",
    "nombre": "Julieta Prandi",
    "dni": "27889900",
    "telefono": "1155443322",
    "email": "julieta.prandi@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "83bfd89e-3f9b-4bcb-b0b3-d92f67807374",
    "nombre": "Joaquín Sorolla",
    "dni": "21334455",
    "telefono": "1166554433",
    "email": "joaquin.sorolla@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "5c939649-7ef6-44dc-aa68-9417da2fd17f",
    "nombre": "Mariana Fabbiani",
    "dni": "25667788",
    "telefono": "1177665544",
    "email": "mariana.fabbiani@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "fd5c89a4-e18a-4b52-aa7d-392a03cf5e94",
    "nombre": "Rodrigo De Paul",
    "dni": "37889911",
    "telefono": "1188776655",
    "email": "rodrigo.depaul@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "b4b4f398-7b77-4adb-8649-80b5597e0fdf",
    "nombre": "Antonela Roccuzzo",
    "dni": "35112244",
    "telefono": "1199887766",
    "email": "antonela.roccuzzo@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "d46fe126-4fd7-4809-9790-cbaee0446807",
    "nombre": "Emiliano Martínez",
    "dni": "36445588",
    "telefono": "1122113344",
    "email": "emiliano.martinez@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "93afb674-3041-4bd0-befd-eab7af6700d7",
    "nombre": "Romina Gaetani",
    "dni": "26334477",
    "telefono": "1133224455",
    "email": "romina.gaetani@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  },
  {
    "id": "2591d4f7-3a41-43d4-9783-4d2c074e73af",
    "nombre": "Lucas Castromán",
    "dni": "28112299",
    "telefono": "1144335566",
    "email": "lucas.castroman@email.com",
    "fechaNacimiento": "1990-01-01",
    "historial": []
  }
];

const INITIAL_CITAS = [
  {
    "id": "NEC-1089",
    "pacienteId": "28f2dc07-f3f0-40c4-bbfb-35f2c9a71614",
    "pacienteNombre": "Pablo Zilber",
    "tratamiento": "General",
    "fecha": "2026-10-23",
    "hora": "16:00",
    "medico": "Dra. López",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "CMVJTWMFX",
    "pacienteId": "28f2dc07-f3f0-40c4-bbfb-35f2c9a71614",
    "pacienteNombre": "Pablo Zilber",
    "tratamiento": "Endodoncia · Cirugía oral",
    "fecha": "2026-10-23",
    "hora": "18:00",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-9967",
    "pacienteId": "3af7def6-b6d6-493f-8e4e-278deb5f170f",
    "pacienteNombre": "Lali Esposito",
    "tratamiento": "Endodoncia · Cirugía oral",
    "fecha": "2026-10-23",
    "hora": "19:00",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "CMVLDP5V1",
    "pacienteId": "3af7def6-b6d6-493f-8e4e-278deb5f170f",
    "pacienteNombre": "Lali Esposito",
    "tratamiento": "Periodoncia · Odontología general",
    "fecha": "2026-10-26",
    "hora": "16:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-1692",
    "pacienteId": "750a2b26-abb3-4f0c-b174-882a0ff4eaf0",
    "pacienteNombre": "Sabrina Esposito",
    "tratamiento": "Implante dental",
    "fecha": "2026-10-26",
    "hora": "16:00",
    "medico": "Dr. Morales",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-8117",
    "pacienteId": "750a2b26-abb3-4f0c-b174-882a0ff4eaf0",
    "pacienteNombre": "Sabrina Esposito",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-27",
    "hora": "17:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-7002",
    "pacienteId": "750a2b26-abb3-4f0c-b174-882a0ff4eaf0",
    "pacienteNombre": "Sabrina Esposito",
    "tratamiento": "General",
    "fecha": "2026-10-27",
    "hora": "18:00",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-2824",
    "pacienteId": "2c485bb6-9d14-43ed-a5d9-5d0fe065b52d",
    "pacienteNombre": "Sofía Ruiz Morales",
    "tratamiento": "Endodoncia",
    "fecha": "2026-10-26",
    "hora": "09:30",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-5506",
    "pacienteId": "d3037f1a-f23d-4687-b823-2e17213016d3",
    "pacienteNombre": "Carla",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-26",
    "hora": "10:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-3286",
    "pacienteId": "05bac5fa-97ff-4ab7-b0c4-a494788edb7a",
    "pacienteNombre": "Miguel López Fernández",
    "tratamiento": "General",
    "fecha": "2026-10-26",
    "hora": "10:30",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-9935",
    "pacienteId": "dc13437d-cbd2-482e-b2a2-7a19f7f7162c",
    "pacienteNombre": "Giovanna Dapena",
    "tratamiento": "Ortodoncia",
    "fecha": "2026-10-26",
    "hora": "11:00",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-7912",
    "pacienteId": "e9e13797-856b-4fa0-a54b-6d589caa8b32",
    "pacienteNombre": "Tony Montana",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-26",
    "hora": "11:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-2535",
    "pacienteId": "3af7def6-b6d6-493f-8e4e-278deb5f170f",
    "pacienteNombre": "Lali Esposito",
    "tratamiento": "Implante dental",
    "fecha": "2026-10-26",
    "hora": "16:30",
    "medico": "Dr. Morales",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-1434",
    "pacienteId": "28f2dc07-f3f0-40c4-bbfb-35f2c9a71614",
    "pacienteNombre": "Pablo Zilber",
    "tratamiento": "Cirugía oral",
    "fecha": "2026-10-26",
    "hora": "17:00",
    "medico": "Dr. Sánchez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-9928",
    "pacienteId": "750a2b26-abb3-4f0c-b174-882a0ff4eaf0",
    "pacienteNombre": "Sabrina Esposito",
    "tratamiento": "Endodoncia",
    "fecha": "2026-10-26",
    "hora": "17:30",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-5557",
    "pacienteId": "24da22b7-91c0-41f2-bfca-48a36f9df698",
    "pacienteNombre": "Carlos Mendoza",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-26",
    "hora": "18:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-3615",
    "pacienteId": "b8bd5cc6-416a-46b5-8e23-41011c111dc5",
    "pacienteNombre": "Lucía Navarro",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-27",
    "hora": "09:30",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-3547",
    "pacienteId": "16c05c1c-fd4c-490e-af92-0c578e714970",
    "pacienteNombre": "Martín Palermo",
    "tratamiento": "General",
    "fecha": "2026-10-27",
    "hora": "10:00",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-2674",
    "pacienteId": "ca9ec61a-5691-4ab4-ae1d-6694bf5d1a90",
    "pacienteNombre": "Valentina Rossi",
    "tratamiento": "Ortodoncia",
    "fecha": "2026-10-27",
    "hora": "10:30",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-6635",
    "pacienteId": "6df727d2-c6e0-46c1-9ee3-8b13bdc65562",
    "pacienteNombre": "Diego Maradona",
    "tratamiento": "General",
    "fecha": "2026-10-27",
    "hora": "11:00",
    "medico": "Dra. López",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-8527",
    "pacienteId": "988a0bff-82ae-4eb4-b93c-174ee09c73f2",
    "pacienteNombre": "Florencia Peña",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-27",
    "hora": "11:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-7201",
    "pacienteId": "ab6bae81-9c6a-4e9a-b8c9-8959d2912538",
    "pacienteNombre": "Gonzalo Higuaín",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-27",
    "hora": "16:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-6925",
    "pacienteId": "479837f4-cfc6-4dae-bf73-198dc13c82fd",
    "pacienteNombre": "Camila O'Gorman",
    "tratamiento": "General",
    "fecha": "2026-10-27",
    "hora": "16:30",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-1750",
    "pacienteId": "6d4e6355-b690-4733-a545-6eca072902a1",
    "pacienteNombre": "Mateo Benítez",
    "tratamiento": "Ortodoncia",
    "fecha": "2026-10-27",
    "hora": "17:00",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-2307",
    "pacienteId": "ce1cb9b6-8262-45ae-8e89-31f0116c6f76",
    "pacienteNombre": "Julieta Prandi",
    "tratamiento": "General",
    "fecha": "2026-10-27",
    "hora": "17:30",
    "medico": "Dra. López",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-7227",
    "pacienteId": "83bfd89e-3f9b-4bcb-b0b3-d92f67807374",
    "pacienteNombre": "Joaquín Sorolla",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-28",
    "hora": "09:30",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-6977",
    "pacienteId": "5c939649-7ef6-44dc-aa68-9417da2fd17f",
    "pacienteNombre": "Mariana Fabbiani",
    "tratamiento": "Ortodoncia",
    "fecha": "2026-10-28",
    "hora": "10:00",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Agendado vía sistema"
  },
  {
    "id": "NEC-3683",
    "pacienteId": "ab6bae81-9c6a-4e9a-b8c9-8959d2912538",
    "pacienteNombre": "Gonzalo Higuaín",
    "tratamiento": "Extracción",
    "fecha": "2026-10-26",
    "hora": "10:00",
    "medico": "Dr. Sánchez",
    "estado": "confirmada",
    "notas": "Cita de Extracción"
  },
  {
    "id": "NEC-3930",
    "pacienteId": "479837f4-cfc6-4dae-bf73-198dc13c82fd",
    "pacienteNombre": "Camila O'Gorman",
    "tratamiento": "Extracción",
    "fecha": "2026-10-26",
    "hora": "16:30",
    "medico": "Dr. Sánchez",
    "estado": "pendiente",
    "notas": "Cita de Extracción"
  },
  {
    "id": "NEC-2734",
    "pacienteId": "6df727d2-c6e0-46c1-9ee3-8b13bdc65562",
    "pacienteNombre": "Diego Maradona",
    "tratamiento": "Extracción",
    "fecha": "2026-10-26",
    "hora": "16:00",
    "medico": "Dr. Sánchez",
    "estado": "confirmada",
    "notas": "Cita de Extracción"
  },
  {
    "id": "NEC-3976",
    "pacienteId": "dc13437d-cbd2-482e-b2a2-7a19f7f7162c",
    "pacienteNombre": "Giovanna Dapena",
    "tratamiento": "Extracción",
    "fecha": "2026-10-26",
    "hora": "11:00",
    "medico": "Dr. Sánchez",
    "estado": "confirmada",
    "notas": "Cita de Extracción"
  },
  {
    "id": "NEC-4811",
    "pacienteId": "d46fe126-4fd7-4809-9790-cbaee0446807",
    "pacienteNombre": "Emiliano Martínez",
    "tratamiento": "Extracción",
    "fecha": "2026-10-26",
    "hora": "11:30",
    "medico": "Dr. Sánchez",
    "estado": "confirmada",
    "notas": "Cita de Extracción"
  },
  {
    "id": "NEC-6404",
    "pacienteId": "6d4e6355-b690-4733-a545-6eca072902a1",
    "pacienteNombre": "Mateo Benítez",
    "tratamiento": "Extracción",
    "fecha": "2026-10-26",
    "hora": "17:30",
    "medico": "Dr. Sánchez",
    "estado": "confirmada",
    "notas": "Cita de Extracción"
  },
  {
    "id": "NEC-9179",
    "pacienteId": "750a2b26-abb3-4f0c-b174-882a0ff4eaf0",
    "pacienteNombre": "Sabrina Esposito",
    "tratamiento": "Extracción",
    "fecha": "2026-10-26",
    "hora": "10:30",
    "medico": "Dr. Sánchez",
    "estado": "confirmada",
    "notas": "Cita de Extracción"
  },
  {
    "id": "NEC-6729",
    "pacienteId": "b4b4f398-7b77-4adb-8649-80b5597e0fdf",
    "pacienteNombre": "Antonela Roccuzzo",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-27",
    "hora": "16:00",
    "medico": "Dra. Martínez",
    "estado": "confirmada",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-6304",
    "pacienteId": "83bfd89e-3f9b-4bcb-b0b3-d92f67807374",
    "pacienteNombre": "Joaquín Sorolla",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-27",
    "hora": "11:30",
    "medico": "Dra. Martínez",
    "estado": "confirmada",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-8292",
    "pacienteId": "e9e13797-856b-4fa0-a54b-6d589caa8b32",
    "pacienteNombre": "Tony Montana",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-27",
    "hora": "11:00",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-3940",
    "pacienteId": "5c939649-7ef6-44dc-aa68-9417da2fd17f",
    "pacienteNombre": "Mariana Fabbiani",
    "tratamiento": "Limpieza dental",
    "fecha": "2026-10-27",
    "hora": "16:30",
    "medico": "Dra. López",
    "estado": "pendiente",
    "notas": "Cita de Limpieza dental"
  },
  {
    "id": "NEC-7025",
    "pacienteId": "d3037f1a-f23d-4687-b823-2e17213016d3",
    "pacienteNombre": "Carla",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-27",
    "hora": "17:00",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-2990",
    "pacienteId": "fd5c89a4-e18a-4b52-aa7d-392a03cf5e94",
    "pacienteNombre": "Rodrigo De Paul",
    "tratamiento": "Limpieza dental",
    "fecha": "2026-10-27",
    "hora": "10:00",
    "medico": "Dra. López",
    "estado": "confirmada",
    "notas": "Cita de Limpieza dental"
  },
  {
    "id": "NEC-9057",
    "pacienteId": "3af7def6-b6d6-493f-8e4e-278deb5f170f",
    "pacienteNombre": "Lali Esposito",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-27",
    "hora": "09:30",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-3679",
    "pacienteId": "2591d4f7-3a41-43d4-9783-4d2c074e73af",
    "pacienteNombre": "Lucas Castromán",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-28",
    "hora": "11:30",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-2484",
    "pacienteId": "24da22b7-91c0-41f2-bfca-48a36f9df698",
    "pacienteNombre": "Carlos Mendoza",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-28",
    "hora": "16:00",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-1052",
    "pacienteId": "28f2dc07-f3f0-40c4-bbfb-35f2c9a71614",
    "pacienteNombre": "Pablo Zilber",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-28",
    "hora": "16:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-2570",
    "pacienteId": "ca9ec61a-5691-4ab4-ae1d-6694bf5d1a90",
    "pacienteNombre": "Valentina Rossi",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-28",
    "hora": "17:00",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-2083",
    "pacienteId": "b8bd5cc6-416a-46b5-8e23-41011c111dc5",
    "pacienteNombre": "Lucía Navarro",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-28",
    "hora": "10:00",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-7827",
    "pacienteId": "2c485bb6-9d14-43ed-a5d9-5d0fe065b52d",
    "pacienteNombre": "Sofía Ruiz Morales",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-28",
    "hora": "11:00",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-4019",
    "pacienteId": "93afb674-3041-4bd0-befd-eab7af6700d7",
    "pacienteNombre": "Romina Gaetani",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-10-28",
    "hora": "09:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-4307",
    "pacienteId": "988a0bff-82ae-4eb4-b93c-174ee09c73f2",
    "pacienteNombre": "Florencia Peña",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-29",
    "hora": "10:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Cita de Periodoncia"
  },
  {
    "id": "NEC-4821",
    "pacienteId": "479837f4-cfc6-4dae-bf73-198dc13c82fd",
    "pacienteNombre": "Camila O'Gorman",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-29",
    "hora": "11:30",
    "medico": "Dra. García",
    "estado": "confirmada",
    "notas": "Cita de Periodoncia"
  },
  {
    "id": "NEC-9818",
    "pacienteId": "6df727d2-c6e0-46c1-9ee3-8b13bdc65562",
    "pacienteNombre": "Diego Maradona",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-29",
    "hora": "17:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Cita de Periodoncia"
  },
  {
    "id": "NEC-1969",
    "pacienteId": "dc13437d-cbd2-482e-b2a2-7a19f7f7162c",
    "pacienteNombre": "Giovanna Dapena",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-29",
    "hora": "11:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Cita de Periodoncia"
  },
  {
    "id": "NEC-6963",
    "pacienteId": "d46fe126-4fd7-4809-9790-cbaee0446807",
    "pacienteNombre": "Emiliano Martínez",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-29",
    "hora": "16:00",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Cita de Periodoncia"
  },
  {
    "id": "NEC-2762",
    "pacienteId": "6d4e6355-b690-4733-a545-6eca072902a1",
    "pacienteNombre": "Mateo Benítez",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-29",
    "hora": "09:30",
    "medico": "Dra. García",
    "estado": "confirmada",
    "notas": "Cita de Periodoncia"
  },
  {
    "id": "NEC-7082",
    "pacienteId": "b4b4f398-7b77-4adb-8649-80b5597e0fdf",
    "pacienteNombre": "Antonela Roccuzzo",
    "tratamiento": "Periodoncia",
    "fecha": "2026-10-29",
    "hora": "10:30",
    "medico": "Dra. García",
    "estado": "pendiente",
    "notas": "Cita de Periodoncia"
  },
  {
    "id": "NEC-8300",
    "pacienteId": "2591d4f7-3a41-43d4-9783-4d2c074e73af",
    "pacienteNombre": "Lucas Castromán",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-30",
    "hora": "16:30",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-1033",
    "pacienteId": "24da22b7-91c0-41f2-bfca-48a36f9df698",
    "pacienteNombre": "Carlos Mendoza",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-30",
    "hora": "10:00",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-2362",
    "pacienteId": "ca9ec61a-5691-4ab4-ae1d-6694bf5d1a90",
    "pacienteNombre": "Valentina Rossi",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-30",
    "hora": "09:30",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-4079",
    "pacienteId": "b8bd5cc6-416a-46b5-8e23-41011c111dc5",
    "pacienteNombre": "Lucía Navarro",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-30",
    "hora": "17:30",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-5466",
    "pacienteId": "2c485bb6-9d14-43ed-a5d9-5d0fe065b52d",
    "pacienteNombre": "Sofía Ruiz Morales",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-30",
    "hora": "11:00",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-6165",
    "pacienteId": "93afb674-3041-4bd0-befd-eab7af6700d7",
    "pacienteNombre": "Romina Gaetani",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-30",
    "hora": "16:00",
    "medico": "Dra. Martínez",
    "estado": "confirmada",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-5929",
    "pacienteId": "988a0bff-82ae-4eb4-b93c-174ee09c73f2",
    "pacienteNombre": "Florencia Peña",
    "tratamiento": "Revisión general",
    "fecha": "2026-10-30",
    "hora": "10:30",
    "medico": "Dra. Martínez",
    "estado": "pendiente",
    "notas": "Cita de Revisión general"
  },
  {
    "id": "NEC-6587",
    "pacienteId": "ab6bae81-9c6a-4e9a-b8c9-8959d2912538",
    "pacienteNombre": "Gonzalo Higuaín",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-02",
    "hora": "16:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-4954",
    "pacienteId": "479837f4-cfc6-4dae-bf73-198dc13c82fd",
    "pacienteNombre": "Camila O'Gorman",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-02",
    "hora": "10:30",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-4379",
    "pacienteId": "6df727d2-c6e0-46c1-9ee3-8b13bdc65562",
    "pacienteNombre": "Diego Maradona",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-02",
    "hora": "11:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-3594",
    "pacienteId": "dc13437d-cbd2-482e-b2a2-7a19f7f7162c",
    "pacienteNombre": "Giovanna Dapena",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-02",
    "hora": "17:00",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-2503",
    "pacienteId": "d46fe126-4fd7-4809-9790-cbaee0446807",
    "pacienteNombre": "Emiliano Martínez",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-02",
    "hora": "09:30",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-9260",
    "pacienteId": "6d4e6355-b690-4733-a545-6eca072902a1",
    "pacienteNombre": "Mateo Benítez",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-02",
    "hora": "10:00",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-9585",
    "pacienteId": "750a2b26-abb3-4f0c-b174-882a0ff4eaf0",
    "pacienteNombre": "Sabrina Esposito",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-02",
    "hora": "17:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-9862",
    "pacienteId": "b4b4f398-7b77-4adb-8649-80b5597e0fdf",
    "pacienteNombre": "Antonela Roccuzzo",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-03",
    "hora": "17:30",
    "medico": "Dr. Rodríguez",
    "estado": "confirmada",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-8704",
    "pacienteId": "16c05c1c-fd4c-490e-af92-0c578e714970",
    "pacienteNombre": "Martín Palermo",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-03",
    "hora": "11:30",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-7381",
    "pacienteId": "05bac5fa-97ff-4ab7-b0c4-a494788edb7a",
    "pacienteNombre": "Miguel López Fernández",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-03",
    "hora": "10:00",
    "medico": "Dr. Rodríguez",
    "estado": "confirmada",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-1929",
    "pacienteId": "83bfd89e-3f9b-4bcb-b0b3-d92f67807374",
    "pacienteNombre": "Joaquín Sorolla",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-03",
    "hora": "16:00",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-2944",
    "pacienteId": "e9e13797-856b-4fa0-a54b-6d589caa8b32",
    "pacienteNombre": "Tony Montana",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-03",
    "hora": "10:30",
    "medico": "Dr. Rodríguez",
    "estado": "confirmada",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-1839",
    "pacienteId": "ce1cb9b6-8262-45ae-8e89-31f0116c6f76",
    "pacienteNombre": "Julieta Prandi",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-03",
    "hora": "09:30",
    "medico": "Dr. Rodríguez",
    "estado": "confirmada",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-2580",
    "pacienteId": "d3037f1a-f23d-4687-b823-2e17213016d3",
    "pacienteNombre": "Carla",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-03",
    "hora": "11:00",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-3611",
    "pacienteId": "fd5c89a4-e18a-4b52-aa7d-392a03cf5e94",
    "pacienteNombre": "Rodrigo De Paul",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-04",
    "hora": "17:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-1236",
    "pacienteId": "3af7def6-b6d6-493f-8e4e-278deb5f170f",
    "pacienteNombre": "Lali Esposito",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-04",
    "hora": "09:30",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-2142",
    "pacienteId": "b4b4f398-7b77-4adb-8649-80b5597e0fdf",
    "pacienteNombre": "Antonela Roccuzzo",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-04",
    "hora": "10:30",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-5345",
    "pacienteId": "16c05c1c-fd4c-490e-af92-0c578e714970",
    "pacienteNombre": "Martín Palermo",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-04",
    "hora": "11:30",
    "medico": "Dra. Torres",
    "estado": "confirmada",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-5548",
    "pacienteId": "05bac5fa-97ff-4ab7-b0c4-a494788edb7a",
    "pacienteNombre": "Miguel López Fernández",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-04",
    "hora": "10:00",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-8319",
    "pacienteId": "83bfd89e-3f9b-4bcb-b0b3-d92f67807374",
    "pacienteNombre": "Joaquín Sorolla",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-04",
    "hora": "17:00",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-8382",
    "pacienteId": "5c939649-7ef6-44dc-aa68-9417da2fd17f",
    "pacienteNombre": "Mariana Fabbiani",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-04",
    "hora": "16:00",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-6369",
    "pacienteId": "ce1cb9b6-8262-45ae-8e89-31f0116c6f76",
    "pacienteNombre": "Julieta Prandi",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-05",
    "hora": "10:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-3041",
    "pacienteId": "d3037f1a-f23d-4687-b823-2e17213016d3",
    "pacienteNombre": "Carla",
    "tratamiento": "Odontopediatría",
    "fecha": "2026-11-05",
    "hora": "11:30",
    "medico": "Dra. Torres",
    "estado": "pendiente",
    "notas": "Cita de Odontopediatría"
  },
  {
    "id": "NEC-7305",
    "pacienteId": "fd5c89a4-e18a-4b52-aa7d-392a03cf5e94",
    "pacienteNombre": "Rodrigo De Paul",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-05",
    "hora": "10:00",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-3883",
    "pacienteId": "3af7def6-b6d6-493f-8e4e-278deb5f170f",
    "pacienteNombre": "Lali Esposito",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-05",
    "hora": "17:00",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-5526",
    "pacienteId": "2591d4f7-3a41-43d4-9783-4d2c074e73af",
    "pacienteNombre": "Lucas Castromán",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-05",
    "hora": "09:30",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-6444",
    "pacienteId": "24da22b7-91c0-41f2-bfca-48a36f9df698",
    "pacienteNombre": "Carlos Mendoza",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-05",
    "hora": "16:00",
    "medico": "Dr. Rodríguez",
    "estado": "confirmada",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-5951",
    "pacienteId": "28f2dc07-f3f0-40c4-bbfb-35f2c9a71614",
    "pacienteNombre": "Pablo Zilber",
    "tratamiento": "Ortodoncia – Revisión",
    "fecha": "2026-11-05",
    "hora": "17:30",
    "medico": "Dr. Rodríguez",
    "estado": "pendiente",
    "notas": "Cita de Ortodoncia – Revisión"
  },
  {
    "id": "NEC-6380",
    "pacienteId": "ca9ec61a-5691-4ab4-ae1d-6694bf5d1a90",
    "pacienteNombre": "Valentina Rossi",
    "tratamiento": "Endodoncia",
    "fecha": "2026-11-06",
    "hora": "17:30",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Cita de Endodoncia"
  },
  {
    "id": "NEC-6021",
    "pacienteId": "b8bd5cc6-416a-46b5-8e23-41011c111dc5",
    "pacienteNombre": "Lucía Navarro",
    "tratamiento": "Endodoncia",
    "fecha": "2026-11-06",
    "hora": "16:30",
    "medico": "Dr. Fernández",
    "estado": "confirmada",
    "notas": "Cita de Endodoncia"
  },
  {
    "id": "NEC-8024",
    "pacienteId": "93afb674-3041-4bd0-befd-eab7af6700d7",
    "pacienteNombre": "Romina Gaetani",
    "tratamiento": "Endodoncia",
    "fecha": "2026-11-06",
    "hora": "10:30",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Cita de Endodoncia"
  },
  {
    "id": "NEC-7578",
    "pacienteId": "988a0bff-82ae-4eb4-b93c-174ee09c73f2",
    "pacienteNombre": "Florencia Peña",
    "tratamiento": "Endodoncia",
    "fecha": "2026-11-06",
    "hora": "10:00",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Cita de Endodoncia"
  },
  {
    "id": "NEC-8211",
    "pacienteId": "ab6bae81-9c6a-4e9a-b8c9-8959d2912538",
    "pacienteNombre": "Gonzalo Higuaín",
    "tratamiento": "Endodoncia",
    "fecha": "2026-11-06",
    "hora": "16:00",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Cita de Endodoncia"
  },
  {
    "id": "NEC-9225",
    "pacienteId": "479837f4-cfc6-4dae-bf73-198dc13c82fd",
    "pacienteNombre": "Camila O'Gorman",
    "tratamiento": "Endodoncia",
    "fecha": "2026-11-06",
    "hora": "09:30",
    "medico": "Dr. Fernández",
    "estado": "confirmada",
    "notas": "Cita de Endodoncia"
  },
  {
    "id": "NEC-8819",
    "pacienteId": "6df727d2-c6e0-46c1-9ee3-8b13bdc65562",
    "pacienteNombre": "Diego Maradona",
    "tratamiento": "Endodoncia",
    "fecha": "2026-11-06",
    "hora": "17:00",
    "medico": "Dr. Fernández",
    "estado": "pendiente",
    "notas": "Cita de Endodoncia"
  }
];

// ── Storage ────────────────────────────────────────────────────────────────

function initData() {
  if (!localStorage.getItem("neclatrony_seed_v25_full")) {
    localStorage.setItem("neclatrony_pacientes", JSON.stringify(INITIAL_PACIENTES));
    localStorage.setItem("neclatrony_citas", JSON.stringify(INITIAL_CITAS));
    localStorage.setItem("neclatrony_medicos", JSON.stringify(INITIAL_MEDICOS));
    localStorage.setItem("neclatrony_seed_v25_full", "1");
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

function savePacientes(data) {
  localStorage.setItem("neclatrony_pacientes", JSON.stringify(data));
}

function getCitas() {
  return JSON.parse(localStorage.getItem("neclatrony_citas") || "[]");
}

function saveCitas(data) {
  localStorage.setItem("neclatrony_citas", JSON.stringify(data));
}

function getHistoriales() {
  return JSON.parse(localStorage.getItem("neclatrony_historiales") || "[]");
}

function saveHistoriales(data) {
  localStorage.setItem("neclatrony_historiales", JSON.stringify(data));
}

function generateId(prefix) {
  return prefix + Date.now().toString(36).toUpperCase();
}

function getCitasHoy() {
  const hoyStr = new Date().toISOString().split("T")[0];
  return getCitas().filter(c => c.fecha === hoyStr && (c.estado || "").toLowerCase().trim() !== "cancelada");
}

function getSlotsBloqueados(fecha, medico) {
  return getCitas()
    .filter(c => c.fecha === fecha && (!medico || c.medico === medico) && (c.estado || "").toLowerCase().trim() !== "cancelada")
    .map(c => c.hora);
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

function getSlotsDisponibles(fecha) {
  const bloqueados = getSlotsBloqueados(fecha);
  return HORARIOS.filter(h => !bloqueados.includes(h));
}
