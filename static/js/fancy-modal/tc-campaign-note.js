import { createButton, createDiv, createForm, createHeading, createTextarea } from "../elements.js";
import { getCampaignNoteList } from "../fetchers.js";
import { createCampaignNote } from "../fetchers.js";

const TAB_CAMPAIGN_NOTE = "Campaign Note";

/**
 * 
 * @param {import("../main.js").Context} appContext 
 * @param {import("../disclosures/modal.js").ModalContext} modalContext

 */
function tcCampaignNote(appContext, modalContext) {

    const message = createTextarea({
        attrs: {
            name: "message",
            placeholder: "What's happening? What just happened?"
        },
    });

    const submit = createButton({
        text: "Submit",
        attrs: {
            type: "submit",
        },
    });

    appContext.events.on("fancy_modal:before_open", ({ currentTab }) => {
        setTimeout(() => {
            if (currentTab === TAB_CAMPAIGN_NOTE) {
                message.focus();
            }
        });
    });
    
    return createForm({
        className: "space-y-4",
        async onSubmit(ev) {
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

                appContext.events.send("fancy_modal:close");
            }
        },
        children: [
            createHeading(4, "Campaign Note"),
            message,
            createDiv({
                className: "flex justify-end",
                children: [
                    submit,
                ],
            }),
        ],
    });
}

export { tcCampaignNote, TAB_CAMPAIGN_NOTE };