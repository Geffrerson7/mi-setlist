function calcularMasFrecuente(items) {
  if (items.length === 0) return null;

  const conteos = new Map();
  for (const item of items) {
    conteos.set(item, (conteos.get(item) ?? 0) + 1);
  }

  let mejor = null;
  let mejorConteo = 0;

  for (const [item, conteo] of conteos) {
    const empataYGanaAlfabeticamente =
      conteo === mejorConteo && item.localeCompare(mejor) < 0;

    if (conteo > mejorConteo || empataYGanaAlfabeticamente) {
      mejor = item;
      mejorConteo = conteo;
    }
  }

  return mejor;
}

export class Playlist {
  constructor({
    id,
    nombre,
    canciones = [],
    fechaCreacion,
    fechaEdicion = null,
  }) {
    this.id = id ?? crypto.randomUUID();
    this.nombre = nombre;
    this.canciones = canciones;
    this.fechaCreacion = fechaCreacion ?? new Date();
    this.fechaEdicion = fechaEdicion;
  }

  get duracionTotalMs() {
    return this.canciones.reduce((total, { cancion }) => {
      if (cancion.duracionMs === null || cancion.duracionMs === undefined) {
        return total;
      }
      return total + cancion.duracionMs;
    }, 0);
  }

  get duracionTotalFormateada() {
    const totalMinutos = Math.round(this.duracionTotalMs / 60000);

    if (totalMinutos < 60) {
      return `${totalMinutos} min`;
    }

    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;
    return `${horas} h ${minutos} min`;
  }

  get generoMasFrecuente() {
    const generos = this.canciones.map(
      ({ cancion }) => cancion.genero?.trim() || "Desconocido",
    );
    return calcularMasFrecuente(generos);
  }

  get artistaMasFrecuente() {
    const artistas = this.canciones.map(
      ({ cancion }) => cancion.artista?.trim() || "Desconocido",
    );
    return calcularMasFrecuente(artistas);
  }
}
