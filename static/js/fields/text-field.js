import { createDiv, createInput, createLabel } from "../elements.js";
import { classify, stylize } from "../utils.js";

/**
 * 
 * @param {import("../main.js").Context} context 
 * @returns 
 */
function textFieldFactory({ formModel, apiModel, dirtyFields }) {
    return ({ className = "", style = {} } = {}) => (fieldName, fieldLabelText) => {
        const input = createInput({
            className: "input input--w-6",
            attrs: {
                value: formModel[fieldName],
                id: fieldName,
            },
            onInput(ev) {
                formModel[fieldName] = ev.target.value.trim();
                dirtyFields.check(
                    ev.target,
                    formModel[fieldName],
                    apiModel[fieldName],
                );
            }
        });

        classify(className, input);
        stylize(style, input);

        const label = createLabel({
            className: "label label--bold",
            text: fieldLabelText,
            forId: input.id,
        });

        return createDiv({
            className: "flex flex-col space-y-1",
            children: [
                label,
                input,
            ],
        });
    }
}

export { textFieldFactory };
