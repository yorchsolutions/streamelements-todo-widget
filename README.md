# To-Do Widget para StreamElements

Checklist con casillas para agregar, marcar y eliminar tareas, pensado como
**Custom Widget** de StreamElements (overlay).

## Archivos

- `widget.html` — markup a pegar en la pestaña **HTML**.
- `widget.css` — estilos a pegar en la pestaña **CSS**.
- `widget.js` — lógica a pegar en la pestaña **JS**.
- `fields.json` — definición de campos configurables, para el editor JSON de la pestaña **Fields**.
- `preview.html` — versión standalone para probar el widget en cualquier navegador (usa `localStorage` en vez de `SE_API.store`).

## Probar localmente

1. Abrí `preview.html` en el navegador (doble click, o `file:///.../to-do-list-overlay/preview.html`).
2. Agregá tareas con el input + botón "Agregar" (o Enter).
3. Marcá el checkbox de una tarea para tacharla.
4. Usá el botón de tacho para eliminarla.
5. Recargá la página: las tareas deben seguir ahí (persistidas en `localStorage`).
6. Click en el ícono de engranaje (⚙) del header para abrir el panel de configuración: idioma (Español/English, traduce toda la interfaz), color y opacidad del fondo, color del botón "Agregar", modo de texto (negro/blanco/predeterminado) y tamaño de fuente. Todo se aplica en vivo y queda guardado.

## Instalar en StreamElements

1. En el editor de overlays de StreamElements: **Add Widget → Static/Custom → Custom Widget**.
2. Abrí el widget para editarlo y pegá el contenido de cada archivo en su pestaña correspondiente:
   - `widget.html` → pestaña **HTML**
   - `widget.css` → pestaña **CSS**
   - `widget.js` → pestaña **JS**
3. En la pestaña **Fields**, cambiá a la vista de editor JSON (ícono `</>`) y pegá el contenido de `fields.json`. Guardá y volvé a la vista normal para ajustar título y colores desde ahí si querés.
4. Guardá el widget y agregalo a tu escena de OBS/StreamElements como fuente de navegador.
5. Para interactuar con el checklist durante el stream (agregar/marcar/eliminar), hacé click derecho sobre la fuente de navegador en OBS → **Interact**.
6. Las tareas se guardan con `SE_API.store`, por lo que persisten aunque recargues la fuente o reinicies OBS.
