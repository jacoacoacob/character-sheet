import { createButton, createDiv, createHeader } from "../elements.js";

const DRAWER_STATE_KEY = location.pathname + "_" + "drawer-state";

/**
 * 
 * @param {{
 *  container: HTMLElement,
 *  onExpand?: (contentRoot: HTMLDivElement) => void;
 *  onCollapse?: (contentRoot: HTMLDivElement) => void;
 *  setupHeader?: () => HTMLElement[];
 *  setupContent?: () => HTMLElement[];
 *  setupFooter?: () => HTMLElement[];
 * }} param0 
 */
function createDrawer({
    container,
    onExpand = () => void 0,
    onCollapse = () => void 0,
    setupHeader = () => [],
    setupContent = () => [],
    setupFooter = () => [],
} = {}) {

    const drawerTrigger = createButton({
        className: "drawer-trigger",
        attrs: {
            tabIndex: 0,
        },
        innerHTML: `
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        `,
        onClick() {
            isExpanded() ? collapse() : expand();
        },
    });

    const drawer = createDiv({
        className: "drawer space-y-3",
        children: [
            drawerTrigger,
            createDiv({
                className: "drawer-content-wrapper",
                children: [
                    createDiv({
                        className: "drawer-header space-x-3",
                        children: setupHeader(),
                    }),
                    createDiv({
                        className: "drawer-content",
                        children: setupContent(),
                    }),
                    createDiv({
                        className: "drawer-footer",
                        children: setupFooter(),
                    }),
                ],
            }),
        ],
    });

    function isExpanded() {
        return drawer.classList.contains("drawer--expanded");
    }

    function expand() {
        localStorage[DRAWER_STATE_KEY] = "expanded";
        drawer.classList.add("drawer--expanded");
        onExpand(drawer);
    }
    
    function collapse() {
        drawer.classList.remove("drawer--expanded");
        localStorage[DRAWER_STATE_KEY] = "collapsed";
        onCollapse(drawer);
    }
    
    if (localStorage[DRAWER_STATE_KEY] === "expanded") {
        expand();
    }

    container.append(drawer);
}

export { createDrawer };

