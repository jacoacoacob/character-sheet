import { createDiv, createInput, createLabel } from "../elements.js";

/**
 * 
 * @param {import("../main.js").Context} context 
 * @returns 
 */
function abilityFieldFactory(context) {
    const { formModel, apiModel, dirtyFields } = context;
    
    return (fieldName, fieldLabelText) => {
        const fieldLabel = createLabel({
            text: fieldLabelText,
            className: "label label--bold",
        });

        const scoreInput = createInput({
            className: "input input--w-2",
            attrs: {
                value: formModel[fieldName].score,
                id: `${fieldName}-score`,
                placeholder: "score",
            },
            onInput(ev) {
                formModel[fieldName].score = ev.target.value.trim();
                dirtyFields.check(
                    ev.target,
                    formModel[fieldName].score,
                    apiModel[fieldName].score,
                )
            }
        });

        const modifierInput = createInput({
            className: "input input--w-1 input--bold",
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
                    className: "flex align-center space-x-2",
                    children: [
                        scoreInput,
                        modifierInput,
                    ],
                }),
            ],
        });
    };
}

export { abilityFieldFactory };
