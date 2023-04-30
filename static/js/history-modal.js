import { createButton, createDiv, createSpan } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { useWatch } from "./utils.js";
import { createHistoryList } from "./history-list.js";

/**
 * 
 * @param {import("./main.js").Context} appContext
 */
function setupHistoryModal(appContext) {

    appContext.notifications.onOpen("history_modal", ({ status, payload }) => {
        if (status === "success") {
            appContext.events.send("history_modal:open", payload);
        }
    });

    const viewedHistoryItem = useWatch(null);

    createModal({
        closeOnClickOutside: true,
        setup({ openModal, closeModal }) {

            const dataDiv = createDiv({
                attrs: {
                    tabindex: 0,
                },
                style: {
                    position: "relative",
                    height: "400px",
                    width: "300px",
                    overflow: "scroll"
                }
            });

            function updateModalContent(data) {
                dataDiv.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
            }

            viewedHistoryItem.watch(updateModalContent);

            appContext.events.on("history_modal:open", (payload) => {
                viewedHistoryItem.update(payload);
                openModal();
            });

            appContext.events.on("history_modal:close", closeModal);

            return [
                createDiv({
                    className: "flex space-x-4",
                    children: [
                        createHistoryList(appContext, {
                            listStyles: {
                                width: "300px",
                                maxHeight: "400px"
                            },
                            item: {
                                
                                onClick(_, data) {
                                    viewedHistoryItem.update(data);
                                },
                            },
                        }),
                        dataDiv
                    ]
                })
            ];
        },
    });
}

export { setupHistoryModal };
