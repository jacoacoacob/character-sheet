
import { createButton, createDiv, createHeading } from "./elements.js";
import { createDrawer } from "./disclosures/drawer.js";
import { getCampaignNoteList, getCommitHistory } from "./fetchers.js";
import { TAB_SAVE_CHANGES } from "./fancy-modal/tc-commit-changes.js";
import { TAB_CAMPAIGN_NOTE } from "./fancy-modal/tc-campaign-note.js";
import { createHistoryList } from "./history-list.js";

/**
 * 
 * @param {import("./main.js").Context} appContext
 */
function setupHistoryDrawer(appContext) {

    (async () => {
        appContext.commitHistory.update(
            await getCommitHistory(appContext.characterId)
        );

        appContext.campaignNotes.update(
            await getCampaignNoteList(appContext.characterId)
        );
    })();

    createDrawer({
        container: document.getElementById("commit-history"),
        setupHeader() {
            return [
                createButton({
                    text: "Save changes",
                    onClick(ev) {
                        ev.preventDefault();
                        appContext.events.send("fancy_modal:open", TAB_SAVE_CHANGES);
                    }
                }),
                createButton({
                    text: "Campaign note",
                    onClick() {
                        appContext.events.send("fancy_modal:open", TAB_CAMPAIGN_NOTE);
                    }
                }),
            ];
        },
        setupContent() {
            return [
                createDiv({
                    children: [
                        createHeading(4, "History")
                    ]
                }),
                createHistoryList(
                    appContext,
                    {
                        item: {
                            messageMaxLength: 80,
                            onClick(_, data) {
                                appContext.notifications.requestOpen("history_modal", data);
                            },
                        },
                    }
                ),
            ];
        },
        setupFooter() {
            return [
                createButton({
                    text: "Export as image",
                    async onClick() {
                        const element = document.getElementById("fields-wrapper");

                        const a = document.createElement("a");
                
                        try {
                            const canvas = await html2canvas(element);
                            a.href = canvas.toDataURL();
                            a.download = appContext.formModel.character_name + "_" + new Date().toDateString().toLowerCase().replace(/\s+/g, "_");
                            a.click();
                        } catch (error) {
                            console.error(error);
                        }
                    },
                }),
            ]
        }
    });
}

export { setupHistoryDrawer };
