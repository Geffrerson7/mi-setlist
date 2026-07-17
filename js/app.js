import { buscarCanciones } from "./api.js";
import { getEstado, suscribirse, actualizarEstado } from "./state.js";
import {
  render,
  inicializarInputBusqueda,
  inicializarFormularioBusqueda,
} from "./ui.js";

let idBusquedaActual = 0;

async function manejarBusqueda(termino) {
  const idDeEstaBusqueda = ++idBusquedaActual;

  actualizarEstado({
    busqueda: { status: "loading", resultados: [], mensajeError: null },
  });

  try {
    const resultados = await buscarCanciones(termino);
    if (idDeEstaBusqueda !== idBusquedaActual) return; // llegó tarde, ya hay una búsqueda más nueva

    actualizarEstado({
      busqueda: {
        status: resultados.length === 0 ? "empty" : "success",
        resultados,
        mensajeError: null,
      },
    });
  } catch (error) {
    if (idDeEstaBusqueda !== idBusquedaActual) return; // llegó tarde, ya hay una búsqueda más nueva

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
  render(getEstado());
}

iniciar();
