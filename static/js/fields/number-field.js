import { createDiv, createInput, createLabel } from "../elements.js";
import { checkIsDirty, classify, stylize } from "../utils.js";

function numberFieldFactory({ formModel, apiModel, dirtyFields }) {
    return ({ className = "", style = {} } = {}) => (fieldName, fieldLabel) => {
        const input = createInput({
            className: "input input--w-3",
            attrs: {
                value: formModel[fieldName],
                id: fieldName,
                type: "number",
            },
            onInput(ev) {
                formModel[fieldName] = Number.parseInt(ev.target.value);
                checkIsDirty(
                    ev.target,
                    formModel[fieldName],
                    apiModel[fieldName],
                    dirtyFields
                );
            }
        });

        classify(className, input);
        stylize(style, input);

        const label = createLabel({
            className: "label label--bold",
            text: fieldLabel,
            forId: input.id,
        });

        return createDiv({
            className: "flex flex-col space-y-1",
            children: [label, input],
        });
    }
}


export { numberFieldFactory };
