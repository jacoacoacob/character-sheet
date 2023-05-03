import { createButton, createDiv, createForm, createParagraph, createSpan, createTextarea } from "./elements.js";
import { createModal } from "./disclosures/modal.js";
import { clearElement, useWatch } from "./utils.js";
import { getCampaignNoteList, getCommitHistory, updateCampaignNote, updateCommitMessage } from "./fetchers.js";
import { HistoryListItemData } from "./history-list.js";

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
 * @param {import("./history-list.js").HistoryListItemData} data 
 */
function editableMessage(appContext, data) {
    const container = createDiv({ className: "space-y-3" });
    
    const isEditing = useWatch(false);

    isEditing.watch((current) => {
        clearElement(container);

        if (current) {
            let formMessage = data.message;

            const isDirty = useWatch(data.message.trim() !== formMessage.trim());

            const submitButton = createButton({
                text: "save",
                attrs: {
                    type: "submit"
                },
            });

            const message = createTextarea({
                autoSize: true,
                initialValue: formMessage,
                style: {
                    maxHeight: "400px",
                },
                onInput(ev) {
                    formMessage = ev.target.value;
                    isDirty.update(data.message.trim() !== formMessage.trim());
                },
            });

            isDirty.watch((isDirty_) => {
                if (isDirty_) {
                    submitButton.disabled = false;
                    message.classList.add("input--dirty");
                } else {
                    submitButton.disabled = true;
                    message.classList.remove("input--dirty");
                }
            }, { isEager: true });

            container.append(
                createForm({
                    className: "space-y-3",
                    async onSubmit(ev) {
                        ev.preventDefault();
                        
                        if (!isDirty.data) {
                            return;
                        }

                        if (data.kind === "commit") {
                            await updateCommitMessage(data.id, formMessage);
                            appContext.commitHistory.update(
                                await getCommitHistory(appContext.characterId)
                            );
                        }
                        
                        if (data.kind === "note") {
                            await updateCampaignNote(data.id, formMessage);
                            appContext.campaignNotes.update(
                                await getCampaignNoteList(appContext.characterId)
                            );
                        }

                        isEditing.update(false);
                    },
                    children: [
                        createDiv({
                            className: "flex justify-end space-x-3",
                            children: [
                                createButton({
                                    text: "cancel",
                                    onClick() {
                                        isEditing.update(false);
                                    },
                                }),
                               submitButton,
                            ]
                        }),
                        message,
                    ],
                }),
            );
        } else {
            container.append(
                createDiv({
                    className: "flex justify-end",
                    children: [
                        createButton({
                            text: "edit message",
                            onClick() {
                                isEditing.update(true);
                            },
                        }),
                    ],
                }),
                ...data.message.split("\n").filter(Boolean).map((line) => createParagraph({
                    children: [
                        line
                    ],
                })),
            );
        }
    }, { isEager: true });

    return container;
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

            function updateViewedHistoryItem(kind, items) {
                if (viewedHistoryItem.data) {
                    items.forEach((item) => {
                        if (kind === viewedHistoryItem.data.kind && item.id === viewedHistoryItem.data.id) {
                            viewedHistoryItem.update(new HistoryListItemData(
                                item.id,
                                item.character_id,
                                kind,
                                item.message,
                                item.created,
                                (item.field_diffs && item.field_diffs.data || [])
                            ))
                        }
                    })
                }
            }

            appContext.campaignNotes.watch((notes) => {
                updateViewedHistoryItem("note", notes);
            });
            
            appContext.commitHistory.watch((commits) => {
                updateViewedHistoryItem("commit", commits);
            });

            appContext.notifications.onOpen(HISTORY_MODAL, (payload) => {
                viewedHistoryItem.update(payload);
                openModal();
            });

            appContext.notifications.onClose(HISTORY_MODAL, closeModal)

            const dataDiv = createDiv({
                className: "space-y-4",
                attrs: {
                    tabindex: 0,
                },
                style: {
                    position: "relative",
                    maxHeight: "600px",
                    width: "100%",
                    overflowY: "scroll"
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

                const message = editableMessage(appContext, data);

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
