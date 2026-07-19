import { Playlist } from "./models/Playlist.js";
import { Cancion } from "./models/Cancion.js";

const CLAVE_STORAGE = "mi-setlist:playlists";

export function guardarPlaylists(playlists) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(playlists));
    return true;
  } catch {
    return false;
  }
}

export function cargarPlaylists() {
  try {
    const crudo = localStorage.getItem(CLAVE_STORAGE);
    if (!crudo) return [];

    const datos = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];

    return datos.map(rehidratarPlaylist);
  } catch {
    // Datos corruptos: por ahora arrancamos vacío en vez de romper la app.
    // El flujo completo de "Empezar de cero" con aviso al usuario es HU-11.
    return [];
  }
}

function rehidratarPlaylist(datos) {
  return new Playlist({
    id: datos.id,
    nombre: datos.nombre,
    fechaCreacion: new Date(datos.fechaCreacion),
    fechaEdicion: datos.fechaEdicion ? new Date(datos.fechaEdicion) : null,
    canciones: (datos.canciones ?? []).map((entrada) => ({
      cancion: new Cancion({ ...entrada.cancion }),
      fechaAgregado: new Date(entrada.fechaAgregado),
    })),
  });
}
