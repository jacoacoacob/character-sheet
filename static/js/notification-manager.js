

/**
 * 
 * @param {import("./main.js").Context["events"]} events 
 */
function createNotificationManager(events) {

    let activeNotification = null;

    return {
        requestOpen(notification, payload) {
            if (
                typeof activeNotification === "string" &&
                activeNotification !== notification
            ) {
                events.send("notification:open", {
                    notification,
                    activeNotification,
                    payload,
                    status: "fail",
                });
            } else {
                activeNotification = notification;
                events.send("notification:open", { payload, notification, status: "success" })
            }
        },
        close(notification) {
            activeNotification = null;
            events.send("notification:close", { notification });
        },
    }
}

export { createNotificationManager };
