import { createDiv, createInput, createLabel } from "./elements.js";
import { checkIsDirty } from "./utils.js";


function textFieldFactory(context = {}) {
    const { formModel, apiModel, dirtyFields } = context;

    return (fieldName, fieldLabelText) => {
        const input = createInput({
            className: "input",
            attrs: {
                value: formModel[fieldName],
                id: fieldName,
            },
            onInput(ev) {
                formModel[fieldName] = ev.target.value.trim();
                if (checkIsDirty(ev.target, formModel[fieldName], apiModel[fieldName])) {
                    dirtyFields.push(ev.target.id);
                } else {
                    dirtyFields.splice(dirtyFields.indexOf(ev.target.id), 1);
                }
            }
        });

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

function abilityFieldFactory({ formModel, apiModel, dirtyFields } = {}) {
    return (fieldName, fieldLabelText) => {
        const fieldLabel = createLabel({
            text: fieldLabelText,
            className: "label label--bold",
        });

        const scoreInput = createInput({
            className: "input",
            style: {
                width: "80px"
            },
            attrs: {
                value: formModel[fieldName].score,
                id: `${fieldName}-score`,
                placeholder: "score",
            },
            onInput(ev) {
                formModel[fieldName].score = ev.target.value.trim();
                if (checkIsDirty(ev.target, formModel[fieldName].score, apiModel[fieldName].score)) {
                    dirtyFields.push(ev.target.id);
                } else {
                    dirtyFields.splice(dirtyFields.indexOf(ev.target.id), 1);
                }
            }
        });

        const modifierInput = createInput({
            className: "input input--bold",
            style: {
                width: "50px",
            },
            attrs: {
                value: formModel[fieldName].modifier,
                id: `${fieldName}-modifier`,
                placeholder: "mod"
            },
            onInput(ev) {
                formModel[fieldName].modifier = ev.target.value.trim();
                if (checkIsDirty(ev.target, formModel[fieldName].modifier, apiModel[fieldName].modifier)) {
                    dirtyFields.push(ev.target.id);
                } else {
                    dirtyFields.splice(dirtyFields.indexOf(ev.target.id), 1);
                }
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

function proficiencyFieldFactory({ formModel, apiModel, dirtyFields } = {}) {
    return (fieldName, fieldLabelText) => {
        const fieldLabel = createLabel({
            className: "label label--bold",
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
                if (checkIsDirty(ev.target, formModel[fieldName].proficient, apiModel[fieldName].proficient)) {
                    dirtyFields.push(ev.target.id);
                } else {
                    dirtyFields.splice(dirtyFields.indexOf(ev.target.id), 1);
                }
            }
        });

        proficientInput.checked = formModel[fieldName].proficient;

        const modifierInput = createInput({
            className: "input",
            attrs: {
                value: formModel[fieldName].modifier,
                id: `${fieldName}-modifier`,
            },
            onInput(ev) {
                formModel[fieldName].modifier = ev.target.value.trim();
                if (checkIsDirty(ev.target, formModel[fieldName].modifier, apiModel[fieldName].modifier)) {
                    dirtyFields.push(ev.target.id);
                } else {
                    dirtyFields.splice(dirtyFields.indexOf(ev.target.id), 1);
                }
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

export { textFieldFactory, abilityFieldFactory, proficiencyFieldFactory };
