import { createModal } from "../disclosures/modal.js";
import { createTabs } from "../disclosures/tabs.js";
import { createButton, createDiv, createSpan } from "../elements.js";
import { isCommandKey, isLetterKey } from "../utils.js";
import { tcSaveChanges, TAB_SAVE_CHANGES } from "./tc-commit-changes.js";
import { tcCampaignNote, TAB_CAMPAIGN_NOTE } from "./tc-campaign-note.js";

/**
 * 
 * @param {import("../main.js").Context} appContext 
 */
function setupFancyModal(appContext) {

    window.addEventListener("keydown", (ev) => {
        if (isCommandKey(ev) && isLetterKey(ev, "k")) {
            ev.preventDefault();
            appContext.events.send("fancy_modal:open", TAB_CAMPAIGN_NOTE);
        }
        if (isCommandKey(ev) && isLetterKey(ev, "s")) {
            ev.preventDefault();
            appContext.events.send("fancy_modal:open", TAB_SAVE_CHANGES)
        }
    });

    createModal({
        closeOnClickOutside: true,
        contentStyle: {
            paddingTop: "8px",
        },
        setup(modalContext) {
            const { openModal, closeModal, onBeforeOpen } = modalContext;

            const { tabButtons, tabContent, tabState } = createTabs({
                onAfterUpdate(current, prev) {
                    appContext.events.send("fancy_modal_tabs:after_update", { current, prev });
                },
                tabs: {
                    [TAB_SAVE_CHANGES]: tcSaveChanges(appContext, modalContext),
                    [TAB_CAMPAIGN_NOTE]: tcCampaignNote(appContext, modalContext),
                },
            });

            onBeforeOpen(() => {
                appContext.events.send("fancy_modal:before_open", {
                    currentTab: tabState.data,
                });
            });

            appContext.events.on("fancy_modal:open", (tab) => {
                openModal();
                tabState.update(tab);
            });
            
            appContext.events.on("fancy_modal:close", closeModal);

            return [
                createDiv({
                    className: "space-y-6",
                    children: [
                        createDiv({
                            className: "flex justify-end align-center space-x-3",
                            style: {
                                position: "relative",
                                right: "-24px"
                            },
                            children: [
                                createSpan({
                                    children: [
                                        "[Esc] to close or",
                                    ]
                                }),
                                createButton({
                                    text: "x",
                                    attrs: {
                                        title: "Close modal",
                                    },
                                    onClick() {
                                        appContext.events.send("fancy_modal:close");
                                    },
                                }),
                            ],
                        }),
                        createDiv({
                            className: "space-y-4",
                            children: [
                                tabButtons,
                                tabContent,
                            ]
                        })
                    ],
                }),
            ];
        },
    });
}

export { setupFancyModal };
