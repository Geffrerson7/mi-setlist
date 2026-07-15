## 14/07/2026 — Descomposición del MVP en HUs
**Para qué:** derivar mis historias de usuario.
**Prompt:**
```
[CONTEXTO]
Construir una aplicación web que permita buscar canciones en un catálogo real (API de iTunes) y organizarlas en playlists personales que sobreviven al recargar la página. La app calcula la duración total de cada playlist y muestra estadísticas de tu música.
Inspiración: el “armador de playlists” de cualquier app de música, sin cuenta ni backend.
Stack: HTML5 semántico + CSS3 (propio o Tailwind Play CDN, a tu criterio) + JavaScript vanilla con módulos ESM (import/export, <script type="module">).
Arquitectura: estado central plano + patrón “cambias el estado → llamas render()”. CRUD inmutable (.filter/.map/spread). Delegación de eventos para las listas. Ids con crypto.randomUUID().
Persistencia: localStorage + JSON.stringify/parse envueltos en try/catch; fechas rehidratadas al cargar.
UX: confirmaciones con modal propio (nada de confirm() nativo); estados vacíos amigables.
API: iTunes Search API (solo lectura, sin key).
Deploy: GitHub Pages. ESM no corre con file:// → usar Live Server.
La aplicación debe permitir como mínimo:
Buscar canciones por artista o título en la API, mostrando carátula, nombre, artista y duración.
Comunicar el estado de la búsqueda: indicador de carga, mensaje de error si la API falla, mensaje amigable si no hay resultados.
Crear playlists con nombre propio (ej: “Road trip”, “Ensayo sábado”).
Agregar canciones desde los resultados de búsqueda a una playlist.
Ver el contenido de una playlist con los datos de cada canción y la fecha en que se agregó.
Quitar canciones y eliminar playlists con confirmación previa (modal propio).
Ver la duración total de la playlist en formato legible (ej: “1 h 23 min”).
Ver estadísticas de la playlist: cantidad de canciones, género más frecuente, artista más repetido.
Ordenar las canciones de una playlist (recientes/antiguas, alfabético).
Persistir todo en LocalStorage y restaurar al recargar; si los datos están corruptos, la app no se rompe y ofrece “Empezar de cero”.
[TAREA]
Descompón el MVP en historias de usuario priorizadas para un único desarrollador que trabajará en 2 sprints (una sesión de desarrollo por sprint). Organiza las historias en el orden más lógico para construir la aplicación, comenzando por la funcionalidad base y dejando las mejoras para el final.
[FORMATO]
Entrega la respuesta en formato Markdown (.md).
Para cada historia incluye:
- ID (HU-01, HU-02, etc.).
- Sprint asignado (Sprint 1 o Sprint 2).
- Título corto.
- Historia de usuario con el formato: "Como <tipo de usuario>, quiero <objetivo>, para <beneficio>".
- Prioridad (Alta, Media o Baja).
- Entre 3 y 5 criterios de aceptación escritos en formato verificable.
[RESTRICCIÓN]
- Genera un máximo de 11 historias de usuario.
- Los criterios de aceptación deben describir únicamente comportamientos observables desde la interfaz o el resultado esperado por el usuario.
- No describas detalles técnicos, arquitectura, tecnologías ni implementación.
- No agregues funcionalidades que no estén explícitamente incluidas en el MVP.
- Cada historia debe representar una unidad funcional que pueda completarse de forma independiente.
- Evita historias demasiado grandes; si una funcionalidad es extensa, divídela en varias historias.
```
**Resultado:** Archivo .md como base de mis 11 HUs; ajusté criterios y alcance a mano.

## 14/07/2026 — Planificación de los sprints
**Para qué:** Distribuirlas mis HUs en Sprint 1 y Sprint 2 .
**Prompt:**
```
Estas son mis 11 historias finales:
## Sprint 1 — Funcionalidad base: buscar, crear y guardar

### HU-01: Buscar canciones en el catálogo
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero buscar canciones por artista o título, para encontrar música real que luego pueda agregar a mis playlists.

**Criterios de aceptación:**
- Existe un campo de búsqueda donde puedo escribir un artista o título de canción.
- Al ejecutar la búsqueda, se muestra una lista de resultados con carátula, nombre de la canción, artista y duración.
- Puedo realizar una nueva búsqueda tantas veces como quiera sin recargar la página.
- Si no escribo ningún texto, la búsqueda no se ejecuta o se me indica que debo ingresar un término.

---

### HU-02: Comunicar el estado de la búsqueda
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero saber si la búsqueda está en curso, si falló o si no hay resultados, para entender qué está pasando en cada momento.

**Criterios de aceptación:**
- Mientras se realiza la búsqueda, se muestra un indicador de carga visible.
- Si la búsqueda no puede completarse, se muestra un mensaje de error claro y comprensible.
- Si la búsqueda se completa pero no hay canciones que coincidan, se muestra un mensaje amigable indicando que no hay resultados.
- El indicador de carga desaparece apenas se muestran los resultados o el mensaje correspondiente.

---

### HU-03: Crear una playlist nueva
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero crear playlists con un nombre propio, para organizar mi música según mis propios criterios.

**Criterios de aceptación:**
- Existe una opción visible para crear una playlist nueva.
- Al crear una playlist debo asignarle un nombre.
- La playlist creada aparece inmediatamente en mi lista de playlists.
- No puedo crear una playlist sin nombre; se me indica que el nombre es obligatorio.
- Puedo crear varias playlists con nombres distintos.

---

### HU-04: Agregar una canción a una playlist
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero agregar canciones desde los resultados de búsqueda a una playlist, para ir construyendo mi selección de música.

**Criterios de aceptación:**
- Desde cada resultado de búsqueda puedo elegir a qué playlist agregar la canción.
- Si no tengo playlists creadas, se me informa y se me ofrece crear una.
- Al agregar una canción, recibo una confirmación visual de que fue añadida.
- Puedo agregar la misma canción a más de una playlist.

---

### HU-05: Ver el contenido de una playlist
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero ver el listado completo de canciones de una playlist, para revisar qué música ya agregué.

**Criterios de aceptación:**
- Al seleccionar una playlist, se muestra la lista de canciones que contiene con carátula, nombre, artista y duración.
- Cada canción muestra la fecha en que fue agregada a la playlist.
- Si la playlist no tiene canciones, se muestra un mensaje amigable indicando que está vacía.
- Puedo volver a la lista general de playlists desde esta vista.

---

### HU-06: Persistir playlists y canciones al recargar
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero que mis playlists y canciones se mantengan guardadas al recargar la página, para no perder mi organización de música.

**Criterios de aceptación:**
- Al recargar la página, todas las playlists creadas siguen visibles.
- Al recargar la página, las canciones agregadas a cada playlist se mantienen con su fecha de agregado.
- Si cierro y vuelvo a abrir la aplicación más tarde, la información sigue disponible.

---

## Sprint 2 — Gestión, métricas y robustez

### HU-07: Quitar canciones y eliminar playlists con confirmación
**Sprint:** 2
**Prioridad:** Media

Como usuario, quiero quitar canciones de una playlist y eliminar playlists completas confirmando antes cada acción, para depurar mi música y evitar borrados accidentales.

**Criterios de aceptación:**
- Cada canción dentro de una playlist tiene una opción para quitarla, y cada playlist tiene una opción visible para eliminarla completa.
- Antes de eliminar una canción o una playlist, se muestra un modal propio pidiendo confirmación (indicando qué se va a eliminar).
- Si confirmo, el elemento correspondiente (canción o playlist con todas sus canciones) desaparece inmediatamente de la vista.
- Si cancelo, no se realiza ningún cambio.
- El cambio se mantiene luego de recargar la página.

---

### HU-08: Ver duración total de la playlist
**Sprint:** 2
**Prioridad:** Alta

Como usuario, quiero ver la duración total de una playlist en formato legible, para saber cuánto dura mi selección de música.

**Criterios de aceptación:**
- Dentro de la vista de una playlist se muestra la duración total sumando todas sus canciones.
- La duración se presenta en un formato legible (por ejemplo "1 h 23 min").
- La duración total se actualiza automáticamente al agregar o quitar canciones.
- Si la playlist está vacía, se muestra una duración de "0 min" o equivalente.

---

### HU-09: Ver estadísticas de la playlist
**Sprint:** 2
**Prioridad:** Media

Como usuario, quiero ver estadísticas de mi playlist, para conocer mejor las características de mi música.

**Criterios de aceptación:**
- Dentro de la vista de una playlist se muestra la cantidad total de canciones.
- Se muestra el género musical más frecuente entre las canciones de la playlist.
- Se muestra el artista más repetido dentro de la playlist.
- Si hay un empate entre géneros o artistas, se muestra al menos uno de forma consistente.
- Las estadísticas se actualizan automáticamente al modificar la playlist.

---

### HU-10: Ordenar canciones dentro de una playlist
**Sprint:** 2
**Prioridad:** Media

Como usuario, quiero ordenar las canciones de una playlist, para encontrar más fácilmente lo que busco según mi criterio.

**Criterios de aceptación:**
- Puedo ordenar las canciones por fecha de agregado (más recientes primero o más antiguas primero).
- Puedo ordenar las canciones alfabéticamente por nombre.
- El orden elegido se refleja inmediatamente en la lista visible.
- El criterio de orden puede cambiarse sin perder ninguna canción de la playlist.

---

### HU-11: Recuperación ante datos corruptos
**Sprint:** 2
**Prioridad:** Baja

Como usuario, quiero que la aplicación siga funcionando aunque mis datos guardados estén dañados, para no quedarme sin poder usarla.

**Criterios de aceptación:**
- Si los datos guardados no pueden leerse correctamente, la aplicación no se rompe ni queda en blanco.
- Se muestra un mensaje explicando que hubo un problema con los datos guardados.
- Se ofrece una opción de "Empezar de cero" que permite seguir usando la aplicación con una nueva playlist vacía.
- Al elegir "Empezar de cero", la aplicación queda en un estado limpio y utilizable.

---
Propón cómo distribuir las historias de usuario en Sprint 1 y Sprint 2 (una clase cada uno).
Justifica cada asignación, señala las dependencias (qué necesito
tener antes de qué) y dime cuál historia es la más difícil técnicamente. Sigue este formato
y envíame la respuesta en un archivo .md:
## Sprint 1 (Clase 18) — Meta: [qué se ve funcionando al final, en 1 línea]
- HU__: ______ (por qué va primero)
...
## Sprint 2 (Clase 19) — Meta: [1 línea]
- HU__: ______
...
## Dependencias detectadas
- Para HU__ necesito antes HU__ porque ______.
## Mi reto técnico principal
La HU que más me intimida es ______ porque ______.
```
**Resultado:** Archivo .md con la distribución de sprints, dependencias y el reto técnico principal.

## 14/07/2026 — Creación del README.md
**Para qué:** Crear el contenido del README.md del proyecto.
**Prompt:**
```
Crea un README.MD con una línea de descripción del proyecto, stack tecnológico, las HUs, y cómo ejecutar el proyecto localmente y la estructura de archivos.
Estructura de archivos

mi-setlist/
├── index.html
├── css/styles.css
├── js/
│   ├── app.js             # Punto de entrada, inicialización
│   ├── models/Cancion.js  # Clase que modela una canción
│   ├── state.js           # Estado central (playlists)
│   ├── storage.js         # localStorage (guardar/cargar/limpiar)
│   ├── api.js             # fetch a la API de iTunes
│   └── ui.js              # render + eventos del DOM
├── PROMPTS.md             # Registro de trabajo con la IA
├── README.md              # Documentación del proyecto
└── .gitignore
```
**Resultado:** Archivo README.md