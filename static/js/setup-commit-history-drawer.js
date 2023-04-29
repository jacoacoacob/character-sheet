
import { createButton, createDiv, createHeading, createList, createListItem, createSpan } from "./elements.js";
import { clearElement } from "./utils.js";
import { createDrawer } from "./disclosures/drawer.js";
import { getCampaignNoteList, getCommitHistory } from "./fetchers.js";
import { TAB_SAVE_CHANGES } from "./fancy-modal/tc-commit-changes.js";
import { TAB_CAMPAIGN_NOTE } from "./fancy-modal/tc-campaign-note.js";

function groupByDate(items) {
    const groups = items.reduce((accum, item) => {
        const dateCreated = new Date(item.created);
        const date = dateCreated.toDateString();
        if (!accum[date]) {
            accum[date] = []
        }
        accum[date].push({
            time: dateCreated.toLocaleTimeString().replace(/:\d{2}\s/, " "),
            message: item.message,
            tag: item.tag
        });
        return accum;
    }, {});
    
    const sorted = Object
        .keys(groups)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    return sorted.map((date) => ({ date, items: groups[date] }));
}


/**
 * 
 * @param {import("./main.js").Context} context
 */
function setupCommitHistoryDrawer(context) {

    (async () => {
        context.commitHistory.update(
            await getCommitHistory(context.characterId)
        );

        context.campaignNotes.update(
            await getCampaignNoteList(context.characterId)
        );
    })();

    const commitList = createList({
        className: "commit-list space-y-4",
        style: {
            position: "relative",
            border: "1px solid black",
            borderRadius: "4px",
            padding: "8px",
            backgroundColor: "white",
            overflowY: "scroll",
            height: "600px",
            paddingRight: "12px",
        }
    });

    let commits;
    let notes;

    context.commitHistory.watch((data) => {
        commits = data;
        updateList();
    });

    context.campaignNotes.watch((data) => {
        notes = data;
        updateList();
    });

    function updateList() {
        const listGroups = groupByDate([
            ...commits ? commits.map((commit) => ({ ...commit, tag: "commit" })) : [],
            ...notes ? notes.map((note) => ({ ...note, tag: "note" })) : [],
        ]);

        clearElement(commitList);

        commitList.append(
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

    createDrawer({
        container: document.getElementById("commit-history"),
        setupHeader() {
            return [
                createButton({
                    text: "Save changes",
                    onClick(ev) {
                        ev.preventDefault();
                        context.events.send("fancy_modal:open", TAB_SAVE_CHANGES);
                    }
                }),
                createButton({
                    text: "Campaign note",
                    onClick() {
                        context.events.send("fancy_modal:open", TAB_CAMPAIGN_NOTE);
                    }
                }),
            ];
        },
        setupContent() {
            return [
                createDiv({
                    children: [
                        createHeading(4, "History")
                    ]
                }),
                commitList,
            ];
        },
        setupFooter() {
            return [
                createButton({
                    text: "Export as image",
                    async onClick() {
                        const element = document.getElementById("fields-wrapper");

                        const a = document.createElement("a");
                
                        try {
                            const canvas = await html2canvas(element);
                            a.href = canvas.toDataURL();
                            a.download = context.formModel.character_name + "_" + new Date().toDateString().toLowerCase().replace(/\s+/g, "_");
                            a.click();
                        } catch (error) {
                            console.error(error);
                        }
                    },
                }),
            ]
        }
    });
}

export { setupCommitHistoryDrawer };
