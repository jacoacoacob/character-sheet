import { createDiv, createForm } from "../elements.js";



/**
 * 
 * @param {import("../main.js").Context} appContext 
 * @param {import("../disclosures/modal.js").ModalContext} modalContext

 */
function tcSaveNote(appContext, modalContext) {

    return createForm({
        async onSubmit(ev) {
            ev.preventDefault();
        },
        children: [
            "Save a note!"
        ],
    });
}

export { tcSaveNote };