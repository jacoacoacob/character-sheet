

/**
 * 
 * @param {import("./main.js").Context["events"]} events 
 */
function createNotificationManager(events) {

    let activeNotification = null;

    return {
        requestOpen(type, { payload, force = false } = {}) {
            if (
                typeof activeNotification === "string" &&
                activeNotification !== type
            ) {
                if (force) {
                    events.send(activeNotification + ":close");
                    events.send("notification:open", {
                        type,
                        payload,
                        status: "success",
                    });
                    activeNotification = type;
                } else {
                    events.send("notification:open", {
                        type,
                        activeNotification,
                        payload,
                        status: "fail",
                    });
                }
            } else {
                activeNotification = type;
                events.send("notification:open", { payload, type, status: "success" })
            }
        },
        close(type) {
            activeNotification = null;
            events.send("notification:close", { type });
        },
        onOpen(notificationType, cb) {
            events.on("notification:open", ({ type, status, activeNotification, payload }) => {
                if (notificationType === type) {
                    cb({ status, activeNotification, payload });
                } 
            });
        }
    }
}

export { createNotificationManager };
