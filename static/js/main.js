
import { naiveDeepCopy, useWatch } from "./utils.js";

import { setupFields } from "./setup-fields.js";
import { setupCommitHistoryDrawer } from "./setup-commit-history-drawer.js";
import { setupSaveCommitModal } from "./setup-save-commit-modal.js";

const characterId = INITIAL_DATA.id;

const apiModel = naiveDeepCopy(INITIAL_DATA.data);
const formModel = naiveDeepCopy(INITIAL_DATA.data);

let ctxCount = 0;
export class Context {
    constructor() {
        if (ctxCount > 0) {
            // lol its a singleton
            throw new Error("ONLY ONE CONTEXT!!!");
        }

        /** @type {string} */
        this.characterId = characterId;
        this.commitHistory = useWatch([]);
        this.apiModel = apiModel;
        this.formModel = formModel;
        this.dirtyFields = createDirtyFields();

        ctxCount += 1;
    }
}

const context = new Context();

window.apiModel = apiModel;
window.formModel = formModel;

setupFields(context);
setupSaveCommitModal(context);
setupCommitHistoryDrawer(context);


function createDirtyFields() {
    const _dirtyFields = [];

    return {
        add(fieldId) {
            _dirtyFields.push(fieldId);
        },
        remove(fieldId) {
            const indexOfFieldId = _dirtyFields.indexOf(fieldId);
            if (indexOfFieldId > -1) {
                _dirtyFields.splice(indexOfFieldId, 1);
            }
        },
        removeAll() {
            while (_dirtyFields.length) {
                document.getElementById(_dirtyFields.pop()).classList.remove("input--dirty");
            }
        }
    }
}
