
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

function clearElement(elem) {
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
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

    const _watchers = [];

    return {
        get data() {
            return _data;
        },
        update(data) {
            _data = data;
            _watchers.forEach((watcher) => {
                watcher(_data);
            });
        },
        watch(callback, opts) {
            _watchers.push(callback);
            if (opts.isEager) {
                callback(_data);
            }
        }
    }
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
    naiveDeepCopy,
    classify,
    stylize,
    useWatch,
};
