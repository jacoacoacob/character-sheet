import { createModal } from "../disclosures/modal.js";
import { createTabs } from "../disclosures/tabs.js";
import { createDiv } from "../elements.js";
import { isCommandKey, isLetterKey } from "../utils.js";

/**
 * 
 * @param {import("./main.js").Context} appContext 
 */
function setupCampaignNoteModal(appContext) {

    window.addEventListener("keydown", (ev) => {
        if (isCommandKey(ev) && isLetterKey(ev, "k")) {
            ev.preventDefault();
            appContext.notifications.requestOpen("campaign_note_modal");
        }
    });
}

export { setupCampaignNoteModal };
