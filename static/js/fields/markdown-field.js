import { createButton, createDiv, createLabel, createTextarea } from "../elements.js";
import { checkIsDirty } from "../utils.js";

const ICON_SVG_STRINGS = {
    noPreview: (`
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 2C9.77614 2 10 2.22386 10 2.5V17.5C10 17.7761 9.77614 18 9.5 18C9.22386 18 9 17.7761 9 17.5V2.5C9 2.22386 9.22386 2 9.5 2ZM2 6C2 4.89543 2.89543 4 4 4H8V5H4C3.44772 5 3 5.44772 3 6V14C3 14.5523 3.44772 15 4 15H8V16H4C2.89543 16 2 15.1046 2 14V6ZM15 5C15.5523 5 16 5.44772 16 6V6.5C16 6.77614 16.2239 7 16.5 7C16.7761 7 17 6.77614 17 6.5V6C17 4.89543 16.1046 4 15 4H14.5C14.2239 4 14 4.22386 14 4.5C14 4.77614 14.2239 5 14.5 5H15ZM15 15C15.5523 15 16 14.5523 16 14V13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5V14C17 15.1046 16.1046 16 15 16H14.5C14.2239 16 14 15.7761 14 15.5C14 15.2239 14.2239 15 14.5 15H15ZM16.5 8C16.2239 8 16 8.22386 16 8.5V11.5C16 11.7761 16.2239 12 16.5 12C16.7761 12 17 11.7761 17 11.5V8.5C17 8.22386 16.7761 8 16.5 8ZM12.5 4C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H11.5C11.2239 5 11 4.77614 11 4.5C11 4.22386 11.2239 4 11.5 4H12.5ZM13 15.5C13 15.2239 12.7761 15 12.5 15H11.5C11.2239 15 11 15.2239 11 15.5C11 15.7761 11.2239 16 11.5 16H12.5C12.7761 16 13 15.7761 13 15.5Z" fill="#212121"/>
        </svg>
    `),
    fullPreview: (`
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2.5C10 2.22386 9.77614 2 9.5 2C9.22386 2 9 2.22386 9 2.5V17.5C9 17.7761 9.22386 18 9.5 18C9.77614 18 10 17.7761 10 17.5V2.5ZM2 6C2 4.89543 2.89543 4 4 4H8V16H4C2.89543 16 2 15.1046 2 14V6ZM11 16H15C16.1046 16 17 15.1046 17 14V6C17 4.89543 16.1046 4 15 4H11V16Z" fill="#212121"/>
        </svg>
    `),
    splitPreview: (`
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 2C9.77614 2 10 2.22386 10 2.5V17.5C10 17.7761 9.77614 18 9.5 18C9.22386 18 9 17.7761 9 17.5V2.5C9 2.22386 9.22386 2 9.5 2ZM4 4C2.89543 4 2 4.89543 2 6V14C2 15.1046 2.89543 16 4 16H8V4H4ZM15 5C15.5523 5 16 5.44772 16 6V6.5C16 6.77614 16.2239 7 16.5 7C16.7761 7 17 6.77614 17 6.5V6C17 4.89543 16.1046 4 15 4H14.5C14.2239 4 14 4.22386 14 4.5C14 4.77614 14.2239 5 14.5 5H15ZM15 15C15.5523 15 16 14.5523 16 14V13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5V14C17 15.1046 16.1046 16 15 16H14.5C14.2239 16 14 15.7761 14 15.5C14 15.2239 14.2239 15 14.5 15H15ZM16.5 8C16.2239 8 16 8.22386 16 8.5V11.5C16 11.7761 16.2239 12 16.5 12C16.7761 12 17 11.7761 17 11.5V8.5C17 8.22386 16.7761 8 16.5 8ZM12.5 4C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H11.5C11.2239 5 11 4.77614 11 4.5C11 4.22386 11.2239 4 11.5 4H12.5ZM13 15.5C13 15.2239 12.7761 15 12.5 15H11.5C11.2239 15 11 15.2239 11 15.5C11 15.7761 11.2239 16 11.5 16H12.5C12.7761 16 13 15.7761 13 15.5Z" fill="#212121"/>
        </svg>
    `),
    collapse: (`
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 8.82585L11.3737 9.82437C11.5556 10.0322 11.8714 10.0532 12.0793 9.87141C12.2871 9.68956 12.3081 9.37368 12.1263 9.16586L10.3763 7.16586C10.2814 7.05736 10.1442 6.99512 10 6.99512C9.85583 6.99512 9.71866 7.05736 9.62372 7.16586L7.87372 9.16586C7.69188 9.37368 7.71294 9.68956 7.92075 9.87141C8.12857 10.0532 8.44445 10.0322 8.6263 9.82437L9.50001 8.82583L9.50001 12.5049C9.50001 12.781 9.72387 13.0049 10 13.0049C10.2762 13.0049 10.5 12.781 10.5 12.5049L10.5 8.82585ZM4 16C2.89543 16 2 15.1046 2 14V6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V14C18 15.1046 17.1046 16 16 16H4ZM3 14C3 14.5523 3.44772 15 4 15H16C16.5523 15 17 14.5523 17 14V9H13.1664C13.1049 8.82388 13.0093 8.65636 12.8789 8.50736L11.1289 6.50736C10.8441 6.18184 10.4326 5.99512 10 5.99512C9.56748 5.99512 9.15599 6.18184 8.87115 6.50736L7.12116 8.50736C6.99078 8.65636 6.89517 8.82388 6.83367 9H3V14Z" fill="#212121"/>
        </svg>
    `),
    expand: (`
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 11.1741L11.3737 10.1756C11.5556 9.96781 11.8714 9.94675 12.0793 10.1286C12.2871 10.3104 12.3081 10.6263 12.1263 10.8341L10.3763 12.8341C10.2814 12.9426 10.1442 13.0049 10 13.0049C9.85583 13.0049 9.71866 12.9426 9.62372 12.8341L7.87372 10.8341C7.69188 10.6263 7.71294 10.3104 7.92075 10.1286C8.12857 9.94675 8.44445 9.96781 8.6263 10.1756L9.50001 11.1742L9.50001 7.49512C9.50001 7.21897 9.72387 6.99512 10 6.99512C10.2762 6.99512 10.5 7.21897 10.5 7.49512L10.5 11.1741ZM4 4C2.89543 4 2 4.89543 2 6V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V6C18 4.89543 17.1046 4 16 4H4ZM3 6C3 5.44772 3.44772 5 4 5H16C16.5523 5 17 5.44772 17 6V11H13.1664C13.1049 11.1761 13.0093 11.3436 12.8789 11.4926L11.1289 13.4926C10.8441 13.8182 10.4326 14.0049 10 14.0049C9.56748 14.0049 9.15599 13.8182 8.87115 13.4926L7.12116 11.4926C6.99078 11.3436 6.89517 11.1761 6.83367 11H3V6Z" fill="#212121"/>
        </svg>
    `),
}

const MIN_TEXTAREA_HEIGHT = 288;


function markdownFieldFactory({ formModel, apiModel, dirtyFields }) {
    return (fieldName, fieldLabel) => {

        const PREVIEW_STATE_KEY = location.pathname + "-" + fieldName + "-preview-state";
        const COLLAPSE_STATE_KEY = location.pathname + "-" + fieldName + "collapsed";

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

        function autoSizeHeight(textarea) {
            if (textarea.scrollHeight > 288) {
                const scrollLeft = window.scrollX;
                const scrollTop = window.scrollY;
                textarea.style.height = 0;
                textarea.style.height = textarea.scrollHeight + 10 + "px";
                window.scrollTo(scrollLeft, scrollTop);
            } else {
                textarea.style.height = MIN_TEXTAREA_HEIGHT + "px";
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
            className: "label label--lg label--bold",
            style: {
                fontSize: "20px",
            },
            text: fieldLabel,
            forId: source.id,
        });

        const btnNoPreview = createButton({
            innerHTML: ICON_SVG_STRINGS.noPreview,
            style: {
                padding: "2px",
                paddingBottom: 0,
            },
            onClick(_, self) {
                setPreviewState("no-preview");
            },
        });

        const btnSplitPreview = createButton({
            innerHTML: ICON_SVG_STRINGS.splitPreview,
            style: {
                padding: "2px",
                paddingBottom: 0,
            },
            onClick(_, self) {
                setPreviewState("split-preview");
            },
        });

        const btnFullPreview = createButton({
            innerHTML: ICON_SVG_STRINGS.fullPreview,
            style: {
                padding: "2px",
                paddingBottom: 0,
            },
            onClick(_, self) {
                setPreviewState("full-preview");
            },
        });

        const editor = createDiv({
            className: "flex space-x-4",
            style: {
                paddingTop: "12px",
            },
            children: [
                source,
                html
            ]
        })

        let previewState;
        let previewStateButton;
        function setPreviewState(newState) {
            previewState = newState;
            localStorage[PREVIEW_STATE_KEY] = newState;

            if (previewState === "full-preview") {
                source.style.display = "none";
                html.style.display = "block";
                editor.classList.add("space-x-4");
            } else if (previewState === "split-preview") {
                source.style.display = "block";
                html.style.display = "block";
                editor.classList.add("space-x-4");
            } else if (previewState === "no-preview") {
                source.style.display = "block";
                html.style.display = "none";
                editor.classList.remove("space-x-4");
            }

            if (previewStateButton) {
                previewStateButton.style.boxShadow = "none";
            }
            if (previewState === "full-preview") {
                previewStateButton = btnFullPreview;
            }
            if (previewState === "split-preview") {
                previewStateButton = btnSplitPreview;
            }
            if (previewState === "no-preview") {
                previewStateButton = btnNoPreview;
            }
            previewStateButton.style.boxShadow = "0 0 0 2px black";
            setTimeout(() => {
                autoSizeHeight(source);
            });
        }

        const previewStateButtons = createDiv({
            className: "space-x-2",
            children: [
                btnNoPreview,
                btnSplitPreview,
                btnFullPreview,
            ],
        });

        let isCollapsed = JSON.parse(localStorage[COLLAPSE_STATE_KEY] || false);
        const btnToggleCollapse = createButton({
            style: {
                padding: "2px",
                paddingBottom: 0,
            },
            onClick(_, self) {
                isCollapsed = localStorage[COLLAPSE_STATE_KEY] = !isCollapsed;
                updateCollapseState(self)
            },
        });

        function updateCollapseState(button) {
            if (isCollapsed) {
                previewStateButtons.style.display = "none";
                editor.style.display = "none";
                button.innerHTML = ICON_SVG_STRINGS.expand;
            } else {
                previewStateButtons.style.display = "block";
                editor.style.display = "flex";
                button.innerHTML = ICON_SVG_STRINGS.collapse;
            }
            setPreviewState(localStorage[PREVIEW_STATE_KEY] || "no-preview");
        }

        updateCollapseState(btnToggleCollapse);

        return createDiv({
            children: [
                createDiv({
                    className: "flex justify-between",
                    children: [
                        label,
                        createDiv({
                            className: "flex align-center space-x-4",
                            children: [
                                previewStateButtons,
                                btnToggleCollapse,
                            ],
                        }),
                    ],
                }),
                editor
            ],
        });
    }
}

export { markdownFieldFactory };
