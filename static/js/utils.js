
function deepCopy(obj) {
    if (obj === null) {
        return null;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(x => deepCopy(x));
    }

    if (typeof obj === "object" && obj !== null) {
        return Object.entries(obj).reduce((accum, [key, value]) => {
            accum[key] = deepCopy(value)
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

function checkIsDirty(input, formValue, apiValue) {
    if (formValue !== apiValue) {
        input.classList.add("dirty");
    } else {
        input.classList.remove("dirty");
    }
}

export { deepCopy, classify, stylize, checkIsDirty };
