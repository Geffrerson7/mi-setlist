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

## 15/07/2026 — Creación del wireframe en formato ASCII

**Para qué:** Tener un bosquejo base del wireframe de la app.
**Prompt:**

```
crea un wireframe en ASCII de la app
```

**Resultado:**
Un archivo .md con los wireframe de la app en código ASCII

## 15/07/2026 — Creación del wireframe en formato ASCII

**Para qué:** Tener un bosquejo del wireframe del formulario de creación de playlist.
**Prompt:**

```
¿este botón que mostraría [ + Nueva playlist ]?
```

**Resultado:**
El wireframe de la app en código ASCII del formulario de creación de playlist.

## 15/07/2026 — Creación del wireframe en formato ASCII

**Para qué:** Tener un bosquejo del wireframe del selector de playlist en cada canción.
**Prompt:**

```
¿este selector que mostraría [+ Agregar a ▾]?
```

**Resultado:**
El wireframe de la app en código ASCII del selector de playlist en cada canción.

## 16/07/2026 — Implementación HU1

**Para qué:** Implementar la HU1.
**Prompt:**

```
CONTEXTO:
Esta es la estructura de archivos del proyecto:
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

TAREA: Implementemos JUNTOS esta historia:
HU-01: Buscar canciones en el catálogo
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero buscar canciones por artista o título, para encontrar música real que luego pueda agregar a mis playlists.

**Criterios de aceptación:**
- Existe un campo de búsqueda donde puedo escribir un artista o título de canción.
- Al ejecutar la búsqueda, se muestra una lista de resultados con carátula, nombre de la canción, artista y duración.
- Puedo realizar una nueva búsqueda tantas veces como quiera sin recargar la página.
- Si no escribo ningún texto, la búsqueda no se ejecuta o se me indica que debo ingresar un término.

MODO: Antes de escribir código, hazme las preguntas estratégicas necesarias
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato que te compartí en unos mensajes anteriores. No reescribas archivos que no
te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo.

Q: ¿Cómo se dispara la búsqueda?
A: Solo al hacer clic en 'Buscar' o presionar Enter

Q: ¿Cuántos resultados como máximo mostrar por búsqueda?
A: 10

Q: Si el campo está vacío y el usuario intenta buscar, ¿qué prefieres?
A: Bloquear el envío (botón deshabilitado, no pasa nada)
```

**Resultado:**

1. js/models/Cancion.js — el modelo de una canción
2. js/api.js — la llamada a iTunes
3. js/state.js — el estado central
4. index.html — el formulario de búsqueda y el contenedor de resultados
5. css/styles.css — estilos mínimos para esta sección
6. js/ui.js — render y eventos del formulario
7. js/app.js — el punto de entrada que conecta todo

## 16/07/2026 — Implementación HU2

**Para qué:** Implementar la HU2.
**Prompt:**

```
TAREA: Implementemos JUNTOS esta historia:
HU-02: Comunicar el estado de la búsqueda
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero saber si la búsqueda está en curso, si falló o si no hay resultados, para entender qué está pasando en cada momento.

**Criterios de aceptación:**
- Mientras se realiza la búsqueda, se muestra un indicador de carga visible.
- Si la búsqueda no puede completarse, se muestra un mensaje de error claro y comprensible.
- Si la búsqueda se completa pero no hay canciones que coincidan, se muestra un mensaje amigable indicando que no hay resultados.
- El indicador de carga desaparece apenas se muestran los resultados o el mensaje correspondiente.

MODO: Antes de escribir código, hazme las preguntas estratégicas necesarias
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato que te compartí en unos mensajes anteriores. No reescribas archivos que no te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo.

Q: El indicador de carga hoy es solo texto ('⏳ Buscando...'). ¿Querés algo más visual (spinner animado con CSS) o el texto es suficiente?
A: Agregar un spinner animado además del texto

Q: Si la búsqueda falla, ¿el mensaje de error debería ser siempre el mismo texto genérico, o diferenciar según el tipo de falla (sin conexión vs. error del servidor)?
A: Diferenciar el mensaje según el tipo de error

Q: Si el usuario dispara una nueva búsqueda antes de que la anterior termine (por ej. busca rápido dos veces), ¿qué debería pasar?
A: Ignorar la respuesta vieja si llega tarde, solo importa la última búsqueda
```

**Resultado:**

1. js/api.js — diferenciar el tipo de error
2. js/app.js — ignorar respuestas viejas (condición de carrera)
3. js/ui.js — spinner en el mensaje de carga
4. css/styles.css — animación del spinner

## 16/07/2026 — Implementación HU3

**Para qué:** Implementar la HU3.
**Prompt:**

```
TAREA: Implementemos JUNTOS esta historia:
HU-03: Crear una playlist nueva
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero crear playlists con un nombre propio, para organizar mi música según mis propios criterios.

**Criterios de aceptación:**
- Existe una opción visible para crear una playlist nueva.
- Al crear una playlist debo asignarle un nombre.
- La playlist creada aparece inmediatamente en mi lista de playlists.
- No puedo crear una playlist sin nombre; se me indica que el nombre es obligatorio.
- Puedo crear varias playlists con nombres distintos.

MODO: Antes de escribir código, hazme las preguntas estratégicas necesarias
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato que te compartí en unos mensajes anteriores. No reescribas archivos que no te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo.

Q: ¿Cómo preferís el formulario para crear playlist?
A: Modal (como el de confirmación de eliminar)

Q: ¿Se permiten dos playlists con el mismo nombre (ej. dos 'Favoritos')?
A: No, bloquear si ya existe una playlist con ese nombre

Q: ¿Dónde debería aparecer la playlist recién creada en la lista 'Mis playlists'?
A: Arriba de todas (la más nueva primero)
```

**Resultado:**

1. js/state.js — estado del modal + acción crearPlaylist
2. index.html — sección de playlists + markup del modal
3. css/styles.css — estilos de playlists y modal
4. js/ui.js — render de playlists + render/eventos del modal
5. js/app.js — conectar el modal

## 17/07/2026 — Implementación HU4

**Para qué:** Implementar la HU4.
**Prompt:**

```
TAREA: Implementemos JUNTOS esta historia:
HU-04: Agregar una canción a una playlist
**Sprint:** 1
**Prioridad:** Alta

Como usuario, quiero agregar canciones desde los resultados de búsqueda a una playlist, para ir construyendo mi selección de música.

**Criterios de aceptación:**
- Desde cada resultado de búsqueda puedo elegir a qué playlist agregar la canción.
- Si no tengo playlists creadas, se me informa y se me ofrece crear una.
- Al agregar una canción, recibo una confirmación visual de que fue añadida.
- Puedo agregar la misma canción a más de una playlist.

MODO: Antes de escribir código, hazme las preguntas estratégicas necesarias
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato que te compartí en unos mensajes anteriores. No reescribas archivos que no te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo.

Q: ¿Cómo preferís el formulario para crear playlist?
A: Modal (como el de confirmación de eliminar)

Q: ¿Se permiten dos playlists con el mismo nombre (ej. dos 'Favoritos')?
A: No, bloquear si ya existe una playlist con ese nombre

Q: ¿Dónde debería aparecer la playlist recién creada en la lista 'Mis playlists'?
A: Arriba de todas (la más nueva primero)
```

**Resultado:**

1. js/state.js — agregar 4 campos al estado inicial
2. js/state.js — modificar abrirModalNuevaPlaylist y cerrarModa
3. js/state.js — modificar crearPlaylist
4. js/state.js — 5 funciones nuevas, agregalas al final del archivo
5. index.html — agregar el contenedor del toast
6. css/styles.css — estilos del dropdown "Agregar a" y del toast
7. js/ui.js — dropdown por resultado + toast + eventos
8. js/app.js

## 19/07/2026 — Implementación HU5

**Para qué:** Implementar la HU5.
**Prompt:**

```
TAREA: Implementemos JUNTOS esta historia:
HU-05: Ver el contenido de una playlist
**Sprint:** 1
**Prioridad:** Alta
Como usuario, quiero ver el listado completo de canciones de una playlist, para revisar qué música ya agregué.
**Criterios de aceptación:**
- Al seleccionar una playlist, se muestra la lista de canciones que contiene con carátula, nombre, artista y duración.
- Cada canción muestra la fecha en que fue agregada a la playlist.
- Si la playlist no tiene canciones, se muestra un mensaje amigable indicando que está vacía.
- Puedo volver a la lista general de playlists desde esta vista.


MODO: Antes de escribir código, hazme 2 o 3 preguntas estratégicas
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato. No reescribas archivos que no
te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo.

Q: ¿Cómo preferís mostrar el detalle de una playlist al seleccionarla?
A: Vista de detalle dentro de la misma pestaña 'Mis playlists' (reemplaza la lista)

Q: ¿En qué formato querés mostrar la fecha en que se agregó cada canción?
A: Fecha absoluta (ej. 14/07/2026)

Q: ¿Cómo se selecciona una playlist para ver su detalle?
A: Solo un botón/link específico dentro de la card (ej. 'Ver')
```

**Resultado:**

1. js/state.js — agregar playlistSeleccionadaId + 2 funciones
2. index.html — envolver la lista existente + agregar la vista de detalle
3. css/styles.css — botón "Ver", botón "Volver", título de detalle
4. js/ui.js — referencias, formateo de fecha y render del detalle
5. js/app.js — conectar

## 19/07/2026 — Implementación HU6

**Para qué:** Implementar la HU6.
**Prompt:**

```
TAREA: Implementemos JUNTOS esta historia:
HU-06: Persistir playlists y canciones al recargar
**Sprint:** 1
**Prioridad:** Alta
Como usuario, quiero que mis playlists y canciones se mantengan guardadas al recargar la página, para no perder mi organización de música.
**Criterios de aceptación:**
- Al recargar la página, todas las playlists creadas siguen visibles.
- Al recargar la página, las canciones agregadas a cada playlist se mantienen con su fecha de agregado.
- Si cierro y vuelvo a abrir la aplicación más tarde, la información sigue disponible.
MODO: Antes de escribir código, hazme 2 o 3 preguntas estratégicas
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.
RESTRICCIONES: Respeta el contrato. No reescribas archivos que no
te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo.

Q: ¿Qué debe persistir en localStorage?
A: Solo playlists y sus canciones

Q: ¿Cuándo debe guardarse en localStorage?
A: Automático en cada cambio de estado (cada vez que se crea/agrega/quita algo)

Q: Si el guardado falla (localStorage lleno o deshabilitado por el navegador), ¿qué preferu00eds?
A: Mostrar un toast avisando que no se pudo guardar
```

**Resultado:**
1) js/storage.js (nuevo archivo)
2) js/state.js — cargar desde storage al iniciar el estado
3) js/app.js — guardar automáticamente en cada cambio (con guard)

## 19/07/2026 — Actualización del README.md

**Para qué:** Documentar todo los avances que se han hecho hasta el momento.
**Prompt:**

```
TAREA: Implementemos JUNTOS la información que hay que actualizar en el README.md
# MI-SETLIST
Aplicación web para buscar canciones en el catálogo de iTunes y organizarlas en playlists personales que se guardan en tu navegador, sin necesidad de cuenta ni backend.
## Stack tecnológico
- **HTML** semántico
- **CSS**
- **Tailwind CSS**
- **JavaScript vanilla** con módulos ESM (import/export, <script type="module">)
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
Este proyecto usa módulos ESM, por lo que **no funciona abriendo index.html directamente con file://**. Es necesario servirlo con un servidor local, por ejemplo con la extensión **Live Server** de VS Code:
1. Clonar el repositorio:
   bash
   git clone https://github.com/tu-usuario/mi-setlist.git
   cd mi-setlist
   
2. Abir la carpeta del proyecto en VS Code.
3. Instalar la extensión **Live Server** (si no la tenés).
4. Hacer clic derecho sobre index.html y seleccioná **"Open with Live Server"**.
5. El proyecto se abrirá en tu navegador en una URL local (por ejemplo http://127.0.0.1:5500).
Alternativamente, podés usar cualquier otro servidor estático local, por ejemplo:
bash
npx serve .

## Estructura de archivos

mi-setlist/
├── index.html
├── css/styles.css
├── js/
│   ├── app.js             # Punto de entrada, inicialización
│   ├── models/Cancion.js  # Clase que modela una canción
│   ├── state.js           # Estado central (playlists)
│   ├── storage.js         # localStorage (guardar/cargar/limpiar)
│   ├── api.js              # fetch a la API de iTunes
│   └── ui.js              # render + eventos del DOM
├── PROMPTS.md             # Registro de trabajo con la IA
├── README.md              # Documentación del proyecto
└── .gitignore

MODO: Antes de escribir código, hazme 2 o 3 preguntas estratégicas
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.
RESTRICCIONES: Respeta el contrato. No reescribas archivos que no
te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo.

Q: Pusiste 'Tailwind CSS' en el stack, pero hasta ahora todo el CSS que armamos es propio (variables, sin Tailwind). ¿Lo saco del README o realmente lo vas a incorporar?
A: No, sacar Tailwind (nunca lo usamos, es CSS propio con variables)

Q: ¿Querés que el README refleje el progreso actual (Sprint 1 completo, Sprint 2 pendiente)?
A: No, dejar la lista de HUs sin indicar estado

Q: En la estructura de archivos falta 'js/models/Playlist.js' (ya lo creamos en HU-03) y hay un pequeño desalineado en el coment  ario de api.js. ¿Lo corrijo?
A: Sí, agregar Playlist.js y corregir el desalineado de api.js
```

**Resultado:**
1) Nuevo README.md con informacion de actualizada del SPRINT 1