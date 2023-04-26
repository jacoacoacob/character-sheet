
import { createButton, createDiv, createHeader, createList, createListItem, createSpan } from "./elements.js";
import { clearElement } from "./utils.js";
import { createDrawer } from "./disclosures/drawer.js";
import { getCommitHistory } from "./fetchers.js";


/**
 * 
 * @param {import("./main.js").Context} context
 */
function setupCommitHistoryDrawer(context) {

    (async () => {
        context.commitHistory.update(
            await getCommitHistory(context.characterId)
        );
    })();

    const commitList = createList({
        className: "commit-list space-y-3",
        style: {
            position: "relative",
            overflowY: "scroll",
            height: "500px",
            paddingRight: "12px",
        }
    });

    context.commitHistory.watch(
        (commits) => {
            clearElement(commitList);

            const commitsByDate = commits.reduce((accum, commit) => {
                const dateCreated = new Date(commit.created);
                const date = dateCreated.toDateString();
                if (!accum[date]) {
                    accum[date] = []
                }
                accum[date].push({
                    time: dateCreated.toLocaleTimeString().replace(/:\d{2}\s/, " "),
                    message: commit.message,
                });
                return accum;
            }, {});

            commitList.append(
                ...Object
                    .keys(commitsByDate)
                    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                    .map((date) => createListItem({
                        children: [
                            createSpan({
                                style: {
                                    position: "sticky",
                                    top: 0,
                                    backgroundColor: "white",
                                    padding: "4px",
                                    border: "1px solid #aaa",
                                    borderRadius: "4px",
                                },
                                children: [
                                    date,
                                ]
                            }),

                            createList({
                                children: commitsByDate[date].map((commit) => createListItem({
                                    style: {
                                        paddingTop: "12px",
                                    },
                                    children: [
                                        createDiv({
                                            style: {
                                                fontSize: "12px",
                                            },
                                            children: [
                                                commit.time,
                                            ]
                                        }),
                                        commit.message,
                                    ],
                                })),
                            }),
                        ],
                    })),
            );
        },
        { isEager: true }
    );

    createDrawer({
        container: document.getElementById("commit-history"),
        setupHeader() {
            return [
                createButton({
                    text: "Save changes",
                }),
                createButton({
                    text: "Take note",
                }),
            ];
        },
        setupContent() {
            return [
                createDiv({
                    children: [
                        createHeader(4, "History")
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
                            a.download = formModel.character_name + "_" + new Date().toDateString().toLowerCase().replace(/\s+/g, "_");
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
