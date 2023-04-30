

/**
 * 
 * @param {import("./main.js").Context["events"]} events 
 */
function createNotificationManager(events) {

    let activeNotification = null;

    return {
        show(notification) {
            if (
                typeof activeNotification === "string" &&
                activeNotification !== notification
            ) {
                events.send("notification:show", {
                    notification,
                    activeNotification,
                    success: false,
                });
            } else {
                activeNotification = notification;
                events.send("notification:show", { notification, success: true })
            }
        },
        hide(notification) {
            activeNotification = null;
            events.send("notification:hide", { notification });
        },
    }
}

export { createNotificationManager };
