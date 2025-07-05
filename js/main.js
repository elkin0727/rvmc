// main.js - Funcionalidad principal del generador de asignaciones

// Función para descargar todas las asignaciones como imágenes
async function descargarTodasLasAsignaciones() {
  const formularios = document.querySelectorAll('.formulario');
  if (formularios.length === 0) {
    alert('No hay asignaciones para descargar.');
    return;
  }
  
  const progressElement = document.getElementById('download-progress');
  progressElement.style.display = 'block';
  progressElement.textContent = 'Preparando para descargar...';
  
  // Esperar un momento para que se muestre el mensaje
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let contador = 0;
  
  try {
    // Procesar cada asignación secuencialmente
    for (let i = 0; i < formularios.length; i++) {
      const formulario = formularios[i];
      
      progressElement.textContent = `Descargando asignación ${i+1} de ${formularios.length}...`;
      
      try {
        // Llamar directamente a la función de descarga individual
        await descargarFormularioIndividual(formulario);
        contador++;
      } catch (err) {
        console.error(`Error descargando asignación ${i+1}:`, err);
        // Continuar con la siguiente asignación
      }
      
      // Pausa entre descargas para evitar problemas
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
  } catch (error) {
    console.error("Error general en la descarga:", error);
  }
  
  progressElement.textContent = `Se han descargado ${contador} de ${formularios.length} asignaciones correctamente.`;
  setTimeout(() => {
    progressElement.style.display = 'none';
  }, 5000);
}

// Inicialización principal cuando se carga el DOM
window.addEventListener("DOMContentLoaded", () => {
  // Asignar el evento click al botón de descargar todas
  document.getElementById('download-all-link').addEventListener('click', descargarTodasLasAsignaciones);
  
  // Cargar y procesar datos usando la utilidad centralizada
  const data = obtenerDatosDeURL();
  if (!data) {
    console.error("No se pudieron cargar los datos");
    return;
  }

  // Generar formularios
  generarFormularios(data);
});
