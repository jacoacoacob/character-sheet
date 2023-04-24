
import { createButton, createDiv, createList, createListItem } from "./elements.js";
import { clearElement } from "./utils.js";
import { createDrawer } from "./disclosures/drawer.js";
import { getCommitHistory } from "./fetchers.js";


/**
 * 
 * @param {import("./fetchers.js").Api} api 
 * @param {*} commitHistory 
 */
function setupCommitHistoryDrawer(context) {

    (async () => {
        context.commitHistory.update(
            await getCommitHistory(context.characterId)
        );
    })();

    const commitList = createList({ className: "space-y-3" });

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
                    time: dateCreated.toLocaleTimeString(),
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
                            createDiv({
                                children: [
                                    date,
                                ]
                            }),
                            createList({
                                children: commitsByDate[date].map((commit) => createListItem({
                                    children: [
                                        commit.time,
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
        setup() {
            return [
                createDiv({
                    className: "flex flex-col justify-between flex-1",
                    children: [
                        createDiv({
                            children: [
                                commitList
                            ]
                        }),
                        createDiv({
                            style: {
                                borderTop: "1px solid #bbb",
                                padding: "8px",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                backgroundColor: "#ddd",
                            },
                            children: [
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
                            ],
                        })
                    ],
                }),
            ];
        },
    });
}

export { setupCommitHistoryDrawer };
