import { createDiv, createButton, createTextarea, createForm, createHeading } from "../elements.js";
import { createCommit, getCommitHistory } from "../fetchers.js";

const TAB_COMMIT_CHANGES = "Commit Changes";

/**
 * 
 * @param {import("../main.js").Context} appContext 
 * @param {import("../disclosures/modal.js").ModalContext} modalContext
 */
function tcCommitChanges(appContext, modalContext) {


    const textareaCommitMessage = createTextarea({
        className: "flex-1 focusable",
        attrs: {
            id: "commit-message",
            name: "message",
        },
    });

    // const buttonCancel = createButton({
    //     className: "focusable",
    //     attrs: {
    //         id: "btn-cancel-commit",
    //         type: "button",
    //     },
    //     style: {
    //         order: 1,
    //         marginRight: "8px",
    //         backgroundColor: "transparent",
    //         border: "none",
    //     },
    //     text: "cancel",
    //     onClick: () => {
    //         textareaCommitMessage.value = "";
    //         appContext.events.send("fancy_modal:close");
    //     }
    // });
    
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

    // Watch for tab changes
    appContext.events.on("fancy_modal_tabs:after_update", ({ current, prev }) => {
        if (appContext.dirtyFields.isEmpty()) {
            buttonSubmit.disabled = true;
            textareaCommitMessage.disabled = true;
            textareaCommitMessage.placeholder = "No changes to save";
        } else {
            buttonSubmit.disabled = false;
            textareaCommitMessage.disabled = false;
            textareaCommitMessage.placeholder = "Describe the changes you made (optional)";
        }
    });

    appContext.events.on("fancy_modal:before_open", ({ currentTab }) => {
        setTimeout(() => {
            if (
                currentTab === TAB_COMMIT_CHANGES &&
                !appContext.dirtyFields.isEmpty()
            ) {
                textareaCommitMessage.focus();
            }
        })
    });

    // Do some cleanup when modal closes
    modalContext.onBeforeClose(() => {
        textareaCommitMessage.value = "";
    });


    return createForm({
        async onSubmit(ev) {
            ev.preventDefault();

            const res = await createCommit(
                appContext.characterId,
                textareaCommitMessage.value,
                appContext.formModel,
            );
    
            textareaCommitMessage.value = "";
    
            Object.entries(res.data).forEach(([fieldName, value]) => {
                appContext.apiModel[fieldName] = value;
            });
    
            appContext.dirtyFields.clearAll();

            appContext.commitHistory.update(
                await getCommitHistory(context.characterId)
            );
    
            appContext.events.send("fancy_modal:close");
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
                    // buttonCancel,
                ],
            }),
        ],
    });
}

export { tcCommitChanges, TAB_COMMIT_CHANGES };