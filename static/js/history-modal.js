import { createDiv } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { useWatch } from "./utils.js";

/**
 * 
 * @param {import("./main.js").Context} appContext
 */
function setupHistoryModal(appContext) {

    appContext.events.on("notification:open", (options) => {
        const { status, notification, activeNotification, payload } = options;
        if (notification === "history_modal") {
            if (status === "success") {
                appContext.events.send("history_modal:open", payload);
            }
            if (status === "fail") {
                appContext.notifications.close(activeNotification);
                appContext.notifications.requestOpen(notification, payload);
            }
        }
    });

    const viewedHistoryItem = useWatch(null);

    createModal({
        closeOnClickOutside: true,
        setup({ openModal, closeModal }) {

            const dataDiv = createDiv();

            viewedHistoryItem.watch((data) => {
                dataDiv.textContent = JSON.stringify(data);
            });

            appContext.events.on("history_modal:open", (payload) => {
                viewedHistoryItem.update(payload);
                openModal();
            });

            appContext.events.on("history_modal:close", closeModal);

            return [
                dataDiv
            ];
        },
    });
}

export { setupHistoryModal };
