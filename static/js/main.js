
import { naiveDeepCopy, useWatch } from "./utils.js";

import { createDirtyFieldsManager } from "./dirty-fields-manager.js";
import { setupFields } from "./setup-fields.js";
import { setupCommitHistoryDrawer } from "./setup-commit-history-drawer.js";
import { setupSaveCommitModal } from "./setup-save-commit-modal.js";

let ctxCount = 0;
export class Context {
    constructor() {
        if (ctxCount > 0) {
            // lol its a singleton...because I gots ta have a class for the auto-completes
            throw new Error("ONLY ONE CONTEXT!!!");
        }

        ctxCount += 1;

        /** @type {string} */
        this.characterId = INITIAL_DATA.id;
        this.commitHistory = useWatch([]);
        this.campaignNotes = useWatch([]);
        this.apiModel = naiveDeepCopy(INITIAL_DATA.data);
        this.formModel = naiveDeepCopy(INITIAL_DATA.data);
        this.dirtyFields = createDirtyFieldsManager();
    }
}

const context = new Context();

window.apiModel = context.apiModel;
window.formModel = context.formModel;

setupFields(context);
setupSaveCommitModal(context);
setupCommitHistoryDrawer(context);
