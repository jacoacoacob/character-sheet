import { createModal } from "../disclosures/modal.js";
import { createTabs } from "../disclosures/tabs.js";
import { tcCommitChanges } from "./tc-commit-changes.js";
import { tcSaveNote } from "./tc-save-note.js";

/**
 * 
 * @param {import("../main.js").Context} appContext 
 */
function setupFancyModal(appContext) {

    const { tabButtons, tabContent, tabState } = createTabs({
        "Commit Changes": tcCommitChanges(appContext),
        "Save Note": tcSaveNote(appContext),
    });


    createModal({
        setup(modalContext) {

        }
    })

}

export { setupFancyModal };
