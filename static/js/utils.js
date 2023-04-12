
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

function checkIsDirty(input, formValue, apiValue, dirtyFields) {
    if (formValue !== apiValue) {
        input.classList.add("input--dirty");
        dirtyFields.push(input.id);
    } else {
        input.classList.remove("input--dirty");
        dirtyFields.splice(dirtyFields.indexOf(input.id), 1);
    }
}

export { createField, attribute, deepCopy, classify, stylize, checkIsDirty };
