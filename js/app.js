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
} from "./state.js";
import {
  render,
  inicializarInputBusqueda,
  inicializarFormularioBusqueda,
  inicializarModalNuevaPlaylist,
  inicializarTabs,
  inicializarModalAgregar,
  inicializarVistaDetallePlaylist,
} from "./ui.js";
import { guardarPlaylists } from "./storage.js";

let idBusquedaActual = 0;
let ultimasPlaylistsGuardadas = null;

async function manejarBusqueda(termino) {
  const idDeEstaBusqueda = ++idBusquedaActual;

  actualizarEstado({
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

function iniciar() {
  suscribirse(render);
  suscribirse(persistirPlaylists);
  inicializarInputBusqueda();
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
  render(getEstado());
  inicializarVistaDetallePlaylist({
    onSeleccionar: seleccionarPlaylist,
    onVolver: volverAListaPlaylists,
  });
}

iniciar();
