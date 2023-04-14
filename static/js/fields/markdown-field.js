import { createButton, createDiv, createLabel, createTextarea } from "../elements.js";
import { checkIsDirty } from "../utils.js";


function markdownFieldFactory({ formModel, apiModel, dirtyFields }) {
    return (fieldName, fieldLabel) => {
        const MIN_TEXTAREA_HEIGHT = 288;

        const source = createTextarea({
            className: "textarea flex-1",
            style: {
                height: MIN_TEXTAREA_HEIGHT + "px",
                width: "100%"
            },
            attrs: {
                id: fieldName,
            },
            onInput(ev) {
                formModel[fieldName].source = ev.target.value.trim();
                fetchMarkdownPreivew(500);
                autoSizeHeight(ev.target);
                checkIsDirty(
                    ev.target,
                    formModel[fieldName].source,
                    apiModel[fieldName].source,
                    dirtyFields
                );
            },
        });

        source.addEventListener("keydown", (ev) => {
            if (ev.key === "Tab") {
                ev.preventDefault();
                const SPACES = "\t";
                const start = source.selectionStart;
                const end = source.selectionEnd;
                source.value = source.value.slice(0, start) + SPACES + source.value.slice(end);
                source.selectionStart = source.selectionEnd = start + SPACES.length;
            }
        });

        function autoSizeHeight(element) {
            if (element.scrollHeight > 288) {
                const scrollLeft = window.scrollX;
                const scrollTop = window.scrollY;
                element.style.height = 0;
                element.style.height = element.scrollHeight + 10 + "px";
                window.scrollTo(scrollLeft, scrollTop);
            } else {
                element.style.height = MIN_TEXTAREA_HEIGHT + "px";
            }
        }

        const html = createDiv({ className: "md flex-1" });

        html.innerHTML = formModel[fieldName].html;

        source.value = formModel[fieldName].source;

        let handle;
        function fetchMarkdownPreivew(delayMillis) {
            clearTimeout(handle);
            handle = setTimeout(async () => {
                const response = await fetch("/md-preview", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        source: formModel[fieldName].source,
                    }),
                });
                const data = await response.json();
                html.innerHTML = data.html;
            }, delayMillis);
        }

        const label = createLabel({
            className: "label label--bold",
            text: fieldLabel,
            forId: source.id,
        });

        const btnNoPreview = createButton({
            innerHTML: `
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 2C9.77614 2 10 2.22386 10 2.5V17.5C10 17.7761 9.77614 18 9.5 18C9.22386 18 9 17.7761 9 17.5V2.5C9 2.22386 9.22386 2 9.5 2ZM2 6C2 4.89543 2.89543 4 4 4H8V5H4C3.44772 5 3 5.44772 3 6V14C3 14.5523 3.44772 15 4 15H8V16H4C2.89543 16 2 15.1046 2 14V6ZM15 5C15.5523 5 16 5.44772 16 6V6.5C16 6.77614 16.2239 7 16.5 7C16.7761 7 17 6.77614 17 6.5V6C17 4.89543 16.1046 4 15 4H14.5C14.2239 4 14 4.22386 14 4.5C14 4.77614 14.2239 5 14.5 5H15ZM15 15C15.5523 15 16 14.5523 16 14V13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5V14C17 15.1046 16.1046 16 15 16H14.5C14.2239 16 14 15.7761 14 15.5C14 15.2239 14.2239 15 14.5 15H15ZM16.5 8C16.2239 8 16 8.22386 16 8.5V11.5C16 11.7761 16.2239 12 16.5 12C16.7761 12 17 11.7761 17 11.5V8.5C17 8.22386 16.7761 8 16.5 8ZM12.5 4C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H11.5C11.2239 5 11 4.77614 11 4.5C11 4.22386 11.2239 4 11.5 4H12.5ZM13 15.5C13 15.2239 12.7761 15 12.5 15H11.5C11.2239 15 11 15.2239 11 15.5C11 15.7761 11.2239 16 11.5 16H12.5C12.7761 16 13 15.7761 13 15.5Z" fill="#212121"/>
                </svg>
            `,
            style: {
                padding: "2px",
                paddingBottom: 0,
            },
            onClick(_, self) {
                setState("no-preview");
            },
        });

        const btnSplitPreview = createButton({
            innerHTML: `
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 2C9.77614 2 10 2.22386 10 2.5V17.5C10 17.7761 9.77614 18 9.5 18C9.22386 18 9 17.7761 9 17.5V2.5C9 2.22386 9.22386 2 9.5 2ZM4 4C2.89543 4 2 4.89543 2 6V14C2 15.1046 2.89543 16 4 16H8V4H4ZM15 5C15.5523 5 16 5.44772 16 6V6.5C16 6.77614 16.2239 7 16.5 7C16.7761 7 17 6.77614 17 6.5V6C17 4.89543 16.1046 4 15 4H14.5C14.2239 4 14 4.22386 14 4.5C14 4.77614 14.2239 5 14.5 5H15ZM15 15C15.5523 15 16 14.5523 16 14V13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5V14C17 15.1046 16.1046 16 15 16H14.5C14.2239 16 14 15.7761 14 15.5C14 15.2239 14.2239 15 14.5 15H15ZM16.5 8C16.2239 8 16 8.22386 16 8.5V11.5C16 11.7761 16.2239 12 16.5 12C16.7761 12 17 11.7761 17 11.5V8.5C17 8.22386 16.7761 8 16.5 8ZM12.5 4C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H11.5C11.2239 5 11 4.77614 11 4.5C11 4.22386 11.2239 4 11.5 4H12.5ZM13 15.5C13 15.2239 12.7761 15 12.5 15H11.5C11.2239 15 11 15.2239 11 15.5C11 15.7761 11.2239 16 11.5 16H12.5C12.7761 16 13 15.7761 13 15.5Z" fill="#212121"/>
                </svg>
            `,
            style: {
                padding: "2px",
                paddingBottom: 0,
            },
            onClick(_, self) {
                setState("split-preview");
            },
        });

        const btnFullPreview = createButton({
            innerHTML: `
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2.5C10 2.22386 9.77614 2 9.5 2C9.22386 2 9 2.22386 9 2.5V17.5C9 17.7761 9.22386 18 9.5 18C9.77614 18 10 17.7761 10 17.5V2.5ZM2 6C2 4.89543 2.89543 4 4 4H8V16H4C2.89543 16 2 15.1046 2 14V6ZM11 16H15C16.1046 16 17 15.1046 17 14V6C17 4.89543 16.1046 4 15 4H11V16Z" fill="#212121"/>
                </svg>
            `,
            style: {
                padding: "2px",
                paddingBottom: 0,
            },
            onClick(_, self) {
                setState("full-preview");
            },
        });

        const editor = createDiv({
            className: "flex space-x-4",
            children: [
                source,
                html
            ]
        })

        let currentState;
        let activeButton;
        function setState(newState) {
            currentState = newState;

            localStorage[location.pathname + "-" + fieldName] = newState;

            if (currentState === "full-preview") {
                source.style.display = "none";
                html.style.display = "block";
                editor.classList.add("space-x-4");
            } else if (currentState === "split-preview") {
                source.style.display = "block";
                html.style.display = "block";
                editor.classList.add("space-x-4");
            } else if (currentState === "no-preview") {
                source.style.display = "block";
                html.style.display = "none";
                editor.classList.remove("space-x-4");
            }

            if (activeButton) {
                activeButton.style.boxShadow = "none";
            }
            if (currentState === "full-preview") {
                activeButton = btnFullPreview;
            }
            if (currentState === "split-preview") {
                activeButton = btnSplitPreview;
            }
            if (currentState === "no-preview") {
                activeButton = btnNoPreview;
            }
            activeButton.style.boxShadow = "0 0 0 2px black";
            setTimeout(() => {
                autoSizeHeight(source);
            });
        }

        setState(localStorage[location.pathname + "-" + fieldName] || "no-preview")

        return createDiv({
            className: "space-y-3",
            children: [
                createDiv({
                    className: "flex justify-between",
                    children: [
                        label,
                        createDiv({
                            className: "space-x-2",
                            children: [
                                btnNoPreview,
                                btnSplitPreview,
                                btnFullPreview,
                            ]
                        })
                    ],
                }),
                editor
            ],
        });
    }
}

export { markdownFieldFactory };
