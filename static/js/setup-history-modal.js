import { createDiv, createParagraph, createSpan } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { clearElement, useWatch } from "./utils.js";

const HISTORY_MODAL = "history_modal";

function badge(text) {
    return createSpan({
        style: {
            display: "inline-block",
            fontSize: ".875rem",
            fontWeight: 600,
            padding: "4px",
            backgroundColor: "#ddd",
            borderRadius: "4px",
        },
        children: [
            text.toUpperCase(),
        ],
    });
}

function bold(text) {
    return createSpan({ style: { fontWeight: 600 }, children: [text] });
}

/**
 * 
 * @param {import("./main.js").Context} appContext
 */
function setupHistoryModal(appContext) {

    createModal({
        appContext,
        modalName: HISTORY_MODAL,
        setup({ openModal, closeModal }) {

            const viewedHistoryItem = useWatch(null);
            
            viewedHistoryItem.watch(updateUI);

            const dataDiv = createDiv({
                className: "space-y-4",
                attrs: {
                    tabindex: 0,
                },
                style: {
                    position: "relative",
                    maxHeight: "600px",
                    overflow: "scroll"
                },
            });

            function updateUI(data) {
                clearElement(dataDiv);

                const header = createDiv({
                    children: [
                        badge(data.kind),
                        " ",
                        bold(`${data.dateCreated}, ${data.timeCreated}`),
                    ],
                });

                const message = createDiv({
                    className: "space-y-4",
                    children: data.message.split("\n").map((text) => createParagraph({
                        children: [text]
                    }))
                });

                const diffs = data.diffs.length && createDiv({
                    style: {
                        position: "relative",
                        overflow: "scroll",
                        maxHeight: "400px", 
                        whiteSpace: "pre"
                    },
                    children: [
                        JSON.stringify(data.diffs, null, 2)
                    ]
                });

                const children = [
                    header,
                    message,
                    diffs
                ];

                dataDiv.append(...children.filter(Boolean));
            }

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
