(() => {
  const TASKS_KEY = "todoTasks";
  const CONTROLS_KEY = "todoControlsVisible";
  const SETTINGS_KEY = "todoSettings";
  const hasSE = typeof SE_API !== "undefined";
  const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
  const DEFAULT_BG_HEX = "#0f0f23";
  const DEFAULT_BG_OPACITY = 85;
  const DEFAULT_LANG = "en";
  const DEFAULT_TEXT_MODE = "white";

  const I18N = {
    es: {
      inputLabel: "Nueva tarea",
      inputPlaceholder: "Nueva tarea...",
      addBtn: "Agregar",
      toggleBtnLabel: "Mostrar u ocultar controles",
      settingsBtnLabel: "Configurar colores",
      checkboxLabel: "Marcar tarea como completada",
      deleteBtnLabel: "Eliminar tarea",
      languageLabel: "Idioma",
      languageAriaLabel: "Idioma de la interfaz",
      bgLabel: "Fondo",
      bgPickerLabel: "Selector de color de fondo",
      bgHexLabel: "Hex de color de fondo",
      opacityLabel: "Opacidad",
      opacityAriaLabel: "Opacidad del fondo",
      buttonLabel: "Botón",
      buttonPickerLabel: "Selector de color del botón",
      buttonHexLabel: "Hex de color del botón",
      textLabel: "Texto",
      textAriaLabel: "Color del texto",
      textBlack: "Negro",
      textWhite: "Blanco",
      sizeLabel: "Tamaño",
      sizeAriaLabel: "Tamaño de fuente",
    },
    en: {
      inputLabel: "New task",
      inputPlaceholder: "New task...",
      addBtn: "Add",
      toggleBtnLabel: "Show or hide controls",
      settingsBtnLabel: "Configure colors",
      checkboxLabel: "Mark task as complete",
      deleteBtnLabel: "Delete task",
      languageLabel: "Language",
      languageAriaLabel: "Interface language",
      bgLabel: "Background",
      bgPickerLabel: "Background color picker",
      bgHexLabel: "Background color hex",
      opacityLabel: "Opacity",
      opacityAriaLabel: "Background opacity",
      buttonLabel: "Button",
      buttonPickerLabel: "Button color picker",
      buttonHexLabel: "Button color hex",
      textLabel: "Text",
      textAriaLabel: "Text color",
      textBlack: "Black",
      textWhite: "White",
      sizeLabel: "Size",
      sizeAriaLabel: "Font size",
    },
  };

  const CHECK_ICON_SVG =
    '<svg class="todo-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  const TRASH_ICON_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>';

  const widgetEl = document.getElementById("todo-widget");
  const titleEl = document.getElementById("todo-title");
  const toggleBtn = document.getElementById("todo-toggle-btn");
  const inputRowEl = document.getElementById("todo-input-row");
  const inputEl = document.getElementById("todo-input");
  const addBtn = document.getElementById("todo-add-btn");
  const listEl = document.getElementById("todo-list");

  const settingsBtn = document.getElementById("todo-settings-btn");
  const settingsPanel = document.getElementById("todo-settings-panel");
  const bgPicker = document.getElementById("todo-bg-color-picker");
  const bgText = document.getElementById("todo-bg-color-text");
  const bgOpacityInput = document.getElementById("todo-bg-opacity");
  const bgOpacityValueEl = document.getElementById("todo-bg-opacity-value");
  const accentPicker = document.getElementById("todo-accent-color-picker");
  const accentText = document.getElementById("todo-accent-color-text");
  const textModeSelect = document.getElementById("todo-text-mode");
  const fontSizeInput = document.getElementById("todo-font-size");
  const fontSizeValueEl = document.getElementById("todo-font-size-value");
  const languageSelect = document.getElementById("todo-language");

  let tasks = [];
  let controlsVisible = true;
  let settingsVisible = false;
  let currentBgHex = DEFAULT_BG_HEX;
  let currentBgOpacity = DEFAULT_BG_OPACITY;
  let currentLang = DEFAULT_LANG;
  let settings = {
    backgroundColor: null,
    backgroundOpacity: null,
    accentColor: null,
    textColor: null,
    fontSize: null,
    language: null,
  };

  const prefersReducedMotion = () =>
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const normalizeHex = (hex) => {
    const clean = hex.trim().toLowerCase();
    if (!HEX_RE.test(clean)) return null;
    const body = clean.slice(1);
    return "#" + (body.length === 3 ? body.split("").map((c) => c + c).join("") : body);
  };

  const hexToRgba = (hex, alpha) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return null;
    const bigint = parseInt(normalized.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const storeGet = (key, fallback) => {
    if (hasSE) {
      return SE_API.store.get(key).then((value) => (value === undefined || value === null ? fallback : value));
    }
    try {
      const raw = localStorage.getItem(key);
      return Promise.resolve(raw === null ? fallback : JSON.parse(raw));
    } catch (e) {
      return Promise.resolve(fallback);
    }
  };

  const storeSet = (key, value) => {
    if (hasSE) {
      SE_API.store.set(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const loadTasks = () => storeGet(TASKS_KEY, []);

  const saveTasks = () => storeSet(TASKS_KEY, tasks);

  const makeId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);

  const buildTaskElement = (task) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (task.done ? " done" : "");
    li.dataset.id = task.id;

    const label = document.createElement("label");
    label.className = "todo-check";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-check-input";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", I18N[currentLang].checkboxLabel);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const box = document.createElement("span");
    box.className = "todo-check-box";
    box.innerHTML = CHECK_ICON_SVG;

    label.appendChild(checkbox);
    label.appendChild(box);

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "todo-delete-btn";
    deleteBtn.setAttribute("aria-label", I18N[currentLang].deleteBtnLabel);
    deleteBtn.innerHTML = TRASH_ICON_SVG;
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(label);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
  };

  const renderAll = () => {
    listEl.innerHTML = "";
    tasks.forEach((task) => listEl.appendChild(buildTaskElement(task)));
  };

  const addTask = () => {
    const text = inputEl.value.trim();
    if (!text) return;
    const task = { id: makeId(), text, done: false };
    tasks.push(task);
    inputEl.value = "";
    saveTasks();

    const li = buildTaskElement(task);
    if (!prefersReducedMotion()) {
      li.classList.add("entering");
      listEl.appendChild(li);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => li.classList.remove("entering"));
      });
    } else {
      listEl.appendChild(li);
    }
  };

  const toggleTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.done = !task.done;
    saveTasks();
    const li = listEl.querySelector(`[data-id="${id}"]`);
    if (li) li.classList.toggle("done", task.done);
  };

  const deleteTask = (id) => {
    const li = listEl.querySelector(`[data-id="${id}"]`);
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    if (!li) return;

    if (prefersReducedMotion()) {
      li.remove();
      return;
    }

    let removed = false;
    const cleanup = () => {
      if (removed) return;
      removed = true;
      li.remove();
    };
    li.addEventListener("transitionend", cleanup, { once: true });
    setTimeout(cleanup, 220);
    li.classList.add("removing");
  };

  const applyControlsVisibility = () => {
    inputRowEl.classList.toggle("hidden", !controlsVisible);
    toggleBtn.classList.toggle("open", controlsVisible);
    toggleBtn.setAttribute("aria-expanded", String(controlsVisible));
  };

  const toggleControls = () => {
    controlsVisible = !controlsVisible;
    applyControlsVisibility();
    storeSet(CONTROLS_KEY, controlsVisible);
  };

  const applySettingsPanelVisibility = () => {
    settingsPanel.classList.toggle("hidden", !settingsVisible);
    settingsBtn.classList.toggle("open", settingsVisible);
    settingsBtn.setAttribute("aria-expanded", String(settingsVisible));
  };

  const toggleSettingsPanel = () => {
    settingsVisible = !settingsVisible;
    applySettingsPanelVisibility();
  };

  const syncColorInputs = (pickerEl, textEl, hex) => {
    pickerEl.value = hex;
    textEl.value = hex;
  };

  const applyBackground = () => {
    widgetEl.style.background = hexToRgba(currentBgHex, currentBgOpacity / 100);
    widgetEl.style.setProperty("--todo-bg", currentBgHex);
    syncColorInputs(bgPicker, bgText, currentBgHex);
    bgOpacityInput.value = currentBgOpacity;
    bgOpacityValueEl.textContent = currentBgOpacity + "%";
  };

  const applyAccentColor = (hex) => {
    widgetEl.style.setProperty("--todo-accent", hex);
    syncColorInputs(accentPicker, accentText, hex);
  };

  const applyTextMode = (mode) => {
    widgetEl.style.setProperty("--todo-text", mode === "black" ? "#000000" : "#ffffff");
    textModeSelect.value = mode;
  };

  const applyFontSize = (px) => {
    widgetEl.style.setProperty("--todo-font-size", px + "px");
    fontSizeInput.value = px;
    fontSizeValueEl.textContent = px + "px";
  };

  const applyLanguage = (lang) => {
    const dict = I18N[lang] || I18N[DEFAULT_LANG];
    currentLang = I18N[lang] ? lang : DEFAULT_LANG;

    widgetEl.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });
    widgetEl.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) el.placeholder = dict[key];
    });
    widgetEl.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.dataset.i18nAriaLabel;
      if (dict[key]) el.setAttribute("aria-label", dict[key]);
    });

    languageSelect.value = currentLang;
  };

  const setBackgroundColor = (hex) => {
    currentBgHex = hex;
    settings.backgroundColor = hex;
    applyBackground();
    storeSet(SETTINGS_KEY, settings);
  };

  const setBackgroundOpacity = (percent) => {
    currentBgOpacity = percent;
    settings.backgroundOpacity = percent;
    applyBackground();
    storeSet(SETTINGS_KEY, settings);
  };

  const setAccentColor = (hex) => {
    settings.accentColor = hex;
    applyAccentColor(hex);
    storeSet(SETTINGS_KEY, settings);
  };

  const setTextMode = (mode) => {
    settings.textColor = mode;
    applyTextMode(mode);
    storeSet(SETTINGS_KEY, settings);
  };

  const setFontSize = (px) => {
    settings.fontSize = px;
    applyFontSize(px);
    storeSet(SETTINGS_KEY, settings);
  };

  const setLanguage = (lang) => {
    settings.language = lang;
    applyLanguage(lang);
    renderAll();
    storeSet(SETTINGS_KEY, settings);
  };

  const handleHexTextChange = (textEl, currentHex, onValid) => {
    const normalized = normalizeHex(textEl.value);
    if (normalized) onValid(normalized);
    else textEl.value = currentHex;
  };

  const applyFields = (fieldData) => {
    if (!fieldData) return;
    if (fieldData.title) titleEl.textContent = fieldData.title;
    if (fieldData.backgroundColor) currentBgHex = normalizeHex(fieldData.backgroundColor) || currentBgHex;
    if (fieldData.textColor) widgetEl.style.setProperty("--todo-text", fieldData.textColor);
    if (fieldData.accentColor) applyAccentColor(fieldData.accentColor);
    if (fieldData.fontSize) widgetEl.style.setProperty("--todo-font-size", fieldData.fontSize + "px");
  };

  const init = (fieldData) => {
    applyFields(fieldData);
    Promise.all([loadTasks(), storeGet(CONTROLS_KEY, true), storeGet(SETTINGS_KEY, null)]).then(
      ([loadedTasks, loadedVisible, loadedSettings]) => {
        tasks = loadedTasks;
        controlsVisible = loadedVisible;
        applyControlsVisibility();

        settings = {
          backgroundColor: null,
          backgroundOpacity: null,
          accentColor: null,
          textColor: null,
          fontSize: null,
          language: null,
          ...(loadedSettings || {}),
        };

        applyLanguage(settings.language || DEFAULT_LANG);
        renderAll();

        currentBgHex = settings.backgroundColor || currentBgHex;
        currentBgOpacity = settings.backgroundOpacity || DEFAULT_BG_OPACITY;
        applyBackground();

        if (settings.accentColor) applyAccentColor(settings.accentColor);
        else syncColorInputs(accentPicker, accentText, normalizeHex(getComputedStyle(widgetEl).getPropertyValue("--todo-accent")) || "#7c3aed");

        applyTextMode(settings.textColor || DEFAULT_TEXT_MODE);

        if (settings.fontSize) applyFontSize(settings.fontSize);
        else {
          const current = parseInt(getComputedStyle(widgetEl).getPropertyValue("--todo-font-size"), 10);
          applyFontSize(Number.isNaN(current) ? 15 : current);
        }
      }
    );
  };

  addBtn.addEventListener("click", addTask);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
  toggleBtn.addEventListener("click", toggleControls);
  settingsBtn.addEventListener("click", toggleSettingsPanel);

  bgPicker.addEventListener("input", (e) => setBackgroundColor(e.target.value));
  bgText.addEventListener("change", () => handleHexTextChange(bgText, currentBgHex, setBackgroundColor));
  bgOpacityInput.addEventListener("input", (e) => setBackgroundOpacity(Number(e.target.value)));

  accentPicker.addEventListener("input", (e) => setAccentColor(e.target.value));
  accentText.addEventListener("change", () =>
    handleHexTextChange(accentText, settings.accentColor || accentPicker.value, setAccentColor)
  );

  textModeSelect.addEventListener("change", (e) => setTextMode(e.target.value));
  fontSizeInput.addEventListener("input", (e) => setFontSize(Number(e.target.value)));
  languageSelect.addEventListener("change", (e) => setLanguage(e.target.value));

  if (hasSE) {
    window.addEventListener("onWidgetLoad", (obj) => {
      init(obj.detail.fieldData);
    });
  } else {
    init(null);
  }
})();
