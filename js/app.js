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
} from "./state.js";
import {
  render,
  inicializarInputBusqueda,
  inicializarFormularioBusqueda,
  inicializarModalNuevaPlaylist,
  inicializarTabs,
  inicializarModalAgregar,
} from "./ui.js";

let idBusquedaActual = 0;

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

function iniciar() {
  suscribirse(render);
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
}

iniciar();
