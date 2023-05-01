
function createNotificationManager() {

    let activeNotification = null;

    const onOpenListeners = {};
    const onCloseListeners = {}

    return {
        open(type, payload) {
            const isActiveNotification = typeof activeNotification === "string";
            if (isActiveNotification && activeNotification !== type) {
                this.close(activeNotification);
            }
            const listeners = onOpenListeners[type] || [];
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](payload);
            }
            activeNotification = type;
        },
        close(type) {
            activeNotification = null;
            const listeners = onCloseListeners[type] || [];
            for (let i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        },
        onOpen(type, listener) {
            if (!onOpenListeners[type]) {
                onOpenListeners[type] = []
            }
            onOpenListeners[type].push(listener);
        },
        onClose(type, listener) {
            if (!onCloseListeners[type]) {
                onCloseListeners[type] = []
            }
            onCloseListeners[type].push(listener);
        }
    }
}

export { createNotificationManager };
