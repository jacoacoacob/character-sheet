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

    classify(className, textarea);

    stylize(style, textarea);

    attribute(attrs, textarea);

    textarea.addEventListener("input", onInput);

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
 *  innerHTML?: string;
 *  className?: string;
 *  style?: ElementCSSInlineStyle["style"];
 *  attrs?: Record<string, *>;
 *  onClick: (ev: MouseEvent, self: HTMLButtonElement) => void;
 * }} param0
 */
function createButton({ innerHTML = "", attrs = {}, className = "", style = {}, onClick = () => void 0 } = {}) {
    const button = document.createElement("button");

    attribute(attrs, button);
    classify(className, button);
    stylize(style, button);

    button.innerHTML = innerHTML;

    button.addEventListener("click", (ev) => onClick(ev, button));

    return button;
}

/**
 * @param {{
 *  className?: string;
 *  style?: ElementCSSInlineStyle["style"];
 *  children?: HTMLElement[];
 *  onSubmit: (ev: SubmitEvent) => void;
 * }} param0
 */
function createForm({
    className = "",
    style = {},
    children = [],
    onSubmit = () => void 0
} = {}) {
    
}


/**
 * @param {{
 *  className?: string;
 *  style?: ElementCSSInlineStyle["style"];
 *  children?: HTMLElement[];
 * }} param0
 */
function createDynamicDiv({
    attrs,
    className = "",
    style = {},
    children = [],
} = {}) {
    const elem = document.createElement("div");

    function updateChildren(...children) {
        while (elem.lastChild) {
            elem.removeChild(element.lastChild);
        }
        elem.append(children.filter(Boolean));
    }

    updateChildren(...children);

    attribute(attrs, elem);

    stylize(style, elem);

    className(className, elem);

    listeners.forEach(([type, listener]) => {
        elem.addEventListener(type, listener);
    });

    return { elem, updateChildren }
}

export { createButton, createDiv, createDynamicDiv, createForm, createHeader, createInput, createLabel, createTextarea };
