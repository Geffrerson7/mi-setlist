const inputBusqueda = document.getElementById("input-busqueda");
const btnBuscar = document.getElementById("btn-buscar");
const mensajeBusqueda = document.getElementById("mensaje-busqueda");
const listaResultados = document.getElementById("lista-resultados");
const btnNuevaPlaylist = document.getElementById("btn-nueva-playlist");
const listaPlaylists = document.getElementById("lista-playlists");
const overlayModal = document.getElementById("overlay-modal");
const formNuevaPlaylist = document.getElementById("form-nueva-playlist");
const inputNombrePlaylist = document.getElementById("input-nombre-playlist");
const errorNuevaPlaylist = document.getElementById("error-nueva-playlist");
const btnCancelarPlaylist = document.getElementById("btn-cancelar-playlist");
const tabBusqueda = document.getElementById("tab-busqueda");
const tabPlaylists = document.getElementById("tab-playlists");
const seccionBusqueda = document.getElementById("seccion-busqueda");
const seccionPlaylists = document.getElementById("seccion-playlists");
const eqMasthead = document.getElementById("eq-masthead");

export function render(estado) {
  renderBotonBuscar();
  renderMensajeBusqueda(estado.busqueda);
  renderResultados(estado.busqueda.resultados);
  renderPlaylists(estado.playlists);
  renderModal(estado.modal);
  renderTabs(estado.vistaActiva);
  renderEqMasthead(estado.busqueda.status);
}

function renderBotonBuscar() {
  // Bloqueamos el envío si el campo está vacío (decisión ya tomada).
  btnBuscar.disabled = inputBusqueda.value.trim().length === 0;
}

function renderMensajeBusqueda({ status, mensajeError }) {
  if (status === "loading") {
    mensajeBusqueda.innerHTML =
      '<span class="spinner" aria-hidden="true"></span> Buscando...';
    return;
  }

  const mensajes = {
    idle: "",
    error: `⚠ ${mensajeError}`,
    empty: "🔍 No se encontraron resultados",
    success: "",
  };
  mensajeBusqueda.textContent = mensajes[status] ?? "";
}

function renderResultados(resultados) {
  if (resultados.length === 0) {
    listaResultados.innerHTML = "";
    return;
  }

  listaResultados.innerHTML = resultados
    .map(
      (cancion) => `
      <li class="resultado-item" data-id="${cancion.id}">
        ${renderEqMini(cancion.id)}
        <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" />
        <div>
          <strong>${cancion.titulo}</strong> — ${cancion.duracionFormateada}
          <br />
          <small>${cancion.artista}</small>
        </div>
      </li>
    `,
    )
    .join("");
}

// Habilita/deshabilita el botón mientras el usuario escribe.
export function inicializarInputBusqueda() {
  inputBusqueda.addEventListener("input", renderBotonBuscar);
  renderBotonBuscar();
}

// Delegación de eventos para el submit del formulario.
export function inicializarFormularioBusqueda(onBuscar) {
  const form = document.getElementById("form-busqueda");
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const termino = inputBusqueda.value.trim();
    if (termino.length === 0) return;
    onBuscar(termino);
  });
}

function renderPlaylists(playlists) {
  if (playlists.length === 0) {
    listaPlaylists.innerHTML =
      '<li class="playlists-vacio">Todavía no creaste ninguna playlist 🎶</li>';
    return;
  }

  listaPlaylists.innerHTML = playlists
    .map(
      (playlist) => `
      <li class="playlist-item" data-id="${playlist.id}">
        <strong>${playlist.nombre}</strong>
        <span> — ${playlist.canciones.length} canciones</span>
      </li>
    `,
    )
    .join("");
}

function renderModal({ tipo, error }) {
  overlayModal.classList.toggle("oculto", tipo !== "nueva-playlist");
  errorNuevaPlaylist.textContent = error ?? "";

  // Al abrir el modal, foco automático en el input.
  if (tipo === "nueva-playlist") {
    inputNombrePlaylist.focus();
  }
}

export function inicializarModalNuevaPlaylist({
  onAbrir,
  onCancelar,
  onCrear,
}) {
  btnNuevaPlaylist.addEventListener("click", () => {
    inputNombrePlaylist.value = "";
    onAbrir();
  });

  btnCancelarPlaylist.addEventListener("click", onCancelar);

  formNuevaPlaylist.addEventListener("submit", (evento) => {
    evento.preventDefault();
    onCrear(inputNombrePlaylist.value);
  });
}

function renderTabs(vistaActiva) {
  const esBusqueda = vistaActiva === "busqueda";

  tabBusqueda.setAttribute("aria-selected", String(esBusqueda));
  tabPlaylists.setAttribute("aria-selected", String(!esBusqueda));

  seccionBusqueda.hidden = !esBusqueda;
  seccionPlaylists.hidden = esBusqueda;
}

export function inicializarTabs(onCambiarVista) {
  tabBusqueda.addEventListener("click", () => onCambiarVista("busqueda"));
  tabPlaylists.addEventListener("click", () => onCambiarVista("playlists"));
}

// Genera 4 alturas (20–100%) a partir del id de la canción, siempre iguales para el mismo id.
function generarAlturasEq(id) {
  const texto = String(id);
  const alturas = [];
  for (let i = 0; i < 4; i++) {
    const codigo = texto.charCodeAt(i % texto.length) + i * 7;
    alturas.push(20 + (codigo % 81)); // rango 20–100
  }
  return alturas;
}

function renderEqMini(id) {
  const alturas = generarAlturasEq(id);
  return `
    <div class="eq-mini" aria-hidden="true">
      ${alturas.map((h) => `<span style="height:${h}%"></span>`).join("")}
    </div>
  `;
}

function renderEqMasthead(status) {
  eqMasthead.classList.toggle("eq-activo", status === "loading");
}
