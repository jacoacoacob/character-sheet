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

    children.forEach((child) => {
        div.appendChild(child)
    });

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

export { createDiv, createHeader, createInput, createLabel };
