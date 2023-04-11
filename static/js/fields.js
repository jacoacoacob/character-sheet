import {
    createDiv,
    createCol,
    createField,
    createHeader,
    createInput,
    createLabel,
    createRow,
} from "./elements.js";
import { checkIsDirty } from "./utils.js";


function textFieldFactory(formModel, apiModel) {
    return (fieldName, fieldLabelText) => {
        const input = createInput({
            className: "input",
            attrs: {
                value: formModel[fieldName],
                id: fieldName,
            },
            onInput(ev) {
                formModel[fieldName] = ev.target.value.trim();
                checkIsDirty(
                    ev.target,
                    formModel[fieldName],
                    apiModel[fieldName]
                );
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

function abilityFieldFactory(formModel, apiModel) {
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
            className: "label"
        });

        const modifierInput = createInput({
            className: "input input--bold",
            style: {
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
            className: "label"
        });

        return createDiv({
            children: [
                fieldLabel,
                createDiv({
                    className: "flex align-center space-x-2",
                    children: [
                        createDiv({
                            className: "flex flex-col",
                            children: [scoreInputLabel, scoreInput],
                        }),
                        createField({
                            className: "flex flex-col",
                            children: [modifierInputLabel, modifierInput],
                        }),
                    ],
                }),
            ],
        });
    };
}

function proficiencyFieldFactory(formModel, apiModel) {
    return (fieldName, fieldLabelText) => {
        const fieldLabel = createLabel({
            className: "label label--bold",
            text: fieldLabelText
        });

        const proficientInput = createInput({
            attrs: {
                type: "checkbox",
                value: formModel[fieldName].proficient,
                id: `${fieldName}-proficient`,
                title: `Check if proficient in ${fieldLabelText}`,
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

        const modifierInput = createInput({
            className: "input",
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
