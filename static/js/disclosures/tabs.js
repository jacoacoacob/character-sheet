/*

DON'T USE THIS!!!

FOCUS MANAGEMENT FOR KEYBOARD ACCESSIBILITY IS TOO HARD.

*/


// import { createButton, createDiv } from "../elements.js";
// import { clearElement, isArrowKey, isTabKey, useWatch, createFocusTrap } from "../utils.js";

// /**
//  * 
//  * @param {{
//  *  tabs: Record<string, HTMLElement>;
//  *  onBeforeUpdate: (currentTab: string, nextTab: string) => void;
//  *  onAfterUpdate: (currentTab: string, prevTab: string) => void;
//  * }}
//  */
// function createTabs({
//     tabs = {},
//     onBeforeUpdate = () => void 0,
//     onAfterUpdate = () => void 0,
// } = {}) {
//     const tabNames = Object.keys(tabs);
    
//     const tabState = useWatch(tabNames[0]);

//     function doUpdate(newTabState) {
//         const prev = tabState.data;
//         if (prev === newTabState) {
//             return;
//         }
//         onBeforeUpdate(prev, newTabState);
//         tabState.update(newTabState);
//         onAfterUpdate(newTabState, prev);
//     }

//     const getPrevTabName = () => {
//         const indexOfActiveTab = tabNames.indexOf(tabState.data);
//         if (indexOfActiveTab === 0) {
//             return tabNames[tabNames.length - 1];
//         } else {
//             return tabNames[indexOfActiveTab - 1];
//         }
//     }
//     const getNextTabName = () => {
//         const indexOfActiveTab = tabNames.indexOf(tabState.data);
//         if (indexOfActiveTab === tabNames.length - 1) {
//             return tabNames[0];
//         } else {
//             return tabNames[indexOfActiveTab + 1];
//         }
//     }
//     const getTabIdFrom = (tabName) => `tab-${tabName.toLowerCase().replace(" ", "-")}`;

//     const tabButtonIds = [];

//     const tabButtons = createDiv({
//         className: "space-x-3",
//         children: tabNames.map((tabName) => {
//             const btn = createButton({
//                 text: tabName,
//                 className: "tab-button",
//                 attrs: {
//                     id: getTabIdFrom(tabName),
//                 },
//                 onClick() {
//                     doUpdate(tabName)
//                 },
//             });
//             btn.addEventListener("focus", (ev) => {
//                 if (ev.relatedTarget && !ev.relatedTarget.classList.contains("tab-button")) {
//                     tabButtons.querySelector(`#${getTabIdFrom(tabState.data)}`).focus();
//                 }
//             })
//             tabButtonIds.push(btn.id);
//             return btn;
//         }),
//     });

//     const tabContent = createDiv({
//         attrs: {
//             tabIndex: 0,
//         },
//     });

//     tabButtons.addEventListener("keydown", (ev) => {
//         if (isTabKey(ev)) {
//             ev.preventDefault();
//             tabContent.dataset.tabId = ev.target.id;
//             tabContent.focus();
//         }

//         if (tabButtonIds.includes(ev.target.id)) {
//             if (isArrowKey(ev, "left")) {
//                 const tabName = getPrevTabName()
//                 doUpdate(tabName);
//                 tabButtons.querySelector(`#${getTabIdFrom(tabName)}`).focus();
//             }
//             if (isArrowKey(ev, "right")) {
//                 const tabName = getNextTabName()
//                 doUpdate(tabName)
//                 tabButtons.querySelector(`#${getTabIdFrom(tabName)}`).focus();
//             }
//         }
//     });

//     tabState.watch((activeTabName, prev) => {
//         clearElement(tabContent);
//         const activeId = getTabIdFrom(activeTabName);
//         const prevActiveId = getTabIdFrom(prev);
//         tabButtons.querySelector(`#${prevActiveId}`).classList.remove("tab-button--active");
//         tabButtons.querySelector(`#${activeId}`).classList.add("tab-button--active");
//         tabButtons.querySelector(`#${activeId}`).focus();
//         tabContent.append(tabs[activeTabName]);
//         onAfterUpdate(activeTabName, prev);
//     }, { isEager: true });

//     return {
//         tabButtons,
//         tabContent,
//         tabState,
//     };
// }

// export { createTabs };
