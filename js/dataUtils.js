// dataUtils.js - Utilidades para manejo de datos y URL

// Variable global para cachear los datos parseados
let cachedData = null;

// Función para obtener y parsear los datos de la URL
function obtenerDatosDeURL() {
  if (cachedData) {
    return cachedData;
  }
  
  const params = new URLSearchParams(window.location.search);
  let rawData = params.get("data");
  
  if (!rawData) {
    // Datos de ejemplo por defecto
    rawData = '[{"horaInicio":"18:30","fecha":"14-20 DE JULIO","tema":"PROVERBIOS 22","tesoros":[{"hora":"18:30","titulo":"🎵 Canción 79","duracion":"5 mins.","asignado":[]},{"hora":"18:35","titulo":"Palabras de introducción","duracion":"1 min.","asignado":["Juan Pérez"]},{"hora":"18:36","titulo":"1. Sabios consejos para criar a los hijos","duracion":"10 mins.","asignado":["Laura Fernández"]},{"hora":"18:46","titulo":"2. Busquemos perlas escondidas","duracion":"10 mins.","asignado":["Miguel Rodríguez"]},{"hora":"18:56","titulo":"3. Lectura de la Biblia (4 mins)","duracion":"4 mins.","asignadoSalaA":["María López"],"asignadoSalaB":["Carlos García"]}],"maestros":[{"hora":"19:00","titulo":"4. Empiece conversaciones","duracion":"3 mins.","asignadoSalaA":["Ana Torres","Luis Martínez"],"asignadoSalaB":["Sofía Gómez","Pedro Sánchez"]},{"hora":"19:03","titulo":"5. Empiece conversaciones","duracion":"4 mins.","asignadoSalaA":["Carolina Gutierrez","Nanadorith Hernández"],"asignadoSalaB":["Yusleidy Rossibel Olivares Pineda","Yeimy Sierra"]},{"hora":"19:07","titulo":"6. Discurso: Me salté las reglas... ¿Y ahora qué?","duracion":"5 mins.","asignadoSalaA":["Leonardo Castillo"],"asignadoSalaB":["Martin García"]}],"vidaCristiana":[{"hora":"19:12","titulo":"🎵 Canción 134","duracion":"","asignado":[]},{"hora":"19:17","titulo":"7. Sean pacientes, pero no permisivos","duracion":"15 mins.","asignado":["José Antonio Romero"]}],"estudioBiblico":{"hora":"19:32","titulo":"8. Estudio bíblico de la congregación","duracion":"30 mins.","asignado":["Conductor: Andrés Ramírez","Lector: Paula Díaz"]},"presidente":"Hugo Posada","oracionInicial":"Camilo Pulido","palabrasConclusion":{"hora":"20:02"},"oracionFinal":{"hora":"20:02","titulo":"🎵 Canción 6","duracion":"","asignado":["Oración: Roberto Castillo"]},"consejero":"Jorge Espitia"}]';
  }

  try {
    cachedData = JSON.parse(decodeURIComponent(rawData));
    return cachedData;
  } catch (e) {
    console.error("Error al parsear el JSON:", e);
    return null;
  }
}

// Función para obtener el tipo de asignación basado en el número de intervención
function obtenerTipoAsignacion(intervencionNum) {
  const data = obtenerDatosDeURL();
  if (!data || data.length === 0) {
    return "Desconocido";
  }

  try {
    const numInt = parseInt(intervencionNum);
    const semana = data[0];
    
    if (numInt === 3) {
      // Lectura de Biblia
      const lectura = semana.tesoros.find(t => t.titulo.includes("Lectura de la Biblia"));
      if (lectura && lectura.titulo) {
        return lectura.titulo;
      }
    } else if (numInt >= 4 && numInt <= 6 && semana.maestros) {
      // Sección Maestros
      const indice = numInt - 4;
      if (semana.maestros[indice] && semana.maestros[indice].titulo) {
        return semana.maestros[indice].titulo;
      }
    }
  } catch (e) {
    console.error("Error al obtener el tipo de asignación:", e);
  }
  
  return "Desconocido";
}

// Función para limpiar la caché (útil si los datos cambian)
function limpiarCacheData() {
  cachedData = null;
}
