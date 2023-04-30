
import { createDiv, createList, createListItem, createSpan } from "./elements.js";
import { clearElement } from "./utils.js";

function groupByDate(items) {
    const groups = items.reduce((accum, item) => {
        const dateTime = new Date(item.created);
        const date = dateTime.toDateString();
        if (!accum[date]) {
            accum[date] = []
        }
        accum[date].push({
            ...item,
            dateTime,
            time: dateTime.toLocaleTimeString().replace(/:\d{2}\s/, " "),
        });
        return accum;
    }, {});
    
    return Object
        .keys(groups)
        .sort((a, b) => new Date(b) - new Date(a))
        .map((date) => ({
            date,
            items: groups[date].sort((a, b) => b.dateTime - a.dateTime),
        }));
}

/**
 * 
 * @param {import("./main.js").Context} appContext 
 */
function createHistoryList(appContext) {

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
            ...commits ? commits.map((commit) => ({ ...commit, tag: "commit" })) : [],
            ...notes ? notes.map((note) => ({ ...note, tag: "note" })) : [],
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
                        children: items.map((item) => createListItem({
                            style: {
                                padding: "12px",
                                backgroundColor: "whitesmoke",
                            },
                            children: [
                                createDiv({
                                    style: {
                                        fontSize: "12px",
                                    },
                                    children: [
                                        item.tag.toUpperCase() + " @ " + item.time,
                                    ]
                                }),
                                item.message,
                            ],
                        })),
                    }),
                ],
            })),
        );
    }

    return historyList;
}

export { createHistoryList };
