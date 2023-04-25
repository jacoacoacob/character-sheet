import { createDiv, createInput, createLabel } from "../elements.js";

/**
 * 
 * @param {import("../main.js").Context} context 
 * @returns 
 */
function proficiencyFieldFactory(context) {
    const { formModel, apiModel, dirtyFields } = context;

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
                dirtyFields.check(
                    ev.target,
                    formModel[fieldName].proficient,
                    apiModel[fieldName].proficient,
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
                dirtyFields.check(
                    ev.target,
                    formModel[fieldName].modifier,
                    apiModel[fieldName].modifier,
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
