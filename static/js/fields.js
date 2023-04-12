import { createDiv, createInput, createLabel, createTextarea } from "./elements.js";
import { checkIsDirty, classify, stylize } from "./utils.js";


function textFieldFactory(context = {}) {
    const { formModel, apiModel, dirtyFields } = context;

    return ({ className = "", style = {} } = {}) => (fieldName, fieldLabelText) => {
        const input = createInput({
            className: "input input--w-6",
            attrs: {
                value: formModel[fieldName],
                id: fieldName,
            },
            onInput(ev) {
                formModel[fieldName] = ev.target.value.trim();
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

function numberFieldFactory({ formModel, apiModel, dirtyFields } ) {
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

function textareaFieldFactory({ formModel, apiModel, dirtyFields }) {
    return (fieldName, fieldLabel) => {
        const textarea = createTextarea({
            className: "textarea",
            style: {
                height: "288px",
                width: "100%"
            },
            attrs: {
                id: fieldName,
            },
            onInput(ev) {
                formModel[fieldName] = ev.target.value.trim();
                ev.target.style.height = 0;
                ev.target.style.height = ev.target.scrollHeight > 288
                    ? ev.target.scrollHeight + 10 + "px"
                    : "288px";
                checkIsDirty(
                    ev.target,
                    formModel[fieldName],
                    apiModel[fieldName],
                    dirtyFields
                );
            },
        });

        textarea.value = formModel[fieldName];

        const label = createLabel({
            className: "label label--bold",
            text: fieldLabel,
            forId: textarea.id,
        });

        return createDiv({
            className: "flex flex-col space-y-2",
            style: {
                width: "100%",
                position: "relative",
            },
            children: [label, textarea],
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
            className: "input input--w-6",
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
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].score,
                    apiModel[fieldName].score,
                    dirtyFields
                );
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
            className: "input input--w-1",
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

export {
    abilityFieldFactory,
    numberFieldFactory,
    proficiencyFieldFactory,
    textareaFieldFactory,
    textFieldFactory,
};
