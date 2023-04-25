import { createButton, createDiv, createForm, createHeader, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { isCommandS } from "./utils.js";
import { updateCharacter, getCommitHistory } from "./fetchers.js";

/**
 * 
 * @param {import("./main.js").Context} context 
 */
function setupFancyModal(context) {
    
    createModal({
          
    })
}

export { setupFancyModal };
