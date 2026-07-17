export class Cancion {
  constructor({ id, titulo, artista, caratula, duracionMs, genero }) {
    this.id = id;
    this.titulo = titulo;
    this.artista = artista;
    this.caratula = caratula;
    this.duracionMs = duracionMs;
    this.genero = genero;
  }

  get duracionFormateada() {
    if (!this.duracionMs && this.duracionMs !== 0) return '--:--';
    const totalSegundos = Math.round(this.duracionMs / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}:${String(segundos).padStart(2, '0')}`;
  }
}