import { classify, stylize, checkIsDirty } from "./utils.js";

function containerFactory(wrapperClassName = "") {
    /**
     * @param {{
     *  className?: string;
     *  style?: ElementCSSInlineStyle["style"];
     *  children?: HTMLElement[];
     * }} param0
     */
    return ({ className = "", style = {}, children = [] } = {}) => {
        const field = document.createElement("div");
    
        classify(wrapperClassName, field);
        classify(className, field);

        stylize(style, field);
    
        children.forEach((child) => {
            field.appendChild(child)
        });
    
        return field;
    }
}

const createField = containerFactory("field");
const createRow = containerFactory("row");
const createCol = containerFactory("col");

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

    Object.entries(attrs).forEach(([attrName, attrValue]) => {
        input.setAttribute(attrName, attrValue);
    });

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


function abilityFieldFactory(formModel, apiModel) {
    return (fieldName, fieldLabelText) => {
        const fieldLabel = createLabel({ text: fieldLabelText });

        const scoreInput = createInput({
            style: {
                fontSize: "14px",
                width: "80px"
            },
            attrs: {
                value: formModel[fieldName].score,
                id: `${fieldName}-score`,
            },
            onInput(ev) {
                formModel[fieldName].score = ev.target.value.trim();
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].score,
                    apiModel[fieldName].score,
                );
            }
        });

        const scoreInputLabel = createLabel({
            text: "score",
            forId: scoreInput.id,
            style: {
                fontSize: "12px"
            },
        });

        const modifierInput = createInput({
            style: {
                fontSize: "14px",
                width: "50px",
            },
            attrs: {
                value: formModel[fieldName].modifier,
                id: `${fieldName}-modifier`,
            },
            onInput(ev) {
                formModel[fieldName].modifier = ev.target.value.trim();
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].modifier,
                    apiModel[fieldName].modifier
                );
            }
        });

        const modifierInputLabel = createLabel({
            text: "modifier",
            forId: modifierInput.id,
            style: {
                fontSize: "12px"
            },
        });

        return createField({
            children: [
                createRow({ children: [fieldLabel] }),
                createRow({
                    children: [
                        createCol({ children: [scoreInputLabel, scoreInput] }),
                        createCol({ children: [modifierInputLabel, modifierInput] }),
                    ],
                }),
            ],
        });
    };
}

function proficiencyFieldFactory(formModel, apiModel) {
    return (fieldName, fieldLabelText) => {
        const fieldLabel = createLabel({ text: fieldLabelText });

        const proficientInput = createInput({
            attrs: {
                type: "checkbox",
                value: formModel[fieldName].proficient,
                id: `${fieldName}-proficient`,
            },
            onInput(ev) {
                formModel[fieldName].proficient = ev.target.checked;
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].proficient,
                    apiModel[fieldName].proficient,
                );
            }
        });

        const proficientInputLabel = createLabel({
            text: "proficient",
            forId: proficientInput.id
        });

        const modifierInput = createInput({
            attrs: {
                value: formModel[fieldName].modifier,
                id: `${fieldName}-modifier`,
            },
            onInput(ev) {
                formModel[fieldName].modifier = ev.target.value.trim();
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].modifier,
                    apiModel[fieldName].modifier
                );
            }
        });

        const modifierInputLabel = createLabel({ text: "modifier", forId: modifierInput.id });

        return createField({
            children: [
                createRow({ children: [fieldLabel] }),
                createRow({
                    children: [
                        createCol({ children: [proficientInputLabel, proficientInput] }),
                        createCol({ children: [modifierInputLabel, modifierInput] }),
                    ]
                }),
            ],
        });
    };
}

export {
    createCol,
    createField,
    createHeader,
    createInput,
    createLabel,
    createRow,
    abilityFieldFactory,
    proficiencyFieldFactory,
};
