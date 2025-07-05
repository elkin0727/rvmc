// downloadUtils.js - Utilidades para descarga de imágenes

// Función para descargar una asignación como imagen
window.descargarComoImagen = function(elemento) {
  const formulario = elemento.closest('.formulario');
  const formContainer = formulario.querySelector('.form-container');
  const nombreInput = formulario.querySelector('#nombre');
  const intervencionInput = formulario.querySelector('#intervencion');
  const fechaInput = formulario.querySelector('#fecha');
  const inputs = formContainer.querySelectorAll('input[type="text"]');
  
  const nombreEstudiante = nombreInput ? nombreInput.value.trim() : 'estudiante';
  const intervencionNum = intervencionInput ? intervencionInput.value.trim() : '';
  
  // Obtener la sala seleccionada
  let sala = "SinSala";
  if (formulario.querySelector('#sala_principal:checked')) sala = "SalaPrincipal";
  else if (formulario.querySelector('#sala_aux1:checked')) sala = "SalaAuxiliar1";
  else if (formulario.querySelector('#sala_aux2:checked')) sala = "SalaAuxiliar2";
  
  // Sacar el tipo de asignación usando la utilidad centralizada
  const tipoAsignacion = obtenerTipoAsignacion(intervencionNum);
  
  // Obtener la fecha actual en formato YYYY-MM-DD
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
  const dia = hoy.getDate().toString().padStart(2, '0');
  const fechaFormateada = `${año}-${mes}-${dia}`;
  
  // Crear un nombre descriptivo para el archivo en formato YYYY-MM-DD-NombreAsignado-NumIntervencion##-TipoAsignacion-Sala
  const nombreArchivo = nombreEstudiante.replace(/\s+/g, '');
  const numIntervencion = intervencionNum ? intervencionNum.padStart(2, '0') : '00';
  
  let fileName = `${fechaFormateada}-${nombreArchivo}-NumIntervencion${numIntervencion}-${tipoAsignacion}-${sala}.png`;
  
  // Mostrar indicador de carga
  const loadingIndicator = document.createElement('span');
  loadingIndicator.textContent = ' ⏳ Generando...';
  loadingIndicator.style.color = '#777';
  loadingIndicator.style.fontSize = '12px';
  elemento.parentNode.appendChild(loadingIndicator);
  
  // Guardar los estilos originales
  const originalStyles = [];
  inputs.forEach(input => {
    originalStyles.push({
      elem: input,
      backgroundImage: input.style.backgroundImage,
      borderBottom: input.style.borderBottom
    });
    
    // Aplicar estilo visible para la captura (igual que en la impresión)
    input.style.backgroundImage = 'none';
    input.style.borderBottom = '1px dashed #000';
  });
  
  // Usar html2canvas para convertir el formulario a imagen
  html2canvas(formContainer, {
    scale: 2, // Mayor resolución
    backgroundColor: "#fff",
    logging: false,
    useCORS: true
  }).then(canvas => {
    // Restaurar estilos originales
    originalStyles.forEach(style => {
      style.elem.style.backgroundImage = style.backgroundImage;
      style.elem.style.borderBottom = style.borderBottom;
    });
    
    // Convertir el canvas a una URL de datos
    const imgData = canvas.toDataURL('image/png');
    
    // Crear un enlace para descargar y hacer clic en él
    const link = document.createElement('a');
    link.download = fileName;
    link.href = imgData;
    link.click();
    
    // Eliminar el indicador de carga
    elemento.parentNode.removeChild(loadingIndicator);
  }).catch(err => {
    // Restaurar estilos originales en caso de error
    originalStyles.forEach(style => {
      style.elem.style.backgroundImage = style.backgroundImage;
      style.elem.style.borderBottom = style.borderBottom;
    });
    
    console.error("Error al generar la imagen:", err);
    alert("Hubo un problema al generar la imagen. Por favor, inténtalo de nuevo.");
    // Eliminar el indicador de carga en caso de error
    elemento.parentNode.removeChild(loadingIndicator);
  });
};

// Función auxiliar para descargar un formulario individual (usada en descarga masiva)
async function descargarFormularioIndividual(formulario) {
  return new Promise((resolve, reject) => {
    const formContainer = formulario.querySelector('.form-container');
    const nombreInput = formulario.querySelector('#nombre');
    const intervencionInput = formulario.querySelector('#intervencion');
    const inputs = formContainer.querySelectorAll('input[type="text"]');
    
    const nombreEstudiante = nombreInput ? nombreInput.value.trim() : 'estudiante';
    const intervencionNum = intervencionInput ? intervencionInput.value.trim() : '';
    
    // Obtener la sala seleccionada
    let sala = "SinSala";
    if (formulario.querySelector('#sala_principal:checked')) sala = "SalaPrincipal";
    else if (formulario.querySelector('#sala_aux1:checked')) sala = "SalaAuxiliar1";
    else if (formulario.querySelector('#sala_aux2:checked')) sala = "SalaAuxiliar2";
    
    // Sacar el tipo de asignación usando la utilidad centralizada
    const tipoAsignacion = obtenerTipoAsignacion(intervencionNum);
    
    // Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    
    // Crear un nombre descriptivo para el archivo
    const nombreArchivo = nombreEstudiante.replace(/\s+/g, '');
    const numIntervencion = intervencionNum ? intervencionNum.padStart(2, '0') : '00';
    const fileName = `${fechaFormateada}-${nombreArchivo}-NumIntervencion${numIntervencion}-${tipoAsignacion}-${sala}.png`;
    
    // Guardar los estilos originales
    const originalStyles = [];
    inputs.forEach(input => {
      originalStyles.push({
        elem: input,
        backgroundImage: input.style.backgroundImage,
        borderBottom: input.style.borderBottom
      });
      
      // Aplicar estilo visible para la captura
      input.style.backgroundImage = 'none';
      input.style.borderBottom = '1px dashed #000';
    });
    
    // Usar html2canvas para convertir el formulario a imagen
    html2canvas(formContainer, {
      scale: 2,
      backgroundColor: "#fff",
      logging: false,
      useCORS: true
    }).then(canvas => {
      // Restaurar estilos originales
      originalStyles.forEach(style => {
        style.elem.style.backgroundImage = style.backgroundImage;
        style.elem.style.borderBottom = style.borderBottom;
      });
      
      // Convertir el canvas a una URL de datos
      const imgData = canvas.toDataURL('image/png');
      
      // Crear un enlace para descargar y hacer clic en él
      const link = document.createElement('a');
      link.download = fileName;
      link.href = imgData;
      link.click();
      
      resolve();
    }).catch(err => {
      // Restaurar estilos originales en caso de error
      originalStyles.forEach(style => {
        style.elem.style.backgroundImage = style.backgroundImage;
        style.elem.style.borderBottom = style.borderBottom;
      });
      
      reject(err);
    });
  });
}
