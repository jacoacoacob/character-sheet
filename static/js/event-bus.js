
function createEventBus() {
    const _listeners = {};

    return {
        on(type, listener) {
            if (typeof _listeners[type] === "undefined") {
                _listeners[type] = [];
            }
            _listeners[type].push(listener);
        },
        off(type, listener) {
            if (typeof _listeners[type] === "undefined") {
                return;
            }
            const indexOfListener = _listeners[type].indexOf(listener);
            if (indexOfListener > -1) {
                _listeners[type].splice(indexOfListener, 1);
            }
        },
        send(type, payload) {
            (_listeners[type] || []).forEach((listener) => {
                listener(payload);
            });
        },
    };
}

export { createEventBus };
