
import { createButton, createDiv, createHeading } from "./elements.js";
import { createDrawer } from "./disclosures/drawer.js";
import { getCampaignNoteList, getCommitHistory } from "./fetchers.js";;
import { createHistoryList } from "./history-list.js";
import { HISTORY_MODAL } from "./setup-history-modal.js";
import { COMMIT_CHANGES_MODAL } from "./setup-commit-changes-modal.js";
import { CAMPAIGN_NOTE_MODAL } from "./setup-campaign-note-modal.js";

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
                    attrs: {
                        title: "Ctrl + S"
                    },
                    onClick(ev) {
                        ev.preventDefault();
                        appContext.notifications.open(COMMIT_CHANGES_MODAL);
                    }
                }),
                createButton({
                    text: "Campaign note",
                    attrs: {
                        title: "Ctrl + K"
                    },
                    onClick() {
                        appContext.notifications.open(CAMPAIGN_NOTE_MODAL);
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
                                appContext.notifications.open(HISTORY_MODAL, data);
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
