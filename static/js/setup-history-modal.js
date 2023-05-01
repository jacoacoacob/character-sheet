import { createDiv } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { useWatch } from "./utils.js";

const HISTORY_MODAL = "history_modal";

/**
 * 
 * @param {import("./main.js").Context} appContext
 */
function setupHistoryModal(appContext) {

    const viewedHistoryItem = useWatch(null);

    createModal({
        appContext,
        modalName: HISTORY_MODAL,
        setup({ openModal, closeModal }) {

            const dataDiv = createDiv({
                attrs: {
                    tabindex: 0,
                },
                style: {
                    position: "relative",
                    maxHeight: "600px",
                    overflow: "scroll"
                }
            });

            viewedHistoryItem.watch((data) => {
                dataDiv.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
            });

            appContext.notifications.onOpen(HISTORY_MODAL, (payload) => {
                viewedHistoryItem.update(payload);
                openModal();
            });

            appContext.notifications.onClose(HISTORY_MODAL, closeModal)

            return [
                createDiv({
                    className: "flex space-x-4",
                    children: [
                        dataDiv,
                    ],
                }),
            ];
        },
    });
}

export { setupHistoryModal, HISTORY_MODAL };
