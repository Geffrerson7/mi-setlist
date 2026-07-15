# Backlog de Historias de Usuario — App de Playlists

**Proyecto:** Buscador y organizador de playlists personales (iTunes Search API + LocalStorage)
**Equipo:** 1 desarrollador
**Duración:** 2 sprints (1 sesión de desarrollo por sprint)

---

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

## Resumen de priorización

| Sprint | Historias | Enfoque |
|--------|-----------|---------|
| Sprint 1 | HU-01 a HU-06 | Búsqueda, creación de playlists, agregado de canciones y persistencia básica |
| Sprint 2 | HU-07 a HU-11 | Eliminación con confirmación, métricas (duración y estadísticas), orden y robustez ante errores |

**Total de historias:** 11