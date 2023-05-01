
import { naiveDeepCopy, useWatch } from "./utils.js";

import { createDirtyFieldsManager } from "./dirty-fields-manager.js";
import { setupFields } from "./setup-fields.js";
import { setupHistoryDrawer } from "./setup-history-drawer.js";
import { createNotificationManager } from "./notification-manager.js";
import { setupHistoryModal } from "./setup-history-modal.js";
import { setupCommitChangesModal } from "./setup-commit-changes-modal.js";
import { setupCampaignNoteModal } from "./setup-campaign-note-modal.js";

let ctxCount = 0;
export class Context {
    constructor() {
        if (ctxCount > 0) {
            // lol its a singleton...because using `class` syntax makes vscode
            // intellisense work with /** @param {import("<path/to/main.js>").Context} */
            // without the need for maintaining a @typedef
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
        this.notifications = createNotificationManager();
    }
}

const context = window.context = new Context();

setupFields(context);
setupHistoryDrawer(context);
setupHistoryModal(context);
setupCampaignNoteModal(context);
setupCommitChangesModal(context);
