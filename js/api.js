import { Cancion } from "./models/Cancion.js";

const BASE_URL = "https://itunes.apple.com/search";
const LIMITE_RESULTADOS = 10;

export async function buscarCanciones(termino) {
  const url = `${BASE_URL}?term=${encodeURIComponent(termino)}&media=music&entity=song&limit=${LIMITE_RESULTADOS}`;

  let respuesta;
  try {
    respuesta = await fetch(url);
  } catch {
    // fetch rechaza la promesa cuando no hay conexión, DNS falla, etc.
    const errorRed = new Error(
      "No hay conexión a internet. Revisá tu conexión e intentá de nuevo.",
    );
    errorRed.tipo = "red";
    throw errorRed;
  }

  if (!respuesta.ok) {
    const errorServidor = new Error(
      "El servidor de iTunes no respondió correctamente. Probá de nuevo en unos minutos.",
    );
    errorServidor.tipo = "servidor";
    throw errorServidor;
  }

  const datos = await respuesta.json();

  return datos.results.map(
    (item) =>
      new Cancion({
        id: item.trackId,
        titulo: item.trackName,
        artista: item.artistName,
        caratula: item.artworkUrl100,
        duracionMs: item.trackTimeMillis,
        genero: item.primaryGenreName,
      }),
  );
}
