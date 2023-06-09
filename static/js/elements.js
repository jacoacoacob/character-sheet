import { classify, stylize, attribute } from "./utils.js";

/**
 * @param {{
 *  className?: string;
 *  attrs: Record<string, *>;
 *  style?: ElementCSSInlineStyle["style"];
 *  children?: HTMLElement[];
 * }} param0
 */
function createDiv({ className = "", attrs = {}, style = {}, children = [] } = {}) {
    const div = document.createElement("div");

    classify(className, div);

    stylize(style, div);

    attribute(attrs, div);

    div.append(...children.filter(Boolean))

    return div;
}

/**
 * @param {{
 *  className?: string;
 *  attrs: Record<string, *>;
 *  style?: ElementCSSInlineStyle["style"];
 *  children?: HTMLElement[];
 * }} param0
 */
function createSpan({ className = "", attrs = {}, style = {}, children = [] } = {}) {
    const span = document.createElement("span");

    classify(className, span);

    stylize(style, span);

    attribute(attrs, span);

    span.append(...children.filter(Boolean))

    return span;
}

/**
 * @param {{
 *  className?: string;
 *  attrs: Record<string, *>;
 *  style?: ElementCSSInlineStyle["style"];
 *  children?: HTMLElement[];
 * }} param0
 */
function createParagraph({ className = "", attrs = {}, style = {}, children = [] } = {}) {
    const p = document.createElement("p");

    classify(className, p);

    stylize(style, p);

    attribute(attrs, p);

    p.append(...children.filter(Boolean))

    return p;
}

/**
 * @param {{
*  className?: string;
*  attrs: Record<string, *>;
*  style?: ElementCSSInlineStyle["style"];
*  children?: HTMLElement[];
* }} param0
*/
function createList({ className = "", attrs = {}, style = {}, children = [] } = {}) {
   const list = document.createElement("ul");

   classify(className, list);

   stylize(style, list);

   attribute(attrs, list);

   list.append(...children);

   return list;
}

/**
* @param {{
*  className?: string;
*  attrs: Record<string, *>;
*  style?: ElementCSSInlineStyle["style"];
*  children?: HTMLElement[];
* }} param0
*/
function createListItem({ className = "", attrs = {}, style = {}, children = [] } = {}) {
    const li = document.createElement("li");

    classify(className, li);

    stylize(style, li);

    attribute(attrs, li);

    li.append(...children);

    return li;
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
 *  autoSize?: boolean; 
 *  className: string;
 *  initialValue?: string;
 *  style: ElementCSSInlineStyle["style"];
 *  attrs: Record<string, *>;
 *  onInput: (ev: InputEvent) => void;
 * }} param0
 */
function createTextarea({ initialValue, autoSize = false, className = "", style = {}, attrs = {}, onInput = () => void 0 } = {}) {
    const textarea = document.createElement("textarea");

    const DEFAULT_HEIGHT = 64;

    classify(className, textarea);

    stylize({ height: DEFAULT_HEIGHT + "px", ...style }, textarea);

    attribute(attrs, textarea);

    const INITIAL_HEIGHT = Number.parseInt(textarea.style.height.replace("px", "").trim());
    const MAX_HEIGHT = typeof textarea.style.maxHeight === "undefined"
        ? null
        : Number.parseInt(textarea.style.maxHeight.replace("px", "").trim());

    if (typeof initialValue === "string") {
        textarea.value = initialValue;
        setTimeout(() => {
            if (autoSize) {
                doAutoSize();
            }
        });
    }

    textarea.addEventListener("input", (ev) => {
        if (autoSize) {
            doAutoSize();
        }
        onInput(ev);
    });

    function doAutoSize() {
        textarea.style.overflow = "hidden";
        if (typeof MAX_HEIGHT === "number" && textarea.scrollHeight > MAX_HEIGHT) {
            textarea.style.overflow = "auto"
        }
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

function createHeading(level, text) {
    const header = document.createElement("h" + level);

    header.textContent = text;

    return header;
}

/**
 * @param {{
 *  text?: string;
 *  innerHTML?: string;
 *  children?: HTMLElement[];
 *  className?: string;
 *  style?: ElementCSSInlineStyle["style"];
 *  attrs?: Record<string, *>;
 *  onClick: (ev: MouseEvent, self: HTMLButtonElement) => void;
 * }} param0
 */
function createButton({
    text = "",
    innerHTML = "",
    children = [],
    attrs = {},
    className = "",
    style = {},
    onClick = () => void 0
} = {}) {
    const button = document.createElement("button");

    attribute({ type: "button", ...attrs }, button);
    classify(className, button);
    stylize(style, button);

    if (innerHTML) {
        button.innerHTML = innerHTML;
    } else if (text) {
        button.textContent = text;
    } else if (children) {
        button.append(...children);
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


export { createButton, createParagraph, createDiv, createSpan, createList, createListItem, createForm, createHeading, createInput, createLabel, createTextarea };
