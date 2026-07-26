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
        return total; // canción sin duración conocida: no suma, no resta
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
}
