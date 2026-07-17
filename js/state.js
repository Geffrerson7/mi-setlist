import { Playlist } from './models/Playlist.js';

let estado = {
  busqueda: {
    status: "idle",
    resultados: [],
    mensajeError: null,
  },
  playlists: [],
  modal: {
    tipo: null,
    error: null,
  },
  vistaActiva: "busqueda", // 'busqueda' | 'playlists'
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

export function abrirModalNuevaPlaylist() {
  actualizarEstado({ modal: { tipo: "nueva-playlist", error: null } });
}

export function cerrarModal() {
  actualizarEstado({ modal: { tipo: null, error: null } });
}

export function crearPlaylist(nombre) {
  const nombreLimpio = nombre.trim();

  if (nombreLimpio.length === 0) {
    actualizarEstado({
      modal: { tipo: "nueva-playlist", error: "El nombre es obligatorio" },
    });
    return;
  }

  const yaExiste = estado.playlists.some(
    (playlist) => playlist.nombre.toLowerCase() === nombreLimpio.toLowerCase(),
  );
  if (yaExiste) {
    actualizarEstado({
      modal: {
        tipo: "nueva-playlist",
        error: "Ya existe una playlist con ese nombre",
      },
    });
    return;
  }

  const nuevaPlaylist = new Playlist({
    nombre: nombreLimpio,
  });

  actualizarEstado({
    playlists: [nuevaPlaylist, ...estado.playlists],
    modal: { tipo: null, error: null },
  });
}

export function cambiarVista(vista) {
  actualizarEstado({ vistaActiva: vista });
}
