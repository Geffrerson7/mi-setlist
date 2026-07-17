const inputBusqueda = document.getElementById('input-busqueda');
const btnBuscar = document.getElementById('btn-buscar');
const mensajeBusqueda = document.getElementById('mensaje-busqueda');
const listaResultados = document.getElementById('lista-resultados');

export function render(estado) {
  renderBotonBuscar();
  renderMensajeBusqueda(estado.busqueda);
  renderResultados(estado.busqueda.resultados);
}

function renderBotonBuscar() {
  // Bloqueamos el envío si el campo está vacío (decisión ya tomada).
  btnBuscar.disabled = inputBusqueda.value.trim().length === 0;
}

function renderMensajeBusqueda({ status, mensajeError }) {
  const mensajes = {
    idle: '',
    loading: '⏳ Buscando...',
    error: `⚠ ${mensajeError}`,
    empty: '🔍 No se encontraron resultados',
    success: '',
  };
  mensajeBusqueda.textContent = mensajes[status] ?? '';
}

function renderResultados(resultados) {
  if (resultados.length === 0) {
    listaResultados.innerHTML = '';
    return;
  }

  listaResultados.innerHTML = resultados
    .map((cancion) => `
      <li class="resultado-item" data-id="${cancion.id}">
        <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" />
        <div>
          <strong>${cancion.titulo}</strong> — ${cancion.duracionFormateada}
          <br />
          <small>${cancion.artista}</small>
        </div>
      </li>
    `)
    .join('');
}

// Habilita/deshabilita el botón mientras el usuario escribe.
export function inicializarInputBusqueda() {
  inputBusqueda.addEventListener('input', renderBotonBuscar);
  renderBotonBuscar();
}

// Delegación de eventos para el submit del formulario.
export function inicializarFormularioBusqueda(onBuscar) {
  const form = document.getElementById('form-busqueda');
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const termino = inputBusqueda.value.trim();
    if (termino.length === 0) return;
    onBuscar(termino);
  });
}