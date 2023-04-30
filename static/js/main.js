
import { naiveDeepCopy, useWatch } from "./utils.js";

import { createDirtyFieldsManager } from "./dirty-fields-manager.js";
import { setupFields } from "./setup-fields.js";
import { setupHistoryDrawer } from "./history-drawer.js";
import { createEventBus } from "./event-bus.js";
import { setupFancyModal } from "./fancy-modal/fancy-modal.js";
import { createNotificationManager } from "./notification-manager.js";

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
        this.events = createEventBus();
        this.notifications = createNotificationManager(this.events);
    }
}

const context = window.context = new Context();

setupFields(context);
setupFancyModal(context);
setupHistoryDrawer(context);
