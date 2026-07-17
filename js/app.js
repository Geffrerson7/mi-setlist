import { buscarCanciones } from './api.js';
import { getEstado, suscribirse, actualizarEstado } from './state.js';
import { render, inicializarInputBusqueda, inicializarFormularioBusqueda } from './ui.js';

async function manejarBusqueda(termino) {
  actualizarEstado({
    busqueda: { status: 'loading', resultados: [], mensajeError: null },
  });

  try {
    const resultados = await buscarCanciones(termino);
    actualizarEstado({
      busqueda: {
        status: resultados.length === 0 ? 'empty' : 'success',
        resultados,
        mensajeError: null,
      },
    });
  } catch (error) {
    actualizarEstado({
      busqueda: {
        status: 'error',
        resultados: [],
        mensajeError: 'No pudimos conectar con la API de iTunes. Probá de nuevo.',
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