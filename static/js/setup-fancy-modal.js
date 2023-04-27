import { createForm, createButton, createDiv, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { createTabs } from "./disclosures/tabs.js";
import { isCommandKey, isLetterKey } from "./utils.js";
import { getCampaignNoteList } from "./fetchers.js";


/**
 * 
 * @param {import("./main.js").Context} context 
 */
function setupFancyModal(context) {
    
 

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
        setup({ openModal, closeModal }) {

            const { tabButtons, tabContent, tabState } = createTabs({
                tabs: {
                    "save-commit": createForm({
                        onSubmit(ev) {
                            ev.preventDefault();

                            const data = new FormData(ev.target);


                            console.log("SAVING COMMIT!", data)
                        },
                        className: "space-y-3",
                        children: [
                            createTextarea({
                                autoSize: true,
                                attrs: {
                                    id: "save-commit-message",
                                    name: "save-commit-message",
                                }
                            }),
                            createDiv({
                                className: "flex space-x-3",
                                children: [
                                    createButton({
                                        text: "Save",
                                        className: "focusable",
                                        attrs: {
                                            type: "submit",
                                        }
                                    }),
                                ]
                            }),
                        ],
                    }),
                    "save-note": createDiv({
                        children: [
                            "save a note"
                        ]
                    }),
                    "browse-history": createDiv({
                        children: [
                            "browse your history of notes and commits",
                        ],
                    }),
                },
            });
        
            
            window.addEventListener("keydown", (ev) => {
                if (isCommandKey(ev) && isLetterKey(ev, "k")) {
                    ev.preventDefault();
                    openModal();
                }
            });

            context.events.on("open_fancy_modal", openModal);

            return [
                tabButtons,
                tabContent
            ]
        },
    });
}

export { setupFancyModal };
