import { createDiv } from "./elements.js";

function fieldGroup({ flex = null, root } = {}) {
    const isFlex = typeof flex === "number";
    return createDiv({
        className: `flex ${isFlex ? "flex-" + flex : ""}`.trim(),
        children: [
            createDiv({
                className: `field-group ${isFlex ? "flex-" + flex : ""}`.trim(),
                children: [
                    root,
                ],
            }),
        ],
    });
} 

export { fieldGroup };
