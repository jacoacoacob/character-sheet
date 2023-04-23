import { classify, stylize, attribute } from "./utils.js";

/**
 * @param {{
 *  className?: string;
 *  style?: ElementCSSInlineStyle["style"];
 *  children?: HTMLElement[];
 * }} param0
 */
function createDiv({ className = "", style = {}, children = [] } = {}) {
    const div = document.createElement("div");

    classify(className, div);

    stylize(style, div);

    div.append(...children.filter(Boolean))

    return div;
}


/**
 * @param {{
 *  className: string;
 *  style: ElementCSSInlineStyle["style"];
 *  attrs: Record<string, *>;
 *  onInput: (ev: InputEvent) => void;
 * }} param0
 */
function createInput({ className = "", style = {}, attrs = {}, onInput = () => void 0 } = {}) {
    const input = document.createElement("input");

    classify(className, input);

    stylize(style, input);

    attribute(attrs, input);

    input.addEventListener("input", onInput);

    return input;
}

/**
 * @param {{
 *  className: string;
 *  style: ElementCSSInlineStyle["style"];
 *  attrs: Record<string, *>;
 *  onInput: (ev: InputEvent) => void;
 * }} param0
 */
function createTextarea({ className = "", style = {}, attrs = {}, onInput = () => void 0 } = {}) {
    const textarea = document.createElement("textarea");

    const DEFAULT_HEIGHT = 64;

    classify(`textarea ${className}`.trim(), textarea);

    stylize({ height: DEFAULT_HEIGHT + "px", ...style }, textarea);

    attribute(attrs, textarea);

    const INITIAL_HEIGHT = Number.parseInt(textarea.style.height.replace("px", "").trim());

    function autoSizeHeight() {
        if (textarea.scrollHeight > INITIAL_HEIGHT) {
            const scrollLeft = window.scrollX;
            const scrollTop = window.scrollY;
            textarea.style.height = 0;
            textarea.style.height = textarea.scrollHeight + 10 + "px";
            window.scrollTo(0, 0);
            window.scrollTo(scrollLeft, scrollTop);
        } else {
            textarea.style.height = INITIAL_HEIGHT + "px";
        }
    }

    textarea.addEventListener("input", (ev) => {
        autoSizeHeight(ev);
        onInput(ev);
    });

    return textarea;
}


/**
 * @param {{
*  className: string;
*  style: ElementCSSInlineStyle["style"];
*  text: string;
*  forId?: string;
* }} param0
*/
function createLabel({ className = "", style = {}, text = "", forId = "" } = {}) {
    const label = document.createElement("label");

    classify(className, label);

    stylize(style, label);

    label.textContent = text;
    label.setAttribute("for", forId);

    return label;
}

function createHeader(level, text) {
    const header = document.createElement("h" + level);

    header.textContent = text;

    return header;
}

/**
 * @param {{
 *  text?: string;
 *  innerHTML?: string;
 *  className?: string;
 *  style?: ElementCSSInlineStyle["style"];
 *  attrs?: Record<string, *>;
 *  onClick: (ev: MouseEvent, self: HTMLButtonElement) => void;
 * }} param0
 */
function createButton({ text = "", innerHTML = "", attrs = {}, className = "", style = {}, onClick = () => void 0 } = {}) {
    const button = document.createElement("button");

    attribute(attrs, button);
    classify(className, button);
    stylize(style, button);

    if (innerHTML) {
        button.innerHTML = innerHTML;
    } else {
        button.textContent = text;
    }

    button.addEventListener("click", (ev) => onClick(ev, button));

    return button;
}

/**
 * @param {{
 *  attrs?: Record<string, *>;
 *  className?: string;
 *  style?: ElementCSSInlineStyle["style"];
 *  children?: HTMLElement[];
 *  onSubmit: (ev: SubmitEvent) => void;
 * }} param0
 */
function createForm({
    className = "",
    attrs = {},
    style = {},
    children = [],
    onSubmit = () => void 0
} = {}) {
    const form = document.createElement("form");

    classify(className, form);
    stylize(style, form);
    attribute(attrs, form);

    form.addEventListener("submit", onSubmit);

    form.append(...children);

    return form;
}

export { createButton, createDiv, createForm, createHeader, createInput, createLabel, createTextarea };
