import { createTabs } from "../disclosures/tabs.js";
import { tcCommitChanges } from "./tc-commit-changes.js";
import { tcSaveNote } from "./tc-save-note.js";

/**
 * 
 * @param {import("../main.js").Context} context 
 */
function setupFancyModal(context) {

    const { tabButtons, tabContent, tabState } = createTabs({
        "Commit Changes": tcCommitChanges(context),
        "Save Note": tcSaveNote(context),
    });

    

}

export { setupFancyModal };
