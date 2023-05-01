import { createModal } from "./disclosures/modal.js";
import { createDiv, createButton, createTextarea, createForm, createHeading } from "./elements.js";
import { createCampaignNote, getCampaignNoteList } from "./fetchers.js";
import { isCommandKey, isLetterKey } from "./utils.js";

const CAMPAIGN_NOTE_MODAL = "campaign_note_modal";

/**
 * 
 * @param {import("./main.js").Context} appContext 
 */
function setupCampaignNoteModal(appContext) {

    window.addEventListener("keydown", (ev) => {
        if (isCommandKey(ev) && isLetterKey(ev, "k")) {
            ev.preventDefault();
            appContext.notifications.open(CAMPAIGN_NOTE_MODAL);
        }
    });

    const message = createTextarea({
        className: "flex-1",
        attrs: {
            id: CAMPAIGN_NOTE_MODAL + "-message",
            name: "message",
            placeholder: "What's happening? What just happened?"
        },
    });

    const submitButton = createButton({
        text: "Save",
        attrs: {
            type: "submit",
            id: CAMPAIGN_NOTE_MODAL + "-submit"
        },
    });

    /**
     * 
     * @param {SubmitEvent} ev 
     */
    async function onSubmit(ev) {
        ev.preventDefault();

        if (message.value.trim()) {
            await createCampaignNote(
                appContext.characterId,
                message.value.trim()
            );

            message.value = "";

            appContext.campaignNotes.update(
                await getCampaignNoteList(appContext.characterId)
            );
        }

        appContext.notifications.close(CAMPAIGN_NOTE_MODAL);
    }

    createModal({
        appContext,
        modalName: CAMPAIGN_NOTE_MODAL,
        setup({ openModal, closeModal }) {

            appContext.notifications.onOpen(CAMPAIGN_NOTE_MODAL, openModal);
            appContext.notifications.onClose(CAMPAIGN_NOTE_MODAL, closeModal);

            return [
                createForm({
                    onSubmit,
                    className: "space-y-4",
                    children: [
                        createHeading(2, "Campaign note"),
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

export { setupCampaignNoteModal, CAMPAIGN_NOTE_MODAL };
