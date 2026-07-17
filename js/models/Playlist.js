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
}
