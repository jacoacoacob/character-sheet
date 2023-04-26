import { createForm, createButton, createDiv, createHeader, createParagraph, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { createTabs } from "./disclosures/tabs.js";
import { clearElement, isCommandKey, isCommandS, isLetterKey, useWatch } from "./utils.js";
import { getCampaignNoteList } from "./fetchers.js";


/**
 * 
 * @param {import("./main.js").Context} context 
 */
function setupFancyModal(context) {
    
    const { tabButtons, tabContent, tabState } = createTabs({
        tabs: {
            "save-commit": "save a commit message",
            "save-note": "save a note",
            "browse-history": "browse your history of notes and commits",
            "history-detail": "view note or commit details",
        },
    });

    tabButtons.forEach((button) => {
        button.classList.add("focusable");
    });

    (async () => {
        context.campaignNotes.update(
            await getCampaignNoteList(context.characterId)
        );
    })();

    context.campaignNotes.watch((notes) => {
        console.log("[watch] campaignNotes", notes);
    });
    
    createModal({
        closeOnClickOutside: true,
        onAfterOpen() {
            tabState.update("save-commit");
        },
        setup({ openModal, closeModal }) {
            
            window.addEventListener("keydown", (ev) => {
                if (isCommandKey(ev) && isLetterKey(ev, "k")) {
                    ev.preventDefault();
                    openModal();
                }
            });

            context.events.on("open_fancy_modal", openModal);

            return [
                createDiv({
                    children: tabButtons,
                }),
                tabContent
            ]

            // const textareaCommitMessage = createTextarea({
            //     autoSize: true,
            //     style: {
            //         maxHeight: "400px"
            //     },
            //     className: "flex-1 focusable",
            //     attrs: {
            //         id: "note-message",
            //         name: "message",
            //         placeholder: "What's happening right now in the world of your campaign? What just happened?",
            //     },
            // });
        
            // const buttonCancel = createButton({
            //     className: "focusable",
            //     attrs: {
            //         id: "btn-cancel-note",
            //         type: "button",
            //     },
            //     style: {
            //         order: 1,
            //         marginRight: "8px",
            //         backgroundColor: "transparent",
            //         border: "none",
            //     },
            //     text: "cancel",
            //     onClick: closeModal
            // });
            
            // const buttonSubmit = createButton({
            //     text: "Save",
            //     className: "focusable",
            //     style: {
            //         order: 2,
            //     },
            //     attrs: {
            //         type: "submit",
            //         id: "btn-save-note"
            //     },
            // });        

            // return [
            //     createHeader(4, "Campaign note"),
            //     createForm({
            //         async onSubmit(ev) {
            //             ev.preventDefault();
            //         },
            //         className: "space-y-4",
            //         children: [
            //             textareaCommitMessage,
            //             createDiv({
            //                 className: "flex justify-end",
            //                 children: [
            //                     buttonSubmit,
            //                     buttonCancel,
            //                 ],
            //             }),
            //         ],
            //     }),
            // ];
        },
    });
}

export { setupFancyModal };
