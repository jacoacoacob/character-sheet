import { createButton, createDiv } from "../elements.js";
import { clearElement, useWatch } from "../utils.js";

/**
 * 
 * @param {{
 *  tabs: Record<string, HTMLElement | string>;
 *  onBeforeUpdate: (currentTab: string, nextTab: string) => void;
 *  onAfterUpdate: (currentTab: string, prevTab: string) => void;
 * }}
 */
function createTabs({
    tabs = {},
    onBeforeUpdate = () => void 0,
    onAfterUpdate = () => void 0,
} = {}) {
    const tabNames = Object.keys(tabs);
    
    const tabState = useWatch(tabNames[0]);

    const tabButtons = tabNames.map((tabName) => createButton({
        text: tabName,
        onClick() {
            const prevTab = tabState.data;
            onBeforeUpdate(tabState.data, tabName);
            tabState.update(tabName);
            onAfterUpdate(tabName, prevTab);
        },
    }));

    const tabContent = createDiv();

    tabState.watch((activeTabName) => {
        clearElement(tabContent);
        tabContent.append(tabs[activeTabName]);
    }, { isEager: true });

    return {
        tabButtons,
        tabContent,
        tabState,
    };
}

export { createTabs };
