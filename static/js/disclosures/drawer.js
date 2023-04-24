import { createButton, createDiv, createHeader } from "../elements.js";

/**
 * 
 * @param {{
 *  container: HTMLElement,
 *  onExpand?: (contentRoot: HTMLDivElement) => void;
 *  onCollapse?: (contentRoot: HTMLDivElement) => void;
 *  setup?: (options: {
 *      expand: () => void;
 *      collapse: () => void;
 *      isExpanded: () => boolean;
 *  }) => HTMLElement[];
 * }} param0 
 */
function createDrawer({
    container,
    onExpand = () => void 0,
    onCollapse = () => void 0,
    setup = () => [],
} = {}) {

    const trigger = createButton({
        className: "drawer-trigger",
        innerHTML: `
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        `,
        onClick() {
            isExpanded() ? collapse() : expand();
        },
    });

    const drawerContent = createDiv({
        className: "drawer-content",
        children: [
            createHeader(2, "History"),
            ...setup({ expand, collapse, isExpanded }),
   
        ],
    });

    const drawer = createDiv({
        className: "drawer",
        children: [
            createDiv({
                style: {
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                },
                children: [
                    trigger,
                ],
            }),
            drawerContent,
        ],
    });

    function isExpanded() {
        return drawer.classList.contains("drawer--expanded");
    }

    function expand() {
        drawer.classList.add("drawer--expanded");
        onExpand(drawer);
    }
    
    function collapse() {
        drawer.classList.remove("drawer--expanded");
        onCollapse(drawer);
    }

    container.append(drawer);
}

export { createDrawer };

