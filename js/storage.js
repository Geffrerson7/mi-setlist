import { Playlist } from "./models/Playlist.js";
import { Cancion } from "./models/Cancion.js";

const CLAVE_STORAGE = "mi-setlist:playlists";
const CLAVE_NAVEGACION = "mi-setlist:navegacion";
const VISTAS_VALIDAS = ["busqueda", "playlists"];

export function guardarPlaylists(playlists) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(playlists));
    return true;
  } catch {
    return false;
  }
}

export function cargarPlaylists() {
  let crudo;
  try {
    crudo = localStorage.getItem(CLAVE_STORAGE);
  } catch {
    return { playlists: [], datosCorruptos: false, playlistsDescartadas: 0 };
  }

  if (!crudo) {
    return { playlists: [], datosCorruptos: false, playlistsDescartadas: 0 };
  }

  let datos;
  try {
    datos = JSON.parse(crudo);
    if (!Array.isArray(datos)) {
      throw new Error("El formato guardado no es una lista de playlists");
    }
  } catch {
    // Fallo total: no hay forma de rescatar nada individualmente.
    try {
      localStorage.removeItem(CLAVE_STORAGE);
    } catch {
      // Si ni siquiera se puede borrar, seguimos con estado vacío en memoria.
    }
    return { playlists: [], datosCorruptos: true, playlistsDescartadas: 0 };
  }

  // El JSON en sí es válido: intentamos rehidratar playlist por playlist,
  // para no perder las que sí están bien por culpa de una sola dañada.
  const playlistsValidas = [];
  let descartadas = 0;

  for (const item of datos) {
    try {
      playlistsValidas.push(rehidratarPlaylist(item));
    } catch {
      descartadas++;
    }
  }

  if (descartadas > 0) {
    guardarPlaylists(playlistsValidas); // limpia el storage de inmediato
  }

  return {
    playlists: playlistsValidas,
    datosCorruptos: false,
    playlistsDescartadas: descartadas,
  };
}

function rehidratarPlaylist(datos) {
  const fechaCreacion = new Date(datos.fechaCreacion);
  validarFecha(fechaCreacion, "fechaCreacion de playlist");

  const fechaEdicion = datos.fechaEdicion ? new Date(datos.fechaEdicion) : null;
  if (fechaEdicion) {
    validarFecha(fechaEdicion, "fechaEdicion de playlist");
  }

  return new Playlist({
    id: datos.id,
    nombre: datos.nombre,
    fechaCreacion,
    fechaEdicion,
    ordenCriterio: datos.ordenCriterio ?? "recientes",
    canciones: (datos.canciones ?? []).map((entrada) => {
      const fechaAgregado = new Date(entrada.fechaAgregado);
      validarFecha(fechaAgregado, "fechaAgregado de canción");
      return {
        cancion: new Cancion({ ...entrada.cancion }),
        fechaAgregado,
      };
    }),
  });
}

function validarFecha(fecha, descripcion) {
  if (Number.isNaN(fecha.getTime())) {
    throw new Error(`Fecha inválida en datos guardados: ${descripcion}`);
  }
}

export function guardarNavegacion({ vistaActiva, playlistSeleccionadaId }) {
  try {
    localStorage.setItem(
      CLAVE_NAVEGACION,
      JSON.stringify({ vistaActiva, playlistSeleccionadaId }),
    );
    return true;
  } catch {
    return false;
  }
}

export function cargarNavegacion() {
  try {
    const crudo = localStorage.getItem(CLAVE_NAVEGACION);
    if (!crudo)
      return { vistaActiva: "busqueda", playlistSeleccionadaId: null };

    const datos = JSON.parse(crudo);
    const vistaActiva = VISTAS_VALIDAS.includes(datos.vistaActiva)
      ? datos.vistaActiva
      : "busqueda";
    const playlistSeleccionadaId =
      typeof datos.playlistSeleccionadaId === "string"
        ? datos.playlistSeleccionadaId
        : null;

    return { vistaActiva, playlistSeleccionadaId };
  } catch {
    return { vistaActiva: "busqueda", playlistSeleccionadaId: null };
  }
}
