import { createDiv } from "../elements.js"
import { isShiftKey, isTabKey } from "../utils.js";

/**
 * 
 * @param {{
 *  closeOnClickOutside?: boolean;
 *  onBeforeClose?: (contentRoot: HTMLDivElement) => void;
 *  onAfterClose?: (contentRoot: HTMLDivElement) => void;
 *  onBeforeOpen?: (contentRoot: HTMLDivElement) => void;
 *  onAfterOpen?: (contentRoot: HTMLDivElement) => void;
 *  setup?: (options: {
 *      openModal: () => void;
 *      closeModal: () => void;
 *  }) => HTMLElement[];
 * }} param0 
 */
function createModal({
    closeOnClickOutside = false,
    onBeforeOpen = () => void 0,
    onAfterOpen = () => void 0,
    onBeforeClose = () => void 0,
    onAfterClose = () => void 0,
    setup = () => [],
} = {}) {

    let prevActiveNonModalElement;
    let focusableModalContentElements;

    const modalContent = createDiv({
        className: "modal-content",
        attrs: {
            tabIndex: 0,
        },
        children: setup({ closeModal, openModal }),
    });

    const modal = createDiv({
        className: "modal",
        children: [
            modalContent,
        ],
    });

    modal.hidden = true;

    /**
     * 
     * @param {MouseEvent} ev 
     */
    function listenClickOutsideContent(ev) {
        if (closeOnClickOutside && ev.target === modal) {
            closeModal();
        }
    }

    function firstFocusablModalContentElement() {
        if (focusableModalContentElements) {
            return focusableModalContentElements[0];
        }
    }

    function lastFocusableModalContentElement() {
        if (focusableModalContentElements) {
            return focusableModalContentElements[focusableModalContentElements.length - 1];
        }
    }

    function trapFocus(ev) {
        if (!isTabKey(ev)) {
            return;
        }

        if (focusableModalContentElements && focusableModalContentElements.length === 0) {
            ev.preventDefault();
            return;
        }

        if (isShiftKey(ev)) {
            if (document.activeElement === firstFocusablModalContentElement()) {
                lastFocusableModalContentElement().focus();
                ev.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableModalContentElement()) {
                firstFocusablModalContentElement().focus();
                ev.preventDefault();
            }
        }
    }

    function closeOnEscapeKey(ev) {
        if (ev.key === "Escape") {
            closeModal();
        }
    }

    function listenKeyDown(ev) {
        closeOnEscapeKey(ev);
        trapFocus(ev);
    }

    function closeModal() {
        onBeforeClose(modalContent)
        document.body.style.overflow = "auto";
        modal.classList.remove("modal--visible");
        modal.hidden = true;
        window.removeEventListener("keydown", listenKeyDown);
        modal.removeEventListener("click", listenClickOutsideContent);
        if (prevActiveNonModalElement) {
            prevActiveNonModalElement.focus();
            prevActiveNonModalElement = null;
        }
        focusableModalContentElements = null;
        onAfterClose(modalContent);
    }

    function openModal() {
        onBeforeOpen(modalContent)
        document.body.style.overflow = "hidden";
        modal.classList.add("modal--visible");
        modal.hidden = false;
        prevActiveNonModalElement = document.activeElement;
        focusableModalContentElements = modalContent.querySelectorAll(".focusable");
        if (focusableModalContentElements.length) {
            focusableModalContentElements[0].focus();
        } else {
            modalContent.focus();
        }
        window.addEventListener("keydown", listenKeyDown);
        modal.addEventListener("click", listenClickOutsideContent);
        onAfterOpen(modalContent);
    }

    document.body.appendChild(modal)
}

export { createModal };
