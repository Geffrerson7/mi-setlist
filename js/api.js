import { Cancion } from "./models/Cancion.js";

const BASE_URL = "https://itunes.apple.com/search";
const LIMITE_RESULTADOS = 10;

export async function buscarCanciones(termino) {
  const url = `${BASE_URL}?term=${encodeURIComponent(termino)}&media=music&entity=song&limit=${LIMITE_RESULTADOS}`;

  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("No se pudo conectar con la API de iTunes");
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
