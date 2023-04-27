
function naiveDeepCopy(obj) {
    if (obj === null) {
        return null;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(x => naiveDeepCopy(x));
    }

    if (typeof obj === "object" && obj !== null) {
        return Object.entries(obj).reduce((accum, [key, value]) => {
            accum[key] = naiveDeepCopy(value)
            return accum;
        }, {});
    }

    return obj;
}

function classify(className, element) {
    className.split(" ").filter(Boolean).forEach((cls) => {
        element.classList.add(cls);
    })
}

function stylize(style, element) {
    Object.entries(style).forEach(([property, value]) => {
        element.style[property] = value;
    });
}

function attribute(attrs, element) {
    Object.entries(attrs).forEach(([attrName, attrValue]) => {
        element.setAttribute(attrName, attrValue);
    });
}

function createField(field, name, label) {
    if (typeof label === "string") {
        return field(name, label);
    }
    return field(
        name,
        name.split("_").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ")
    );
}

/**
 * 
 * @param {HTMLElement} elem 
 */
function clearElement(elem) {
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
}

/**
 * 
 * @param {HTMLElement} elem 
 * @param {HTMLElement} parent 
 */
function hasParent(elem, parent) {
    let parent_ = elem.parentElement;
    while (parent_.parentElement) {
        if (parent_ === parent) {
            return true;
        }
        parent_ = parent_.parentElement;
    }
    return false;
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
function isEnterKey(ev) {
    return ev.key === "Enter";
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
function isShiftKey(ev) {
    return ev.shiftKey;
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
function isCommandKey(ev) {
    return ev.metaKey || ev.ctrlKey;
}

/**
 * 
 * @param {KeyboardEvent} ev 
 * @param {string} letter 
 */
function isLetterKey(ev, letter) {
    return ev.key === letter.toLowerCase() || ev.key === letter.toUpperCase();
}

function isArrowKey(ev, direction) {
    return ev.key === `Arrow${direction[0].toUpperCase() + direction.slice(1).toLowerCase()}`;
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
function isTabKey(ev) {
    return ev.key === "Tab";
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
function isSKey(ev) {
    return ev.key === "s" || ev.key === "S";
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
function isCommandEnter(ev) {
    return isCommandKey(ev) && isEnterKey(ev);
}

/**
 * 
 * @param {KeyboardEvent} ev 
 */
function isCommandS(ev) {
    return isCommandKey(ev) && isSKey(ev);
}


function useWatch(initialData) {
    let _data = initialData;
    let _oldData = initialData;

    const _watchers = [];

    return {
        get data() {
            return _data;
        },
        update(data) {
            _oldData = _data;
            _data = data;
            _watchers.forEach((watcher) => {
                watcher(_data, _oldData);
            });
        },
        /**
         * 
         * @param {(data, prevData) => void} callback 
         * @param {{ isEager?: boolean }} opts 
         */
        watch(callback, { isEager = false } = {}) {
            _watchers.push(callback);
            if (isEager) {
                callback(_data, _oldData);
            }
        }
    }
}


/**
 * 
 * @param {HTMLElement} container 
 */
function createFocusTrap(container) {
    const selectors = [
        "[tabindex]",
        "a[href]",
        "button",
        "input",
        "select",
        "textarea",
    ]
    .map((selector) => `${selector}:not([tabindex="-1"])`)
    .join(",");

    const focusableElements = [];
    
    for (let elem of container.querySelectorAll(selectors)) {
        focusableElements.push(elem);
    }

    function cursor() {
        return focusableElements.indexOf(document.activeElement);
    }

    function focusNext() {
        const cur = cursor();
        if (cur === -1) {
            return;
        }
        if (cur === focusableElements.length - 1) {
            focusableElements[0].focus();
        } else {
            focusableElements[cur + 1].focus();
        }
    }

    function focusPrev() {
        const cur = cursor();
        if (cur === -1) {
            return;
        }
        if (cur === 0) {
            focusableElements[focusableElements.length - 1].focus();
        } else {
            focusableElements[cur - 1].focus();
        }
    }

    function focus(index) {
        if (focusableElements[index]) {
            focusableElements[index].focus();
        }
    }

    /**
     * 
     * @param {KeyboardEvent} ev 
     */
    function trapFocus(ev) {
        if (!isTabKey(ev)) {
            return;
        }

        if (isShiftKey(ev)) {
            focusPrev();
            ev.preventDefault();
        } else {
            focusNext();
            ev.preventDefault();
        }
    }

    return { trapFocus, focus };
}


export {
    clearElement,
    createField,
    attribute,
    isCommandKey,
    isEnterKey,
    isSKey,
    isShiftKey,
    isTabKey,
    isCommandEnter,
    isCommandS,
    isLetterKey,
    isArrowKey,
    naiveDeepCopy,
    classify,
    stylize,
    hasParent,
    useWatch,
    createFocusTrap,
};
