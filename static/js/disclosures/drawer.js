import { createButton, createDiv } from "../elements";

/**
 * 
 * @param {{
 *  align: "left" | "right";
 *  triggerMount: HTMLElement | string;
 *  onClose?: (contentRoot: HTMLDivElement) => void;
 *  onOpen?: (contentRoot: HTMLDivElement) => void;
 *  setup?: (options: {
 *      openModal: () => void;
 *      closeModal: () => void;
 *  }) => HTMLElement[];
 * }} param0 
 */
function createDrawer({
    align = "left",
    triggerMount = "",
    onClose = () => void 0,
    onOpen = () => void 0,
    setup = () => [],
} = {}) {

    const drawer = createDiv({
        className: "drawer",
    });

    const drawerTrigger = createButton({
        text: "hi"
    });

    if (typeof triggerMount === "string") {
        document.querySelector(triggerMount).appendChild(drawerTrigger);
    } else {
        triggerMount.appendChild(drawerTrigger);
    }

    document.appendChild(drawer);
}

export { createDrawer };

