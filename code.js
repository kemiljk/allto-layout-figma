figma.showUI(__html__, { width: 300, height: 770 });
const { selection } = figma.currentPage;
function makeSelection(node) {
    if (figma.currentPage.selection.length > 0) {
        var itemSpacing = node.itemSpacing;
        figma.ui.postMessage({ itemSpacing: itemSpacing });
        var padding = node.paddingTop === node.paddingBottom &&
            node.paddingLeft === node.paddingRight
            ? node.paddingTop
            : null;
        figma.ui.postMessage({ padding: padding });
        var paddingTop = node.paddingTop;
        figma.ui.postMessage({ paddingTop: paddingTop });
        var paddingBottom = node.paddingBottom;
        figma.ui.postMessage({ paddingBottom: paddingBottom });
        var paddingLeft = node.paddingLeft;
        figma.ui.postMessage({ paddingLeft: paddingLeft });
        var paddingRight = node.paddingRight;
        figma.ui.postMessage({ paddingRight: paddingRight });
    }
    return;
}
figma.on("selectionchange", () => {
    makeSelection(figma.currentPage.selection[0]);
});
figma.ui.onmessage = (msg) => {
    if (msg.selectCheckboxOn === true) {
        async function alltoLayout() {
            if (msg.type === "vertical") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.layoutMode = msg.direction;
                });
                figma.notify("Layout direction set to vertical");
            }
            if (msg.type === "horizontal") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.layoutMode = msg.direction;
                });
                figma.notify("Layout direction set to horizontal");
            }
            if (msg.type === "item-spacing") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.itemSpacing = msg.itemSpacingValue;
                });
                figma.notify(`Item spacing updated to ${msg.itemSpacingValue}`);
            }
            if (msg.type === "padding") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingTop = msg.paddingValue;
                    frame.paddingBottom = msg.paddingValue;
                    frame.paddingLeft = msg.paddingValue;
                    frame.paddingRight = msg.paddingValue;
                });
                figma.notify(`Padding updated to ${msg.paddingValue}`);
            }
            if (msg.type === "padding-top") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingTop = msg.paddingTopValue;
                });
                figma.notify(`Top padding updated to ${msg.paddingTopValue}`);
            }
            if (msg.type === "padding-bottom") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingBottom = msg.paddingBottomValue;
                });
                figma.notify(`Bottom padding updated to ${msg.paddingBottomValue}`);
            }
            if (msg.type === "padding-left") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingLeft = msg.paddingLeftValue;
                });
                figma.notify(`Left padding updated to ${msg.paddingLeftValue}`);
            }
            if (msg.type === "padding-right") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingRight = msg.paddingRightValue;
                });
                figma.notify(`Right padding updated to ${msg.paddingRightValue}`);
            }
            if (msg.type === "alignment") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.primaryAxisAlignItems = msg.alignmentValue;
                });
                figma.notify("Alignment updated");
            }
            if (msg.type === "counterAlignment") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.counterAxisAlignItems = msg.counterAlignmentValue;
                });
                figma.notify("Alignment updated");
            }
            if (msg.type === "resize") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.primaryAxisSizingMode = msg.resizeValue;
                });
                msg.resizeValue === "FIXED"
                    ? figma.notify("Updated to Fixed")
                    : figma.notify("Updated to Hug contents");
            }
            if (msg.type === "counterResize") {
                figma.currentPage.selection
                    .filter((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.counterAxisSizingMode = msg.counterResizeValue;
                });
                msg.counterResizeValue === "FIXED"
                    ? figma.notify("Updated to Fixed")
                    : figma.notify("Updated to Hug contents");
            }
            if (msg.type === "fixedSize") {
                let fixedChild;
                const parentNodes = figma.currentPage.selection.filter((node) => node.type === "FRAME");
                parentNodes.forEach((parentFrames) => {
                    for (fixedChild of parentFrames.children) {
                        fixedChild.layoutAlign = msg.fixedSize;
                        fixedChild.layoutGrow = 0;
                    }
                });
                figma.notify("Updated to Fixed size");
            }
            if (msg.type === "fillContainer") {
                let fillChild;
                const parentNodes = figma.currentPage.selection.filter((node) => node.type === "FRAME");
                parentNodes.forEach((parentFrames) => {
                    for (fillChild of parentFrames.children) {
                        fillChild.layoutAlign = msg.fillContainer;
                        fillChild.layoutGrow = 1;
                    }
                });
                figma.notify("Updated to Fill container");
            }
            if (msg.checkboxOn === true) {
                figma.closePlugin();
            }
        }
        alltoLayout();
    }
    if (msg.selectCheckboxOn === false) {
        async function alltoLayoutAll() {
            if (msg.type === "vertical") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.layoutMode = msg.direction;
                });
                figma.notify("Layout direction set to vertical");
            }
            if (msg.type === "horizontal") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.layoutMode = msg.direction;
                });
                figma.notify("Layout direction set to horizontal");
            }
            if (msg.type === "item-spacing") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.itemSpacing = msg.itemSpacingValue;
                });
                figma.notify(`Item spacing updated to ${msg.itemSpacingValue}`);
            }
            if (msg.type === "padding") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingTop = msg.paddingValue;
                    frame.paddingBottom = msg.paddingValue;
                    frame.paddingLeft = msg.paddingValue;
                    frame.paddingRight = msg.paddingValue;
                });
                figma.notify(`Padding updated to ${msg.paddingValue}`);
            }
            if (msg.type === "padding-top") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingTop = msg.paddingTopValue;
                });
                figma.notify(`Top padding updated to ${msg.paddingTopValue}`);
            }
            if (msg.type === "padding-bottom") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingBottom = msg.paddingBottomValue;
                });
                figma.notify(`Bottom padding updated to ${msg.paddingBottomValue}`);
            }
            if (msg.type === "padding-left") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingLeft = msg.paddingLeftValue;
                });
                figma.notify(`Left padding updated to ${msg.paddingLeftValue}`);
            }
            if (msg.type === "padding-right") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.paddingRight = msg.paddingRightValue;
                });
                figma.notify(`Right padding updated to ${msg.paddingRightValue}`);
            }
            if (msg.type === "alignment") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.primaryAxisAlignItems = msg.alignmentValue;
                });
                figma.notify("Alignment updated");
            }
            if (msg.type === "counterAlignment") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.counterAxisAlignItems = msg.counterAlignmentValue;
                });
                figma.notify("Alignment updated");
            }
            if (msg.type === "resize") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.primaryAxisSizingMode = msg.resizeValue;
                });
                msg.resizeValue === "FIXED"
                    ? figma.notify("Updated to Fixed")
                    : figma.notify("Updated to Hug contents");
            }
            if (msg.type === "counterResize") {
                figma.currentPage
                    .findAll((node) => node.type === "FRAME")
                    .forEach((frame) => {
                    frame.counterAxisSizingMode = msg.counterResizeValue;
                });
                msg.counterResizeValue === "FIXED"
                    ? figma.notify("Updated to Fixed")
                    : figma.notify("Updated to Hug contents");
            }
            if (msg.type === "fixedSize") {
                let fixedChild;
                const parentNodes = figma.currentPage.findAll((node) => node.type === "FRAME");
                parentNodes.forEach((parentFrames) => {
                    for (fixedChild of parentFrames.children) {
                        fixedChild.layoutAlign = msg.fixedSize;
                        fixedChild.layoutGrow = 0;
                    }
                });
                figma.notify("Updated to Fixed size");
            }
            if (msg.type === "fillContainer") {
                let fillChild;
                const parentNodes = figma.currentPage.findAll((node) => node.type === "FRAME");
                parentNodes.forEach((parentFrames) => {
                    for (fillChild of parentFrames.children) {
                        fillChild.layoutAlign = msg.fillContainer;
                        fillChild.layoutGrow = 1;
                    }
                });
                figma.notify("Updated to Fill container");
            }
            if (msg.checkboxOn === true) {
                figma.closePlugin();
            }
        }
        alltoLayoutAll();
    }
};
