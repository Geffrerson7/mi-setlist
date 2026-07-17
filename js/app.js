import { buscarCanciones } from "./api.js";
import {
  getEstado,
  suscribirse,
  actualizarEstado,
  abrirModalNuevaPlaylist,
  cerrarModal,
  crearPlaylist,
  cambiarVista,
} from "./state.js";
import {
  render,
  inicializarInputBusqueda,
  inicializarFormularioBusqueda,
  inicializarModalNuevaPlaylist,
  inicializarTabs,
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
  render(getEstado());
}

iniciar();
