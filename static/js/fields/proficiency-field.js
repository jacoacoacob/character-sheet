import { createDiv, createInput, createLabel } from "../elements.js";
import { checkIsDirty } from "../utils.js";

function proficiencyFieldFactory({ formModel, apiModel, dirtyFields }) {
    return (fieldName, fieldLabelText) => {
        const fieldLabel = createLabel({
            className: "label label label--bold",
            text: fieldLabelText
        });

        const proficientInput = createInput({
            attrs: {
                type: "checkbox",
                id: `${fieldName}-proficient`,
                title: `Check if proficient in ${fieldLabelText.replace(/\(\w*\)/, "")}`,
            },
            onInput(ev) {
                formModel[fieldName].proficient = ev.target.checked;
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].proficient,
                    apiModel[fieldName].proficient,
                    dirtyFields
                );
            }
        });

        proficientInput.checked = formModel[fieldName].proficient;

        const modifierInput = createInput({
            className: "input input--w-4",
            attrs: {
                value: formModel[fieldName].modifier,
                id: `${fieldName}-modifier`,
                placeholder: "mod",
            },
            onInput(ev) {
                formModel[fieldName].modifier = ev.target.value.trim();
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].modifier,
                    apiModel[fieldName].modifier,
                    dirtyFields
                );
            }
        });

        return createDiv({
            className: "space-y-2",
            children: [
                fieldLabel,
                createDiv({
                    className: "space-x-3",
                    children: [
                        proficientInput,
                        modifierInput,
                    ]
                }),
            ],
        });
    };
}

export { proficiencyFieldFactory };
