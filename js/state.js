let estado = {
  busqueda: {
    status: "idle", // idle | loading | success | error | empty
    resultados: [],
    mensajeError: null,
  },
  playlists: [],
};

const listeners = [];

export function getEstado() {
  return estado;
}

export function suscribirse(listener) {
  listeners.push(listener);
}

export function actualizarEstado(cambios) {
  estado = { ...estado, ...cambios };
  listeners.forEach((listener) => listener(estado));
}
