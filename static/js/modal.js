import { createDiv } from "./elements.js"

/**
 * 
 * @param {{
 *  onClose?: () => void;
 *  onOpen?: () => void;
 *  setup?: (options: {
 *      openModal: () => void;
 *      closeModal: () => void;
 *  }) => HTMLElement[];
 * }} param0 
 * @returns 
 */
function createModal({
    onOpen = () => void 0,
    onClose = () => void 0,
    setup = () => [],
} = {}) {

    let prevActiveElement;

    const modal = createDiv({
        className: "modal",
        children: [
            createDiv({
                className: "modal-content",
                children: setup({ closeModal, openModal }),
            }),
        ],
    });

    function listenEscapeKey(ev) {
        if (ev.key === "Escape") {
            closeModal();
        }
    }

    function closeModal() {
        modal.classList.remove("modal--visible");
        modal.removeEventListener("keydown", listenEscapeKey);
        if (prevActiveElement) {
            prevActiveElement.focus();
            prevActiveElement = null;
        }
        onClose();
    }

    function openModal() {
        modal.classList.add("modal--visible");
        prevActiveElement = document.activeElement;
        modal.addEventListener("keydown", listenEscapeKey);
        onOpen();
    }

    document.body.appendChild(modal);
}

export { createModal };
