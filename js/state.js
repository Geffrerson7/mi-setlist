import { Playlist } from "./models/Playlist.js";

let estado = {
  busqueda: { status: "idle", resultados: [], mensajeError: null },
  playlists: [],
  modal: { tipo: null, error: null },
  modalAgregar: { abierto: false, cancionId: null, filtro: "" },
  vistaActiva: "busqueda",
  toast: { mensaje: null },
  cancionPendiente: null,
  playlistSeleccionadaId: null,
};

const listeners = [];

let toastTimeoutId = null;

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
  actualizarEstado({
    modal: { tipo: "nueva-playlist", error: null },
    cancionPendiente: null,
  });
}

export function cerrarModal() {
  actualizarEstado({
    modal: { tipo: null, error: null },
    cancionPendiente: null,
  });
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

  const cancionPendienteAlCrear = estado.cancionPendiente;
  let playlistFinal = new Playlist({ nombre: nombreLimpio });

  if (cancionPendienteAlCrear) {
    playlistFinal = new Playlist({
      ...playlistFinal,
      canciones: [
        { cancion: cancionPendienteAlCrear, fechaAgregado: new Date() },
      ],
    });
  }

  actualizarEstado({
    playlists: [playlistFinal, ...estado.playlists],
    modal: { tipo: null, error: null },
    cancionPendiente: null,
  });

  if (cancionPendienteAlCrear) {
    mostrarToast(
      `✓ "${cancionPendienteAlCrear.titulo}" agregada a ${playlistFinal.nombre}`,
    );
  }
}

export function cambiarVista(vista) {
  actualizarEstado({ vistaActiva: vista });
}

export function mostrarToast(mensaje) {
  if (toastTimeoutId) clearTimeout(toastTimeoutId);
  actualizarEstado({ toast: { mensaje } });
  toastTimeoutId = setTimeout(() => {
    actualizarEstado({ toast: { mensaje: null } });
    toastTimeoutId = null;
  }, 2500);
}

export function abrirModalAgregar(cancionId) {
  actualizarEstado({ modalAgregar: { abierto: true, cancionId, filtro: "" } });
}

export function cerrarModalAgregar() {
  actualizarEstado({
    modalAgregar: { abierto: false, cancionId: null, filtro: "" },
  });
}

export function filtrarPlaylistsEnModal(texto) {
  actualizarEstado({
    modalAgregar: { ...estado.modalAgregar, filtro: texto },
  });
}

export function abrirModalNuevaPlaylistDesdeAgregar() {
  const cancionId = estado.modalAgregar.cancionId;
  const cancion = estado.busqueda.resultados.find((c) => c.id === cancionId);
  actualizarEstado({
    modal: { tipo: "nueva-playlist", error: null },
    modalAgregar: { abierto: false, cancionId: null },
    cancionPendiente: cancion ?? null,
  });
}

export function agregarCancionAPlaylist(cancionId, playlistId) {
  const cancion = estado.busqueda.resultados.find((c) => c.id === Number(cancionId));
  const playlist = estado.playlists.find((p) => p.id === playlistId);

  if (!cancion || !playlist) return;

  const yaEstaEnPlaylist = playlist.canciones.some(
    (entrada) => entrada.cancion.id === cancionId,
  );
  if (yaEstaEnPlaylist) {
    actualizarEstado({
      modalAgregar: { abierto: false, cancionId: null, filtro: "" },
    });
    mostrarToast(`"${cancion.titulo}" ya está en ${playlist.nombre}`);
    return;
  }

  const playlistsActualizadas = estado.playlists.map((p) =>
    p.id === playlistId
      ? new Playlist({
          ...p,
          canciones: [...p.canciones, { cancion, fechaAgregado: new Date() }],
          fechaEdicion: new Date(),
        })
      : p,
  );

  actualizarEstado({
    playlists: playlistsActualizadas,
    modalAgregar: { abierto: false, cancionId: null, filtro: "" },
  });
  mostrarToast(`✓ "${cancion.titulo}" agregada a ${playlist.nombre}`);
}

export function seleccionarPlaylist(playlistId) {
  actualizarEstado({ playlistSeleccionadaId: playlistId });
}

export function volverAListaPlaylists() {
  actualizarEstado({ playlistSeleccionadaId: null });
}
