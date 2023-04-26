import { createButton, createDiv, createForm, createHeader, createParagraph, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { isCommandKey, isCommandS, isLetterKey } from "./utils.js";
import { getCommitHistory } from "./fetchers.js";

/**
 * 
 * @param {import("./main.js").Context} context 
 */
function setupFancyModal(context) {
    
    createModal({
        closeOnClickOutside: true,
        setup({ openModal, closeModal }) {
            
            window.addEventListener("keydown", (ev) => {
                if (isCommandKey(ev) && isLetterKey(ev, "k")) {
                    ev.preventDefault();
                    openModal();
                }
            });

            return [
                createHeader(4, "Fancy Modal"),
                createParagraph({
                    children: [
                        "It's going to be so fancy and have so many neat things!"
                    ]
                })
            ];
        },
    });
}

export { setupFancyModal };
