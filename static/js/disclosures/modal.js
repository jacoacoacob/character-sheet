import { createDiv } from "../elements.js"
import { createFocusTrap } from "../utils.js";

/**
 * 
 * @param {{
 *  closeOnClickOutside?: boolean;
 *  contentClassName?: string;
 *  contentStyle?: ElementCSSInlineStyle["style"];
 *  setup: (options: {
 *      openModal: () => void;
 *      closeModal: () => void;
 *      isOpen: () => boolean;
 *      onBeforeClose?: ((contentRoot: HTMLDivElement) => void) => void;
 *      onAfterClose?: ((contentRoot: HTMLDivElement) => void) => void;
 *      onBeforeOpen?: ((contentRoot: HTMLDivElement) => void) => void;
 *      onAfterOpen?: ((contentRoot: HTMLDivElement) => void) => void;
 *  }) => HTMLElement[];
 * }} param0 
 */
function createModal({
    closeOnClickOutside = false,
    contentClassName = "",
    contentStyle = {},
    setup = () => []
} = {}) {

    const _onBeforeOpen = [];
    const _onBeforeClose = [];
    const _onAfterOpen = [];
    const _onAfterClose = [];

    function onAfterClose(callback) {
        _onAfterClose.push(callback);
    }
    function onBeforeClose(callback) {
        _onBeforeClose.push(callback);
    }
    function onAfterOpen(callback) {
        _onAfterOpen.push(callback);
    }
    function onBeforeOpen(callback) {
        _onBeforeOpen.push(callback);
    }

    let prevActiveNonModalElement;

    const modalContent = createDiv({
        className: `modal-content ${contentClassName}`.trim(),
        style: contentStyle,
        attrs: {
            tabIndex: 0,
        },
        children: setup({
            closeModal,
            openModal,
            isOpen,
            onAfterClose,
            onAfterOpen,
            onBeforeClose,
            onBeforeOpen,
        }),
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

    const { trapFocus, focus } = createFocusTrap(modalContent);

    function closeOnEscapeKey(ev) {
        if (ev.key === "Escape") {
            closeModal();
        }
    }

    function listenKeyDown(ev) {
        closeOnEscapeKey(ev);
        trapFocus(ev);
    }

    function isOpen() {
        return modal.classList.contains("modal--visible");
    }

    function closeModal() {
        _onBeforeClose.forEach(cb => cb(modalContent));
        document.body.style.overflow = "auto";
        modal.classList.remove("modal--visible");
        modal.hidden = true;
        window.removeEventListener("keydown", listenKeyDown);
        modal.removeEventListener("click", listenClickOutsideContent);
        if (prevActiveNonModalElement) {
            prevActiveNonModalElement.focus();
            prevActiveNonModalElement = null;
        }
        _onAfterClose.forEach(cb => cb(modalContent));
    }

    function openModal() {
        _onBeforeOpen.forEach(cb => cb(modalContent));
        document.body.style.overflow = "hidden";
        modal.classList.add("modal--visible");
        modal.hidden = false;
        prevActiveNonModalElement = document.activeElement;
        focus(0);
        window.addEventListener("keydown", listenKeyDown);
        modal.addEventListener("click", listenClickOutsideContent);
        _onAfterOpen.forEach(cb => cb(modalContent));
    }

    document.body.appendChild(modal)
}

export { createModal };
