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
        contentStyle: {
            maxWidth: "600px"
        },
        setup({ openModal, closeModal, onBeforeOpen, isOpen }) {

            const { tabButtons, tabContent, tabState } = createTabs({
                tabs: {
                    "Save Commit": createForm({
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
                    "Save Note": createDiv({
                        children: [
                            "save a note"
                        ]
                    }),
                    "Browse History": createDiv({
                        children: [
                            "browse your history of notes and commits",
                        ],
                    }),
                },
            });

            onBeforeOpen(() => {
                tabState.update("Save Commit");
            })
        
            
            window.addEventListener("keydown", (ev) => {
                if (isCommandKey(ev) && isLetterKey(ev, "k")) {
                    ev.preventDefault();
                    if (!isOpen()) {
                        openModal();
                    }
                }
            });

            context.events.on("fancy_modal:open", openModal);

            return [
                createDiv({
                    className: "space-y-3",
                    children: [
                        tabButtons,
                        tabContent,
                    ],
                }),
            ];
        },
    });
}

export { setupFancyModal };
