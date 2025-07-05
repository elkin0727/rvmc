// printUtils.js - Utilidades para impresión

// Función para imprimir una asignación individual
function imprimirAsignacion(elemento) {
  const formulario = elemento.closest('.formulario');
  
  // Obtener el contenido HTML del formulario específico
  const formularioHTML = formulario.querySelector('.form-container').outerHTML;
  const estilos = document.head.querySelector('style').outerHTML;
  
  // Crear el contenido HTML completo
  const contenidoCompleto = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Asignación</title>
  ${estilos}
  <style>
    @media print {
      .form-group input[type="text"] {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        border-bottom: 1px dashed #000 !important;
        background-image: none !important;
      }
    }
  </style>
</head>
<body>
  ${formularioHTML}
  <script>
    // Imprimir automáticamente cuando se carga la página
    window.onload = function() {
      window.print();
      // Cerrar la ventana después de imprimir
      setTimeout(function() {
        window.close();
      }, 1000);
    };
  </script>
</body>
</html>`;
  
  // Abrir una nueva ventana con el contenido
  const ventanaImpresion = window.open('', '_blank', 'width=800,height=600');
  
  if (ventanaImpresion) {
    ventanaImpresion.document.write(contenidoCompleto);
    ventanaImpresion.document.close();
  } else {
    alert('No se pudo abrir la ventana de impresión. Por favor, permite las ventanas emergentes y vuelve a intentar.');
  }
}
