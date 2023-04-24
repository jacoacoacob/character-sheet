
import { createButton, createDiv, createList, createListItem } from "./elements.js";
import { clearElement } from "./utils.js";
import { createDrawer } from "./disclosures/drawer.js";

/**
 * 
 * @param {import("./api.js").Api} api 
 * @param {*} commitHistory 
 */
async function setupCommitHistoryDrawer(api, commitHistory) {

    commitHistory.update(
        await api.fetchCommitHistory()
    );

    const commitList = createList({ className: "space-y-3" });

    commitHistory.watch(
        (commits) => {
            clearElement(commitList);

            commitList.append(
                ...commits.map((commit) => createListItem({
                    className: "flex flex-col space-y-2",
                    children: [
                        createDiv({
                            style: {
                                fontSize: "12px",
                            },
                            children: [
                                new Date(commit.created).toLocaleString(),
                            ]
                        }),
                        commit.message
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
