import { createButton, createDiv, createForm, createHeading, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { createCommit, getCommitHistory } from "./fetchers.js";
import { isCommandKey, isLetterKey } from "./utils.js";

const COMMIT_CHANGES_MODAL = "commit_changes_modal";

/**
 * 
 * @param {import("./main.js").Context} appContext 
 */
function setupCommitChangesModal(appContext) {

    window.addEventListener("keydown", (ev) => {
        if (isCommandKey(ev) && isLetterKey(ev, "s")) {
            ev.preventDefault();
            appContext.notifications.open(COMMIT_CHANGES_MODAL)
        }
    })

    const message = createTextarea({
        className: "flex-1",
        attrs: {
            id: COMMIT_CHANGES_MODAL + "-message",
            name: "message",
        },
    });

    const submitButton = createButton({
        text: "Save",
        attrs: {
            type: "submit",
            id: COMMIT_CHANGES_MODAL + "-submit"
        },
    });

    /**
     * 
     * @param {SubmitEvent} ev 
     */
    async function onSubmit(ev) {
        ev.preventDefault();

        const res = await createCommit(
            appContext.characterId,
            message.value,
            appContext.formModel
        );

        message.value = "";

        Object.entries(res.data).forEach(([fieldName, value]) => {
            appContext.apiModel[fieldName] = value;
        });

        appContext.dirtyFields.clearAll();

        appContext.commitHistory.update(
            await getCommitHistory(appContext.characterId)
        );

        appContext.notifications.close(COMMIT_CHANGES_MODAL);
    }

    createModal({
        appContext,
        modalName: COMMIT_CHANGES_MODAL,
        setup({ openModal, closeModal }) {
            
            appContext.notifications.onOpen(COMMIT_CHANGES_MODAL, () => {
                openModal();
                if (appContext.dirtyFields.isEmpty()) {
                    message.placeholder = "No changes to save";
                    message.disabled = true;
                    submitButton.disabled = true;
                } else {
                    message.placeholder = "Describe the changes you made (optional)";
                    message.disabled = false;
                    submitButton.disabled = false;
                }
            });

            appContext.notifications.onClose(COMMIT_CHANGES_MODAL, () => {
                closeModal();
                message.value = "";
            });

            return [
                createForm({
                    onSubmit,
                    className: "space-y-4",
                    children: [
                        createHeading(2, "Save your changes"),
                        message,
                        createDiv({
                            className: "flex justify-end",
                            children: [
                                submitButton,
                            ],
                        }),
                    ],
                }),
            ];
        },
    });
}

export { setupCommitChangesModal, COMMIT_CHANGES_MODAL };
