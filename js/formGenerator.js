// formGenerator.js - Generación de formularios de asignaciones

// Función para generar todos los formularios basados en los datos
function generarFormularios(data) {
  const contenedor = document.getElementById("formularios");
  const semana = data[0];
  const fecha = obtenerFechaMiercoles(semana.fecha);

  // Generar formularios para lectura de la Biblia
  const lectura = semana.tesoros.find(t => t.titulo.includes("Lectura de la Biblia"));
  if (lectura) {
    lectura.asignadoSalaA?.forEach(nombre => crearFormulario(nombre, "", "3", "Sala Principal", fecha, contenedor));
    lectura.asignadoSalaB?.forEach(nombre => crearFormulario(nombre, "", "3", "Sala Auxiliar", fecha, contenedor));
  }

  // Generar formularios para sección de maestros
  semana.maestros.forEach((item, index) => {
    const intervencion = (4 + index).toString();
    if (item.asignadoSalaA?.length) {
      crearFormulario(item.asignadoSalaA[0], item.asignadoSalaA[1], intervencion, "Sala Principal", fecha, contenedor);
    }
    if (item.asignadoSalaB?.length) {
      crearFormulario(item.asignadoSalaB[0], item.asignadoSalaB[1], intervencion, "Sala Auxiliar", fecha, contenedor);
    }
  });
}

// Función para crear un formulario individual
function crearFormulario(nombre, ayudante, intervencion, sala, fecha, contenedor) {
  const div = document.createElement("div");
  div.className = "formulario";
  div.innerHTML = `
    <div class="print-link-container">
      <a class="print-link" onclick="imprimirAsignacion(this)">📄 Imprimir</a>
      <span class="separator">|</span>
      <a class="download-link" onclick="descargarComoImagen(this)">📥 Descargar</a>
    </div>
    <hr>
    <div class="form-container">
      <h1>ASIGNACIÓN PARA LA REUNIÓN VIDA Y MINISTERIO CRISTIANOS</h1>
      <form>
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value="${nombre}">
        </div>
        <div class="form-group">
          <label for="ayudante">Ayudante:</label>
          <input type="text" id="ayudante" name="ayudante" value="${ayudante || ""}">
        </div>
        <div class="form-group">
          <label for="fecha">Fecha:</label>
          <input type="text" id="fecha" name="fecha" value="${fecha}">
        </div>
        <div class="form-group intervencion-group">
          <label for="intervencion">Intervención núm.:</label>
          <input type="text" id="intervencion" name="intervencion" value="${intervencion}">
        </div>
        <fieldset>
          <legend>Se presentará en:</legend>
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input type="checkbox" id="sala_principal" name="sala" value="principal" ${sala === "Sala Principal" ? "checked" : ""}>
              <label for="sala_principal">Sala principal</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="sala_aux1" name="sala" value="aux1" ${sala === "Sala Auxiliar" ? "checked" : ""}>
              <label for="sala_aux1">Sala auxiliar núm. 1</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="sala_aux2" name="sala" value="aux2">
              <label for="sala_aux2">Sala auxiliar núm. 2</label>
            </div>
          </div>
        </fieldset>
        <div class="student-note">
          <p><strong>Nota al estudiante:</strong> En la <em>Guía de actividades</em> encontrará la información que necesita para su intervención. Repase también las indicaciones que se describen en las <em>Instrucciones para la reunión Vida y Ministerio Cristianos</em> (S-38).</p>
        </div>
        <div class="form-footer">
          <p>S-89-S 11/23</p>
          <p class="fecha-impresion">Ed. ${obtenerFechaFormateada()}</p>
        </div>
      </form>
    </div>
  `;
  contenedor.appendChild(div);
}
