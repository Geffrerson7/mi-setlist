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
const btnEliminarPlaylist = document.getElementById("btn-eliminar-playlist");

const overlayConfirmarQuitarCancion = document.getElementById(
  "overlay-confirmar-quitar-cancion",
);
const textoConfirmarQuitarCancion = document.getElementById(
  "texto-confirmar-quitar-cancion",
);
const btnCancelarQuitarCancion = document.getElementById(
  "btn-cancelar-quitar-cancion",
);
const btnConfirmarQuitarCancion = document.getElementById(
  "btn-confirmar-quitar-cancion",
);
const overlayConfirmarEliminarPlaylist = document.getElementById(
  "overlay-confirmar-eliminar-playlist",
);
const textoConfirmarEliminarPlaylist = document.getElementById(
  "texto-confirmar-eliminar-playlist",
);
const btnCancelarEliminarPlaylist = document.getElementById(
  "btn-cancelar-eliminar-playlist",
);
const btnConfirmarEliminarPlaylist = document.getElementById(
  "btn-confirmar-eliminar-playlist",
);
const detallePlaylistDuracion = document.getElementById(
  "detalle-playlist-duracion",
);
const detallePlaylistEstadisticas = document.getElementById(
  "detalle-playlist-estadisticas",
);
const estadisticaCantidad = document.getElementById("estadistica-cantidad");
const estadisticaGenero = document.getElementById("estadistica-genero");
const estadisticaArtista = document.getElementById("estadistica-artista");
const selectOrdenCanciones = document.getElementById("select-orden-canciones");
const overlayDatosCorruptos = document.getElementById(
  "overlay-datos-corruptos",
);
const btnEmpezarDeCero = document.getElementById("btn-empezar-de-cero");
const reproductorPreview = document.getElementById("reproductor-preview");
const btnLimpiarBusqueda = document.getElementById("btn-limpiar-busqueda");
const overlayRecuperacionParcial = document.getElementById(
  "overlay-recuperacion-parcial",
);
const textoRecuperacionParcial = document.getElementById(
  "texto-recuperacion-parcial",
);
const btnEntendidoRecuperacionParcial = document.getElementById(
  "btn-entendido-recuperacion-parcial",
);

const ICONO_PLAY = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>`;

const ICONO_PAUSE = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>`;

export function render(estado) {
  renderBotonBuscar();
  renderMensajeBusqueda(estado.busqueda);
  renderResultados(estado.busqueda.resultados);
  renderPlaylists(estado.playlists);
  renderVistaPlaylists(estado.playlists, estado.playlistSeleccionadaId);
  renderModal(estado.modal);
  renderModalAgregar(
    estado.modalAgregar,
    estado.busqueda.resultados,
    estado.playlists,
  );
  renderModalQuitarCancion(estado.modalConfirmarQuitarCancion);
  renderModalEliminarPlaylist(estado.modalConfirmarEliminarPlaylist);
  renderModalDatosCorruptos(estado.modalDatosCorruptos);
  renderModalRecuperacionParcial(estado.modalRecuperacionParcial);
  renderTabs(estado.vistaActiva);
  renderEqMasthead(estado.busqueda.status);
  renderToast(estado.toast);
}

function renderBotonBuscar() {
  const hayTexto = inputBusqueda.value.trim().length > 0;
  btnBuscar.disabled = !hayTexto;
  btnLimpiarBusqueda.hidden = !hayTexto;
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
        <button
          type="button"
          class="btn-preview"
          data-cancion-id="${cancion.id}"
          data-preview-url="${cancion.previewUrl ?? ""}"
          ${cancion.previewUrl ? "" : "disabled"}
          aria-label="${cancion.previewUrl ? `Escuchar preview de ${cancion.titulo}` : "Sin preview disponible"}"
        >
          <span class="icono-play" aria-hidden="true">${ICONO_PLAY}</span>
        </button>
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

function renderModalRecuperacionParcial({ abierto, descartadas, conservadas }) {
  overlayRecuperacionParcial.classList.toggle("oculto", !abierto);
  if (!abierto) return;

  const textoDescartadas =
    descartadas === 1
      ? "1 playlist dañada"
      : `${descartadas} playlists dañadas`;
  const textoConservadas =
    conservadas === 1 ? "1 playlist" : `${conservadas} playlists`;

  textoRecuperacionParcial.textContent = `Detectamos ${textoDescartadas} en tus datos guardados y tuvimos que descartarla${descartadas === 1 ? "" : "s"}. Conservamos ${textoConservadas} en buen estado.`;
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
        <span>
          — ${playlist.canciones.length} canciones ·
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icono-duracion-mini"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" /><path d="M14.5 10.5l-2.5 2.5" /><path d="M17 8l1 -1" /><path d="M14 3h-4" /></svg>
          ${playlist.duracionTotalFormateada}
        </span>
      </div>
      <button type="button" class="btn-ver-playlist" data-playlist-id="${playlist.id}">Ver</button>
    </li>
  `,
    )
    .join("");
}

function renderModalQuitarCancion({ abierto, cancionTitulo }) {
  overlayConfirmarQuitarCancion.classList.toggle("oculto", !abierto);
  if (abierto) {
    textoConfirmarQuitarCancion.textContent = `¿Quitar "${cancionTitulo}" de esta playlist?`;
  }
}

function renderModalEliminarPlaylist({ abierto, playlistNombre }) {
  overlayConfirmarEliminarPlaylist.classList.toggle("oculto", !abierto);
  if (abierto) {
    textoConfirmarEliminarPlaylist.textContent = `¿Eliminar la playlist "${playlistNombre}" y todas sus canciones? Esta acción no se puede deshacer.`;
  }
}

function renderModalDatosCorruptos({ abierto }) {
  overlayDatosCorruptos.classList.toggle("oculto", !abierto);
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

export function inicializarPreview({ onTogglePreview }) {
  listaResultados.addEventListener("click", (evento) => {
    const btn = evento.target.closest(".btn-preview");
    if (btn && !btn.disabled) {
      onTogglePreview(btn.dataset.cancionId);
    }
  });

  // Cuando el audio termina solo (sin que el usuario lo pause),
  // avisamos para resetear el ícono a ▶.
  reproductorPreview.addEventListener("ended", () => {
    onTogglePreview(null, { forzarDetener: true });
  });
}

export function inicializarModalesConfirmacion({
  onCancelarQuitarCancion,
  onConfirmarQuitarCancion,
  onCancelarEliminarPlaylist,
  onConfirmarEliminarPlaylist,
}) {
  btnCancelarQuitarCancion.addEventListener("click", onCancelarQuitarCancion);
  cerrarAlClickAfuera(overlayConfirmarQuitarCancion, onCancelarQuitarCancion);
  btnConfirmarQuitarCancion.addEventListener("click", onConfirmarQuitarCancion);

  btnCancelarEliminarPlaylist.addEventListener(
    "click",
    onCancelarEliminarPlaylist,
  );
  cerrarAlClickAfuera(
    overlayConfirmarEliminarPlaylist,
    onCancelarEliminarPlaylist,
  );
  btnConfirmarEliminarPlaylist.addEventListener(
    "click",
    onConfirmarEliminarPlaylist,
  );
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
  detallePlaylistDuracion.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-stopwatch"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" /><path d="M14.5 10.5l-2.5 2.5" /><path d="M17 8l1 -1" /><path d="M14 3h-4" /></svg>
  ${playlistSeleccionada.duracionTotalFormateada}
`;

  if (selectOrdenCanciones.value !== playlistSeleccionada.ordenCriterio) {
    selectOrdenCanciones.value = playlistSeleccionada.ordenCriterio;
  }

  const tieneCanciones = playlistSeleccionada.canciones.length > 0;
  detallePlaylistEstadisticas.hidden = !tieneCanciones;

  if (tieneCanciones) {
    estadisticaCantidad.textContent = playlistSeleccionada.canciones.length;
    estadisticaGenero.textContent = playlistSeleccionada.generoMasFrecuente;
    estadisticaArtista.textContent = playlistSeleccionada.artistaMasFrecuente;
  }

  if (playlistSeleccionada.canciones.length === 0) {
    listaCancionesPlaylist.innerHTML =
      '<li class="playlists-vacio">Esta playlist todavía no tiene canciones 🎧</li>';
    return;
  }

  listaCancionesPlaylist.innerHTML = playlistSeleccionada.cancionesOrdenadas
    .map(
      ({ cancion, fechaAgregado }) => `
    <li class="resultado-item">
      <img src="${cancion.caratula}" alt="Carátula de ${cancion.titulo}" />
      <div>
        <strong>${cancion.titulo}</strong> — ${cancion.duracionFormateada}
        <br />
        <small>${cancion.artista} · Agregada el ${formatearFecha(fechaAgregado)}</small>
      </div>
      <button
        type="button"
        class="btn-quitar-cancion"
        data-cancion-id="${cancion.id}"
        aria-label="Quitar ${cancion.titulo} de la playlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
      </button>
    </li>
  `,
    )
    .join("");
}

export function renderPlayer(estado) {
  const { cancionId, reproduciendo } = estado.previewActivo;

  document.querySelectorAll(".btn-preview").forEach((btn) => {
    const esElBotonActivo = Number(btn.dataset.cancionId) === cancionId;
    const iconoSpan = btn.querySelector(".icono-play");
    const activo = esElBotonActivo && reproduciendo;

    btn.classList.toggle("btn-preview--activo", activo);
    iconoSpan.innerHTML = activo ? ICONO_PAUSE : ICONO_PLAY;
  });

  if (!cancionId) {
    reproductorPreview.pause();
    reproductorPreview.removeAttribute("src");
    return;
  }

  const btnActivo = document.querySelector(
    `.btn-preview[data-cancion-id="${cancionId}"]`,
  );

  if (!btnActivo) {
    reproductorPreview.pause();
    reproductorPreview.removeAttribute("src");
    return;
  }

  const previewUrl = btnActivo?.dataset.previewUrl;

  if (reproduciendo) {
    if (reproductorPreview.src !== previewUrl) {
      reproductorPreview.src = previewUrl;
    }
    reproductorPreview.play().catch(() => {
      // Ver nota sobre autoplay policy en el paso original.
    });
  } else {
    reproductorPreview.pause();
  }
}

export function inicializarVistaDetallePlaylist({
  onSeleccionar,
  onVolver,
  onAbrirQuitarCancion,
  onAbrirEliminarPlaylist,
  onCambiarOrden,
}) {
  listaPlaylists.addEventListener("click", (evento) => {
    const btn = evento.target.closest(".btn-ver-playlist");
    if (btn) onSeleccionar(btn.dataset.playlistId);
  });

  btnVolverPlaylists.addEventListener("click", onVolver);

  listaCancionesPlaylist.addEventListener("click", (evento) => {
    const btn = evento.target.closest(".btn-quitar-cancion");
    if (btn) onAbrirQuitarCancion(btn.dataset.cancionId);
  });

  btnEliminarPlaylist.addEventListener("click", onAbrirEliminarPlaylist);

  selectOrdenCanciones.addEventListener("change", () => {
    onCambiarOrden(selectOrdenCanciones.value);
  });
}

export function inicializarModalDatosCorruptos(onCerrar) {
  btnEmpezarDeCero.addEventListener("click", onCerrar);
}

export function inicializarLimpiarBusqueda(onLimpiar) {
  btnLimpiarBusqueda.addEventListener("click", () => {
    inputBusqueda.value = "";
    renderBotonBuscar(); // oculta el botón de limpiar y deshabilita "Buscar" de inmediato
    onLimpiar();
    inputBusqueda.focus();
  });
}

export function inicializarModalRecuperacionParcial(onCerrar) {
  btnEntendidoRecuperacionParcial.addEventListener("click", onCerrar);
}
