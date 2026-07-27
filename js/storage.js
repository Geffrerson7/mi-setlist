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
  const crudo = localStorage.getItem(CLAVE_STORAGE);

  if (!crudo) {
    // No hay nada guardado todavía: caso normal de usuario nuevo, no es un error.
    return { playlists: [], datosCorruptos: false };
  }

  try {
    const datos = JSON.parse(crudo);
    if (!Array.isArray(datos)) {
      throw new Error("El formato guardado no es una lista de playlists");
    }

    const playlists = datos.map(rehidratarPlaylist);
    return { playlists, datosCorruptos: false };
  } catch {
    // Datos corruptos (JSON inválido, estructura inesperada, o alguna
    // playlist/canción con forma incorrecta): descartamos lo guardado
    // para no dejar la app en un estado inconsistente.
    try {
      localStorage.removeItem(CLAVE_STORAGE);
    } catch {
      // Si ni siquiera se puede borrar, igual seguimos con estado vacío
      // en memoria; la app sigue siendo usable en esta sesión.
    }
    return { playlists: [], datosCorruptos: true };
  }
}

function rehidratarPlaylist(datos) {
  return new Playlist({
    id: datos.id,
    nombre: datos.nombre,
    fechaCreacion: new Date(datos.fechaCreacion),
    fechaEdicion: datos.fechaEdicion ? new Date(datos.fechaEdicion) : null,
    ordenCriterio: datos.ordenCriterio ?? "recientes",
    canciones: (datos.canciones ?? []).map((entrada) => ({
      cancion: new Cancion({ ...entrada.cancion }),
      fechaAgregado: new Date(entrada.fechaAgregado),
    })),
  });
}
