# MI-SETLIST

Aplicación web para buscar canciones en el catálogo de iTunes y organizarlas en playlists personales que se guardan en tu navegador, sin necesidad de cuenta ni backend.

## Demo

🔗 [Ver la app en vivo](https://geffrerson7.github.io/mi-setlist/)

## Stack tecnológico

- **HTML** semántico
- **CSS**
- **JavaScript vanilla** con módulos ESM (`import`/`export`, `<script type="module">`)
- **iTunes Search API** (solo lectura, sin key) para la búsqueda de canciones
- **LocalStorage** para la persistencia de playlists y canciones
- **GitHub Pages** para el deploy

## Historias de usuario

### Sprint 1

- **HU-01** — Buscar canciones en el catálogo
- **HU-02** — Comunicar el estado de la búsqueda (carga / error / sin resultados)
- **HU-03** — Crear una playlist nueva
- **HU-04** — Agregar una canción a una playlist
- **HU-05** — Ver el contenido de una playlist
- **HU-06** — Persistir playlists y canciones al recargar

### Sprint 2

- **HU-07** — Quitar canciones y eliminar playlists con confirmación
- **HU-08** — Ver duración total de la playlist
- **HU-09** — Ver estadísticas de la playlist (género y artista más frecuentes)
- **HU-10** — Ordenar canciones dentro de una playlist
- **HU-11** — Recuperación ante datos corruptos

## Cómo ejecutar el proyecto localmente

Este proyecto usa módulos ESM, por lo que **no funciona abriendo `index.html` directamente con `file://`**. Es necesario servirlo con un servidor local, por ejemplo con la extensión **Live Server** de VS Code:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/mi-setlist.git
   cd mi-setlist
   ```
2. Abir la carpeta del proyecto en VS Code.
3. Instalar la extensión **Live Server** (si no la tenés).
4. Hacer clic derecho sobre `index.html` y seleccioná **"Open with Live Server"**.
5. El proyecto se abrirá en tu navegador en una URL local (por ejemplo `http://127.0.0.1:5500`).

Alternativamente, podés usar cualquier otro servidor estático local, por ejemplo:

```bash
npx serve .
```

## Estructura de archivos

```
 mi-setlist/
 ├── index.html
 ├── css/styles.css
 ├── js/
 │   ├── app.js             # Punto de entrada, inicialización
 │   ├── models/Cancion.js  # Clase que modela una canción
 │   ├── models/Playlist.js # Clase que modela una playlist
 │   ├── state.js           # Estado central (playlists)
 │   ├── storage.js         # localStorage (guardar/cargar/limpiar)
 │   ├── api.js             # fetch a la API de iTunes
 │   └── ui.js              # render + eventos del DOM
 ├── PROMPTS.md             # Registro de trabajo con la IA
 ├── README.md              # Documentación del proyecto
 └── .gitignore
```
