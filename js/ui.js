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
const toast = document.getElementById("toast");
const overlayAgregar = document.getElementById("overlay-agregar");
const agregarSubtitulo = document.getElementById("agregar-subtitulo");
const listaOpcionesPlaylist = document.getElementById(
  "lista-opciones-playlist",
);
const btnCerrarAgregar = document.getElementById("btn-cerrar-agregar");
const inputFiltroPlaylist = document.getElementById("input-filtro-playlist");
const vistaListaPlaylists = document.getElementById("vista-lista-playlists");
const vistaDetallePlaylist = document.getElementById("vista-detalle-playlist");
const btnVolverPlaylists = document.getElementById("btn-volver-playlists");
const detallePlaylistNombre = document.getElementById(
  "detalle-playlist-nombre",
);
const listaCancionesPlaylist = document.getElementById(
  "lista-canciones-playlist",
);

export function render(estado) {
  renderBotonBuscar();
  renderMensajeBusqueda(estado.busqueda);
  renderResultados(estado.busqueda.resultados);
  renderPlaylists(estado.playlists);
  renderVistaPlaylists(estado.playlists, estado.playlistSeleccionadaId); // ← nueva línea
  renderModal(estado.modal);
  renderModalAgregar(
    estado.modalAgregar,
    estado.busqueda.resultados,
    estado.playlists,
  );
  renderTabs(estado.vistaActiva);
  renderEqMasthead(estado.busqueda.status);
  renderToast(estado.toast);
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
        <button type="button" class="btn-agregar" data-cancion-id="${cancion.id}">
          + Agregar a
        </button>
      </li>
    `,
    )
    .join("");
}

function renderToast({ mensaje }) {
  toast.textContent = mensaje ?? "";
  toast.classList.toggle("oculto", !mensaje);
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
        <div>
          <strong>${playlist.nombre}</strong>
          <span> — ${playlist.canciones.length} canciones</span>
        </div>
        <button type="button" class="btn-ver-playlist" data-playlist-id="${playlist.id}">Ver</button>
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
  cerrarAlClickAfuera(overlayModal, onCancelar);

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

function renderModalAgregar(
  { abierto, cancionId, filtro },
  resultados,
  playlists,
) {
  overlayAgregar.classList.toggle("oculto", !abierto);
  if (!abierto) return;

  const cancion = resultados.find((c) => c.id === cancionId);
  agregarSubtitulo.textContent = cancion
    ? `"${cancion.titulo}" — ${cancion.artista}`
    : "";

  if (playlists.length === 0) {
    inputFiltroPlaylist.hidden = true;
    listaOpcionesPlaylist.innerHTML = `
      <p class="agregar-vacio">Todavía no tenés playlists.</p>
      <button type="button" class="btn-crear-desde-agregar">+ Crear una</button>
    `;
    return;
  }

  inputFiltroPlaylist.hidden = false;
  if (inputFiltroPlaylist.value !== filtro) {
    inputFiltroPlaylist.value = filtro;
  }

  const playlistsFiltradas = playlists
    .filter((p) => p.nombre.toLowerCase().includes(filtro.trim().toLowerCase()))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  if (playlistsFiltradas.length === 0) {
    listaOpcionesPlaylist.innerHTML =
      '<p class="opciones-vacio">No encontramos playlists con ese nombre.</p>';
    return;
  }

  listaOpcionesPlaylist.innerHTML = playlistsFiltradas
    .map(
      (playlist) => `
      <button type="button" class="opcion-playlist" data-playlist-id="${playlist.id}">
        ${playlist.nombre} <span>— ${playlist.canciones.length} canciones</span>
      </button>
    `,
    )
    .join("");
}

export function inicializarModalAgregar({
  onAbrir,
  onCerrar,
  onAgregarCancion,
  onCrearDesdeAgregar,
  onFiltrar,
}) {
  listaResultados.addEventListener("click", (evento) => {
    const btn = evento.target.closest(".btn-agregar");
    if (btn) onAbrir(btn.dataset.cancionId);
  });

  btnCerrarAgregar.addEventListener("click", onCerrar);
  cerrarAlClickAfuera(overlayAgregar, onCerrar);

  inputFiltroPlaylist.addEventListener("input", () => {
    onFiltrar(inputFiltroPlaylist.value);
  });

  listaOpcionesPlaylist.addEventListener("click", (evento) => {
    const btnCrear = evento.target.closest(".btn-crear-desde-agregar");
    if (btnCrear) {
      onCrearDesdeAgregar();
      return;
    }

    const btnOpcion = evento.target.closest(".opcion-playlist");
    if (btnOpcion) onAgregarCancion(btnOpcion.dataset.playlistId);
  });
}

function cerrarAlClickAfuera(overlay, onCerrar) {
  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) {
      onCerrar();
    }
  });
}

function formatearFecha(fecha) {
  const d = new Date(fecha);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const anio = d.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function renderVistaPlaylists(playlists, playlistSeleccionadaId) {
  const playlistSeleccionada = playlists.find(
    (p) => p.id === playlistSeleccionadaId,
  );

  vistaListaPlaylists.hidden = Boolean(playlistSeleccionada);
  vistaDetallePlaylist.hidden = !playlistSeleccionada;

  if (!playlistSeleccionada) return;

  detallePlaylistNombre.textContent = playlistSeleccionada.nombre;

  if (playlistSeleccionada.canciones.length === 0) {
    listaCancionesPlaylist.innerHTML =
      '<li class="playlists-vacio">Esta playlist todavía no tiene canciones 🎧</li>';
    return;
  }

  listaCancionesPlaylist.innerHTML = playlistSeleccionada.canciones
    .map(
      ({ cancion, fechaAgregado }) => `
      <li class="resultado-item">
        <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" />
        <div>
          <strong>${cancion.titulo}</strong> — ${cancion.duracionFormateada}
          <br />
          <small>${cancion.artista} · Agregada el ${formatearFecha(fechaAgregado)}</small>
        </div>
      </li>
    `,
    )
    .join("");
}

export function inicializarVistaDetallePlaylist({ onSeleccionar, onVolver }) {
  listaPlaylists.addEventListener("click", (evento) => {
    const btn = evento.target.closest(".btn-ver-playlist");
    if (btn) onSeleccionar(btn.dataset.playlistId);
  });

  btnVolverPlaylists.addEventListener("click", onVolver);
}
