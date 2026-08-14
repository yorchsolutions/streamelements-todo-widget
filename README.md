**[Español](#-to-do-widget-para-streamelements) | [English](#-to-do-widget-for-streamelements)**

# ✅ To-Do Widget para StreamElements

Un checklist simple para tu overlay de stream. Agregá tareas, marcalas como
completadas y eliminalas, todo desde una lista prolija que tu audiencia puede
ver en pantalla mientras streameás.

No hace falta saber programar para instalarlo: son unos pocos pasos de
copiar y pegar dentro del editor de StreamElements. Más abajo tenés la guía
completa.

- 🌐 **Español e inglés incluidos** — cambiá el idioma de toda la interfaz
  con un clic, sin reinstalar nada.
- 🎨 Colores, tamaño de fuente y fondo personalizables desde el panel de
  configuración.

![Vista previa del widget](assets/preview.png)

## 🔒 Seguridad y transparencia

Este widget está pensado para que lo instales con confianza:

- **No se conecta a internet.** No hace llamadas a servidores externos, no
  hay APIs de terceros ni servicios ocultos: todo el código corre en tu
  propio navegador.
- **No recolecta datos.** No hay analytics, no hay tracking, no hay
  publicidad. Nadie más que vos ve tus tareas.
- **Tus tareas quedan guardadas solo en tu cuenta.** El widget usa el
  almacenamiento propio de StreamElements (`SE_API.store`) para guardar la
  lista, de la misma forma en que StreamElements guarda el resto de tus
  configuraciones.
- **Es de código abierto.** Todo lo que hace el widget está en los archivos
  de este repositorio (`widget.html`, `widget.css`, `widget.js`). Podés
  revisarlo línea por línea antes de instalarlo, o pedirle a alguien de
  confianza que lo revise por vos.

## 📦 Qué incluye este repositorio

| Archivo | Para qué sirve |
| --- | --- |
| `widget.html` | La estructura del widget. Se pega en la pestaña **HTML**. |
| `widget.css` | El diseño y los estilos visuales. Se pega en la pestaña **CSS**. |
| `widget.js` | La lógica que hace funcionar el checklist. Se pega en la pestaña **JS**. |
| `fields.json` | Las opciones configurables (título, colores, tamaño de fuente) que StreamElements muestra en la pestaña **Fields**. |
| `preview.html` | Una versión de prueba para ver el widget funcionando en cualquier navegador, sin necesidad de StreamElements. |

## 🧪 Probarlo antes de instalar

Si querés ver cómo funciona antes de meterte en StreamElements:

1. Abrí el archivo `preview.html` haciendo doble click (se abre en tu
   navegador).
2. Escribí una tarea en el campo de texto y presioná **Agregar** (o Enter).
3. Marcá el casillero de una tarea para tacharla como completada.
4. Usá el ícono de tacho para eliminarla.
5. Recargá la página: la lista sigue ahí, porque queda guardada en tu
   navegador.
6. Hacé click en el ícono de engranaje (⚙) del encabezado para abrir el
   panel de configuración: podés cambiar el idioma (Español/English), el
   color y la opacidad del fondo, el color del botón "Agregar", el color del
   texto y el tamaño de la letra. Los cambios se ven al instante y quedan
   guardados.

## 🚀 Instalarlo en StreamElements

1. En el editor de overlays de StreamElements, andá a **Add Widget →
   Static/Custom → Custom Widget**.
2. Abrí el widget recién creado para editarlo y pegá el contenido de cada
   archivo en la pestaña que corresponde:
   - `widget.html` → pestaña **HTML**
   - `widget.css` → pestaña **CSS**
   - `widget.js` → pestaña **JS**
3. En la pestaña **Fields**, cambiá a la vista de editor JSON (ícono `</>`)
   y pegá el contenido de `fields.json`. Guardá y volvé a la vista normal:
   ahí vas a poder ajustar el título y los colores desde controles visuales
   si preferís no tocar el código.
4. Guardá el widget y agregalo a tu escena en OBS (o el software que uses)
   como fuente de navegador.

## 🎮 Usarlo durante el stream

- Para agregar, marcar o eliminar tareas mientras estás en vivo, hacé click
  derecho sobre la fuente de navegador en OBS y elegí **Interact**.
- Tus tareas se guardan automáticamente con el sistema de almacenamiento de
  StreamElements, así que van a seguir ahí aunque recargues la fuente o
  reinicies OBS.

## 📄 Licencia

Este widget es **gratuito** y de código abierto. Podés usarlo y modificarlo
libremente, pero **no está permitido venderlo ni cobrar por él**. Si te
resulta útil, se agradece (aunque no es obligatorio) que menciones o
recomiendes este repositorio. Los detalles completos están en
[LICENSE.md](LICENSE.md).

---

**[Español](#-to-do-widget-para-streamelements) | [English](#-to-do-widget-for-streamelements)**

# ✅ To-Do Widget for StreamElements

A simple checklist for your stream overlay. Add tasks, check them off, and
delete them, all from a clean list your audience can see on screen while
you stream.

You don't need to know how to code to install it: it's just a few
copy-paste steps inside the StreamElements editor. The full guide is
below.

- 🌐 **Spanish and English built in** — switch the entire interface
  language with one click, no reinstalling needed.
- 🎨 Customizable colors, font size, and background from the settings
  panel.

![Widget preview](assets/preview.png)

## 🔒 Security and transparency

This widget is built so you can install it with confidence:

- **No internet connection required.** It makes no calls to external
  servers, there are no third-party APIs or hidden services: all the code
  runs in your own browser.
- **No data collection.** No analytics, no tracking, no ads. No one but
  you can see your tasks.
- **Your tasks are only saved to your own account.** The widget uses
  StreamElements' own storage (`SE_API.store`) to save the list, the same
  way StreamElements saves the rest of your settings.
- **Fully open source.** Everything the widget does is in the files of
  this repository (`widget.html`, `widget.css`, `widget.js`). You can
  review it line by line before installing it, or have someone you trust
  review it for you.

## 📦 What's in this repository

| File | What it's for |
| --- | --- |
| `widget.html` | The widget's markup. Paste it into the **HTML** tab. |
| `widget.css` | The visual design and styles. Paste it into the **CSS** tab. |
| `widget.js` | The logic that makes the checklist work. Paste it into the **JS** tab. |
| `fields.json` | The configurable options (title, colors, font size) shown in StreamElements' **Fields** tab. |
| `preview.html` | A standalone version to test the widget in any browser, without needing StreamElements. |

## 🧪 Try it before installing

Want to see how it works before setting it up in StreamElements?

1. Open `preview.html` by double-clicking it (it opens in your browser).
2. Type a task in the text field and press **Add** (or Enter).
3. Check a task's checkbox to mark it as complete.
4. Use the trash icon to delete it.
5. Reload the page: the list is still there, because it's saved in your
   browser.
6. Click the gear icon (⚙) in the header to open the settings panel: you
   can change the language (Español/English), the background color and
   opacity, the "Add" button color, the text color, and the font size.
   Changes apply live and are saved automatically.

## 🚀 Installing it on StreamElements

1. In the StreamElements overlay editor, go to **Add Widget → Static/Custom
   → Custom Widget**.
2. Open the newly created widget to edit it and paste each file's content
   into the matching tab:
   - `widget.html` → **HTML** tab
   - `widget.css` → **CSS** tab
   - `widget.js` → **JS** tab
3. In the **Fields** tab, switch to the JSON editor view (the `</>` icon)
   and paste the content of `fields.json`. Save and go back to the normal
   view: from there you can adjust the title and colors with visual
   controls if you'd rather not touch the code.
4. Save the widget and add it to your scene in OBS (or whichever software
   you use) as a browser source.

## 🎮 Using it during your stream

- To add, check, or delete tasks while you're live, right-click the
  browser source in OBS and choose **Interact**.
- Your tasks are saved automatically through StreamElements' storage
  system, so they'll still be there even if you reload the source or
  restart OBS.

## 📄 License

This widget is **free** and open source. You can use and modify it freely,
but **selling it or charging for it is not allowed**. If you find it
useful, mentioning or recommending this repository is appreciated (though
not required). Full details are in [LICENSE.md](LICENSE.md).
