
import { createButton, createDiv, createList, createListItem, createSpan } from "./elements.js";
import { clearElement } from "./utils.js";

const ITEM_KIND_COMMIT = "commit";
const ITEM_KIND_NOTE = "note";

class FieldDiff {
    constructor(oldValue, newValue, fieldName) {
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.fieldName = fieldName;
    }
}

class HistoryListItemData {
    /**
     * 
     * @param {number} id
     * @param {"note" | "commit"} kind 
     * @param {string} message 
     * @param {string} created 
     * @param {any[]} diffs
     */
    constructor(id, kind, message, created, diffs) {
        this.id = id;
        this.kind = kind;
        this.message = message;
        this.created = new Date(created);
        this.dateCreated = this.created.toDateString();
        this.timeCreated = this.created.toLocaleTimeString().replace(/:\d{2}\s/, " ");
        this.diffs = (diffs || []).map((diff) => new FieldDiff(diff.old, diff.new, diff.field_name));
    }
}

function groupByDate(items) {
    /**
     * @type {Record<string, HistoryListItemData[]>}
     */
    const groups = items.reduce((accum, x) => {
        const item = new HistoryListItemData(
            x.id,
            x.kind,
            x.message,
            x.created,
            (x.field_diffs && x.field_diffs.data || [])
        );
        if (!accum[item.dateCreated]) {
            accum[item.dateCreated] = []
        }
        accum[item.dateCreated].push(item);
        return accum;
    }, {});
    
    return Object
        .keys(groups)
        .sort((a, b) => new Date(b) - new Date(a))
        .map((date) => ({
            date,
            items: groups[date].sort((a, b) => b.created - a.created),
        }));
}

/**
 * @typedef HistoryListItemOptions
 * @property {((ev: MouseEvent, data: HistoryListItemData) => void) | undefined} onClick
 * @property {(isSelected: boolean) => CSSStyleDeclaration} itemStyle
 * @property {number | undefined} messageMaxLength 
 */


/**
 * @param {HistoryListItemData} data
 * @param {HistoryListItemOptions} options
 */
function mapHistoryListItem(data, options = {}) {
    const isButton = typeof options.onClick === "function";

    function getMessage() {
        if (
            typeof options.messageMaxLength === "number" &&
            data.message.length > options.messageMaxLength
        ) {
            return data.message.slice(0, options.messageMaxLength) + "...";
        }
        return data.message;
    }

    return createListItem({
        className: isButton ? "flex" : "",
        style: {
            padding: isButton ? "0" : "12px",
            backgroundColor: "whitesmoke",
        },
        attrs: {
            id: data.kind + "_" + data.id,
        },
        children: isButton
            ? [
                createButton({
                    className: "flex-1",
                    style: {
                        backgroundColor: "transparent",
                        display: "block",
                        border: "none",
                        textAlign: "start",
                        padding: "12px",
                    },
                    children: [
                        createDiv({
                            style: {
                                fontSize: "12px",
                            },
                            children: [
                                data.kind.toUpperCase() + " @ " + data.timeCreated,
                            ]
                        }),
                        getMessage(),
                    ],
                    onClick(ev) {
                        options.onClick(ev, data);
                    },
                })
            ]
            : [
            createDiv({
                style: {
                    fontSize: "12px",
                },
                children: [
                    data.kind.toUpperCase() + " @ " + data.timeCreated,
                ]
            }),
            getMessage(),
        ],
    });
}



/**
 * 
 * @param {import("./main.js").Context} appContext 
 * @param {{
 *  item?: HistoryListItemOptions;
 *  listStyles?: CSSStyleDeclaration;
 * }} options
 */
function createHistoryList(appContext, options = {}) {

    const historyList = createList({
        className: "commit-list space-y-4",
        style: {
            position: "relative",
            border: "1px solid black",
            borderRadius: "4px",
            padding: "8px",
            backgroundColor: "white",
            overflowY: "scroll",
            maxHeight: "550px",
            paddingRight: "12px",
            ...(options.listStyles || {})
        }
    });

    let commits;
    let notes;

    appContext.commitHistory.watch((data) => {
        commits = data;
        updateHistoryList();
    });

    appContext.campaignNotes.watch((data) => {
        notes = data;
        updateHistoryList();
    });

    function updateHistoryList() {
        const listGroups = groupByDate([
            ...commits ? commits.map((commit) => ({ ...commit, kind: ITEM_KIND_COMMIT })) : [],
            ...notes ? notes.map((note) => ({ ...note, kind: ITEM_KIND_NOTE })) : [],
        ]);

        clearElement(historyList);

        historyList.append(
            ...listGroups.map(({ date, items }) => createListItem({
                className: "space-y-3",
                children: [
                    createSpan({
                        style: {
                            display: "inline-block",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "black",
                            color: "whitesmoke",
                            padding: "4px",
                            borderRadius: "4px",
                        },
                        children: [
                            date,
                        ],
                    }),
                    createList({
                        className: "space-y-3",
                        children: items.map((data) => mapHistoryListItem(data, options.item)),
                    }),
                ],
            })),
        );
    }

    return historyList;
}

export { createHistoryList };
