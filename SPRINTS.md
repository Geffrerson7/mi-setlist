# Distribución de Historias de Usuario en Sprints

## Sprint 1 (Clase 18) — Meta: puedo buscar canciones reales, crear playlists, agregarles canciones y todo sigue ahí si recargo la página.

- HU-01: Buscar canciones en el catálogo (va primero porque sin resultados de búsqueda no hay nada que agregar a una playlist; es el punto de entrada de todo el flujo).
- HU-02: Comunicar el estado de la búsqueda (va justo después de HU-01 porque es la misma pantalla; construirla por separado sería tocar el mismo código dos veces).
- HU-03: Crear una playlist nueva (se puede construir en paralelo a la búsqueda porque no depende de ella, pero debe estar lista antes de poder agregar canciones a algo).
- HU-04: Agregar una canción a una playlist (necesita que ya existan resultados de búsqueda **y** playlists creadas, así que va después de HU-01/02 y HU-03).
- HU-05: Ver el contenido de una playlist (solo tiene sentido una vez que hay canciones agregadas; es la forma de verificar que HU-04 funciona).
- HU-06: Persistir playlists y canciones al recargar (se deja para el final del sprint a propósito: se envuelve todo el estado que ya existe, en vez de ir "parcheando" persistencia historia por historia).

## Sprint 2 (Clase 19) — Meta: puedo depurar mis playlists (quitar/eliminar con confirmación), ver cuánto duran y qué las caracteriza, ordenarlas, y la app no se rompe si algo sale mal.

- HU-07: Quitar canciones y eliminar playlists con confirmación (abre el sprint porque opera sobre datos que ya existen desde el Sprint 1; es la primera "gestión" real sobre el estado guardado).
- HU-08: Ver duración total de la playlist (una vez que el contenido de la playlist es estable —se puede agregar y quitar—, tiene sentido calcular un total sobre eso).
- HU-09: Ver estadísticas de la playlist (usa la misma lista de canciones que HU-08; conviene hacerlas seguidas porque comparten la lógica de "recorrer canciones y agregar datos").
- HU-10: Ordenar canciones dentro de una playlist (se apoya en la vista de playlist ya completa, con duración y estadísticas visibles, para no tener que retocar esa pantalla dos veces).
- HU-11: Recuperación ante datos corruptos (cierra el sprint a propósito: es la única historia que no depende del contenido de las playlists, sino de la robustez general de la persistencia, así que conviene probarla al final contra el mayor volumen de datos guardados posible).

## Dependencias detectadas
- Para HU-04 necesito antes HU-01 (y HU-02) porque no puedo agregar una canción que no viene de un resultado de búsqueda.
- Para HU-04 necesito antes HU-03 porque no puedo elegir una playlist destino si todavía no existe ninguna.
- Para HU-05 necesito antes HU-04 porque no hay contenido que mostrar en una playlist vacía por falta de canciones agregadas.
- Para HU-06 necesito antes HU-03, HU-04 y HU-05 porque hay que tener claro qué forma tiene el estado (playlists + canciones) antes de guardarlo y restaurarlo.
- Para HU-07 necesito antes HU-04 y HU-05 porque solo puedo quitar/eliminar algo que ya puedo agregar y ver.
- Para HU-08 y HU-09 necesito antes HU-07 porque el total y las estadísticas deben reflejar canciones que también pueden haberse quitado, no solo agregado.
- Para HU-10 necesito antes HU-05 (y de paso HU-08/HU-09) porque ordeno sobre la misma vista de playlist que ya muestra canciones, duración y estadísticas.
- Para HU-11 necesito antes HU-06 porque solo puedo manejar datos corruptos si ya existe un mecanismo de guardado/restauración que pueda fallar.

## Mi reto técnico principal
La HU que más me intimida es **HU-09 (Ver estadísticas de la playlist)** porque no es un cálculo directo como la duración total (HU-08): necesito agrupar canciones por género y por artista, contar ocurrencias, encontrar el máximo y decidir qué hacer ante empates de forma consistente cada vez que se re-renderiza. Es la primera historia donde el estado no se "recorre y suma", sino que hay que transformarlo en una estructura intermedia (conteos) antes de mostrar un resultado, y eso incrementa la posibilidad de bugs sutiles si el criterio de desempate no queda bien definido desde el principio.