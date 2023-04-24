import { createButton, createDiv, createForm, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { isCommandS } from "./utils.js";
import { updateCharacter, getCommitHistory } from "./fetchers.js";

/**
 * 
 * @param {*} context
 * @param {*} dirtyFields 
 */
function setupSaveCommitModal(context, dirtyFields) {
    createModal({
        closeOnClickOutside: true,
        onClose(contentRoot) {
            contentRoot.querySelector("#message").value = "";
        },
        setup({ closeModal, openModal }) {

            window.addEventListener("keydown", (ev) => {
                if (isCommandS(ev)) {
                    ev.preventDefault();
                    openModal();
                }
            });

            const textareaCommitMessage = createTextarea({
                className: "flex-1 focusable",
                attrs: {
                    id: "message",
                    name: "message",
                    placeholder: "Describe the changes you made (optional)"
                },
            });

            const buttonCancel = createButton({
                className: "focusable",
                style: {
                    order: 1,
                    marginRight: "8px",
                    backgroundColor: "transparent",
                    border: "none",
                },
                text: "cancel",
                onClick: closeModal
            });
            
            const buttonSubmit = createButton({
                text: "Save",
                className: "focusable",
                style: {
                    order: 2,
                },
                attrs: {
                    type: "submit",
                },
            });

            return [
                createForm({
                    async onSubmit(ev) {
                        ev.preventDefault();

                        const res = await updateCharacter(
                            context.characterId,
                            textareaCommitMessage.value,
                            context.formModel,
                        );
                
                        textareaCommitMessage.value = "";
                
                        Object.entries(res.data).forEach(([fieldName, value]) => {
                            context.apiModel[fieldName] = value;
                        });
                
                        dirtyFields.removeAll();

                        context.commitHistory.update(
                            await getCommitHistory(context.characterId)
                        );
                
                        closeModal();
                    },
                    className: "space-y-3",
                    attrs: {
                        tabIndex: 1,
                        id: "commit-form",
                    },
                    children: [
                        textareaCommitMessage,
                        createDiv({
                            className: "flex justify-end",
                            children: [
                                buttonSubmit,
                                buttonCancel,
                            ],
                        }),
                    ],
                }),
            ];
        },
    });
}

export { setupSaveCommitModal };
