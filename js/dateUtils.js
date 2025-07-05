// dateUtils.js - Utilidades para manejo de fechas

// Función para obtener la fecha del miércoles basada en el formato de entrada
function obtenerFechaMiercoles(fechaTexto) {
  let fechaLunes;
  
  // Check which format we have
  if (fechaTexto.includes("-")) {
    // Format: "4-10 DE AGOSTO"
    const partes = fechaTexto.split("-");
    const dia = parseInt(partes[0].trim());
    const mes = partes[1].split(" ").slice(1).join(" ").toLowerCase();
    fechaLunes = { dia, mes };
  } else if (fechaTexto.includes("a")) {
    // Format: "28 de julio a 3 de agosto"
    const partes = fechaTexto.split(" a ");
    const primeraFecha = partes[0].trim();
    const diaStr = primeraFecha.split(" de ")[0];
    const dia = parseInt(diaStr);
    const mes = primeraFecha.split(" de ")[1].toLowerCase();
    fechaLunes = { dia, mes };
  } else {
    return `Miércoles ${fechaTexto}`;
  }
  
  // Add 2 days to get Wednesday
  const diaMiercoles = fechaLunes.dia + 2;
  
  return `Miércoles ${diaMiercoles} ${fechaLunes.mes}`;
}

// Función para obtener fecha formateada para la impresión
function obtenerFechaFormateada() {
  const fecha = new Date();
  const diasSemana = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  const diaSemana = diasSemana[fecha.getDay()];
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const dia = fecha.getDate().toString().padStart(2, '0');
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  
  return `${diaSemana} ${año}-${mes}-${dia} ${horas}:${minutos}`;
}
