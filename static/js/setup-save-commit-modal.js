import { createButton, createDiv, createForm, createHeading, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { isCommandS } from "./utils.js";
import { createCommit, getCommitHistory } from "./fetchers.js";

/**
 * 
 * @param {import("./main.js").Context} context
 */
function setupSaveCommitModal(context) {
    createModal({
        closeOnClickOutside: true,
        setup({ closeModal, openModal, onAfterClose, onAfterOpen, onBeforeOpen }) {

            onAfterClose((contentRoot) => {
                contentRoot.querySelector("#commit-message").value = "";
            });

            onBeforeOpen((contentRoot) => {
                const message = contentRoot.querySelector("#commit-message");
                const btnSave = contentRoot.querySelector("#btn-save-commit");
                if (context.dirtyFields.isEmpty()) {
                    btnSave.classList.remove("focusable");
                    message.classList.remove("focusable");
                    btnSave.disabled = true;
                    message.disabled = true;
                    message.placeholder = "No changes to save";
                } else {
                    btnSave.classList.add("focusable");
                    message.classList.add("focusable");
                    btnSave.disabled = false;
                    message.disabled = false;
                    message.placeholder = "Describe the changes you made (optional)";
                }
            });

            onAfterOpen((contentRoot) => {
                const btnCancel = contentRoot.querySelector("#btn-cancel-commit");
                if (context.dirtyFields.isEmpty()) {
                    btnCancel.focus();
                }
            });

            window.addEventListener("keydown", (ev) => {
                if (isCommandS(ev)) {
                    ev.preventDefault();
                    openModal();
                }
            });

            context.events.on("open_save_modal", openModal);

            const textareaCommitMessage = createTextarea({
                className: "flex-1 focusable",
                attrs: {
                    id: "commit-message",
                    name: "message",
                },
            });

            const buttonCancel = createButton({
                className: "focusable",
                attrs: {
                    id: "btn-cancel-commit",
                    type: "button",
                },
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
                    id: "btn-save-commit"
                },
            });

            return [
                createForm({
                    async onSubmit(ev) {
                        ev.preventDefault();

                        const res = await createCommit(
                            context.characterId,
                            textareaCommitMessage.value,
                            context.formModel,
                        );
                
                        textareaCommitMessage.value = "";
                
                        Object.entries(res.data).forEach(([fieldName, value]) => {
                            context.apiModel[fieldName] = value;
                        });
                
                        context.dirtyFields.clearAll();

                        context.commitHistory.update(
                            await getCommitHistory(context.characterId)
                        );
                
                        closeModal();
                    },
                    className: "space-y-4",
                    attrs: {
                        tabIndex: 1,
                        id: "commit-form",
                    },
                    children: [
                        createHeading(4, "Save your changes"),
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
