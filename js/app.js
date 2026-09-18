import { buscarCanciones } from "./api.js";
import {
  getEstado,
  suscribirse,
  actualizarEstado,
  abrirModalNuevaPlaylist,
  cerrarModal,
  crearPlaylist,
  cambiarVista,
  abrirModalAgregar,
  cerrarModalAgregar,
  agregarCancionAPlaylist,
  abrirModalNuevaPlaylistDesdeAgregar,
  filtrarPlaylistsEnModal,
  seleccionarPlaylist,
  volverAListaPlaylists,
  abrirModalQuitarCancion,
  cerrarModalQuitarCancion,
  confirmarQuitarCancion,
  abrirModalEliminarPlaylist,
  cerrarModalEliminarPlaylist,
  confirmarEliminarPlaylist,
  cambiarOrdenPlaylist,
  cerrarModalDatosCorruptos,
  suscribirsePreview,
  reproducirPreview,
  pausarPreview,
  detenerPreview,
  limpiarBusqueda,
  cerrarModalRecuperacionParcial,
} from "./state.js";
import {
  render,
  inicializarInputBusqueda,
  inicializarFormularioBusqueda,
  inicializarModalNuevaPlaylist,
  inicializarTabs,
  inicializarModalAgregar,
  inicializarVistaDetallePlaylist,
  inicializarModalesConfirmacion,
  inicializarModalDatosCorruptos,
  renderPlayer,
  inicializarPreview,
  inicializarLimpiarBusqueda,
  inicializarModalRecuperacionParcial,
} from "./ui.js";
import {
  guardarPlaylists,
  guardarBusqueda,
  borrarBusqueda,
} from "./storage.js";

let idBusquedaActual = 0;
let ultimasPlaylistsGuardadas = null;
let ultimosResultadosGuardados = null;

async function manejarBusqueda(termino) {
  const idDeEstaBusqueda = ++idBusquedaActual;
  detenerPreview();

  actualizarEstado({
    terminoBusqueda: termino,
    busqueda: { status: "loading", resultados: [], mensajeError: null },
  });

  try {
    const resultados = await buscarCanciones(termino);
    if (idDeEstaBusqueda !== idBusquedaActual) return;

    actualizarEstado({
      busqueda: {
        status: resultados.length === 0 ? "empty" : "success",
        resultados,
        mensajeError: null,
      },
    });
  } catch (error) {
    if (idDeEstaBusqueda !== idBusquedaActual) return;

    actualizarEstado({
      busqueda: {
        status: "error",
        resultados: [],
        mensajeError: error.message,
      },
    });
  }
}

function persistirPlaylists(estadoActual) {
  if (estadoActual.playlists === ultimasPlaylistsGuardadas) return;
  ultimasPlaylistsGuardadas = estadoActual.playlists;

  const exito = guardarPlaylists(estadoActual.playlists);
  if (!exito) {
    mostrarToast(
      "⚠ No se pudo guardar tu playlist (almacenamiento lleno o deshabilitado)",
    );
  }
}

function manejarTogglePreview(cancionId, opciones = {}) {
  if (opciones.forzarDetener) {
    detenerPreview();
    return;
  }

  const { previewActivo } = getEstado();
  const idNumerico = Number(cancionId);
  const esLaMismaQueSuena = previewActivo.cancionId === idNumerico;

  if (esLaMismaQueSuena && previewActivo.reproduciendo) {
    pausarPreview();
  } else {
    reproducirPreview(idNumerico);
  }
}

function persistirBusqueda(estadoActual) {
  const { resultados, status } = estadoActual.busqueda;

  // Comparación por referencia: solo un cambio real produce un array
  // nuevo (ver manejarBusqueda / limpiarBusqueda), así que evita
  // escribir en localStorage en cada render que no tocó los resultados.
  if (resultados === ultimosResultadosGuardados) return;
  ultimosResultadosGuardados = resultados;

  // El usuario limpió la búsqueda explícitamente (HU-13): borramos lo
  // persistido para no resucitarla sola al recargar.
  if (status === "idle") {
    borrarBusqueda();
    return;
  }

  // "loading" y "error" son transitorios de la sesión actual; no tiene
  // sentido que sobrevivan a un F5.
  if (status !== "success" && status !== "empty") return;

  guardarBusqueda({ termino: estadoActual.terminoBusqueda, resultados });
}

function iniciar() {
  suscribirse(render);
  suscribirse(persistirPlaylists);
  suscribirse(persistirBusqueda);
  suscribirsePreview(renderPlayer);

  inicializarInputBusqueda(getEstado().terminoBusqueda);
  inicializarFormularioBusqueda(manejarBusqueda);
  inicializarModalNuevaPlaylist({
    onAbrir: abrirModalNuevaPlaylist,
    onCancelar: cerrarModal,
    onCrear: crearPlaylist,
  });
  inicializarTabs(cambiarVista);
  inicializarModalAgregar({
    onAbrir: abrirModalAgregar,
    onCerrar: cerrarModalAgregar,
    onAgregarCancion: (playlistId) => {
      const { cancionId } = getEstado().modalAgregar;
      agregarCancionAPlaylist(cancionId, playlistId);
    },
    onCrearDesdeAgregar: abrirModalNuevaPlaylistDesdeAgregar,
    onFiltrar: filtrarPlaylistsEnModal,
  });
  inicializarPreview({ onTogglePreview: manejarTogglePreview });

  render(getEstado());
  inicializarVistaDetallePlaylist({
    onSeleccionar: seleccionarPlaylist,
    onVolver: volverAListaPlaylists,
    onAbrirQuitarCancion: (cancionId) => {
      const { playlistSeleccionadaId } = getEstado();
      abrirModalQuitarCancion(playlistSeleccionadaId, cancionId);
    },
    onAbrirEliminarPlaylist: () => {
      const { playlistSeleccionadaId } = getEstado();
      abrirModalEliminarPlaylist(playlistSeleccionadaId);
    },
    onCambiarOrden: (nuevoCriterio) => {
      const { playlistSeleccionadaId } = getEstado();
      cambiarOrdenPlaylist(playlistSeleccionadaId, nuevoCriterio);
    },
  });
  inicializarModalesConfirmacion({
    onCancelarQuitarCancion: cerrarModalQuitarCancion,
    onConfirmarQuitarCancion: confirmarQuitarCancion,
    onCancelarEliminarPlaylist: cerrarModalEliminarPlaylist,
    onConfirmarEliminarPlaylist: confirmarEliminarPlaylist,
  });
  inicializarModalDatosCorruptos(cerrarModalDatosCorruptos);
  inicializarLimpiarBusqueda(() => {
    idBusquedaActual++;
    limpiarBusqueda();
  });
  inicializarModalRecuperacionParcial(cerrarModalRecuperacionParcial);
}

iniciar();
