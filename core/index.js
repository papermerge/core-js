import "./assets/scss/index.scss";

import { DualCommanderView } from "@papermerge/dual-commander";


function adjust_panels_height() {
    /**
     * Adjusts left and right panels' heights to fit the window size
     *
    */
    let nav,
        panel_height,
        panel_right,
        panel_left,
        margins_total_height;

    nav = document.querySelector("nav.main-header");
    panel_left = document.querySelector("#panel_left");
    panel_right = document.querySelector("#panel_right");
    margins_total_height = 20;

    if (!nav) {
        console.error("nav.main-header not found. Cannot calculate panel height");
        return;
    }

    panel_height = window.innerHeight - nav.clientHeight
    panel_height -= margins_total_height;

    if (panel_left) {
        panel_left.style.height = `${panel_height}px`;
    } else {
        console.error("left panel not found");
        return;
    }
    if (panel_right) {
        panel_right.style.height = `${panel_height}px`;
    } else {
        console.error("right panel not found");
        return;
    }
}

function left_panel_from_url(url_as_string) {
    /*
    Checks url_as_string to figure out the
    starting folder/document of the left panel.

    Returns:
        {commander: true, folder: { id: <folder_id> }}
        or
        {viewer: true, doc: {id: <document_id>} }
        or
        {commander: true}

    Note that left panel will always start as opened;
    if, for various reasons, function is unable to figure out
    the folder/document to open - it will return (or try as
    much as it can) { commander: true }.
    Undefined folder tells commander to open root folder.
    */
    let folder_regexp = /\/core\/folder\/([0-9]+)/,
        viewer_regexp = /\/core\/document\/([0-9]+)/,
        folder_match,
        viewer_match,
        ret = undefined,
        folder_id = undefined;

    folder_match = url_as_string.match(folder_regexp);
    viewer_match = url_as_string.match(viewer_regexp);

    if (folder_match) {
        ret = {
            commander: true,
            folder: { id: folder_match[1] }
        };
    } else if (viewer_match) {
        ret = {
            viewer: true,
            doc: { id: viewer_match[1] }
        };
    } else {
        ret = {
            commander: true
        };
    }

    return ret;
}

function right_panel_from_url(url_as_string) {
    /*
    Checks url_as_string to figure out if right panel needs to be open at
    all, and if it yes, then what is the correct folder/document to open.

    Returns either:
        (1) { commander: true, folder: { id: <folder_id> } }
        or
        (2) { commander: true }
        or
        (3) { viewer: true, doc: { id: <document_id> } }
        or
        (4) undefined

    Meanings are:
    (1) right side panel will start opened with this folder as current
    (2) right side panel will start opened with root folder
    (3) right side viewer will start opened with selected document
    (4) right side panel will start as closed.
    */
    let folder_regexp = /\/core\/folder\/([0-9]+)*/,
        folder_match,
        viewer_regexp = /\/core\/document\/([0-9]+)/,
        viewer_match,
        ret = undefined;

    folder_match = url_as_string.match(folder_regexp);
    viewer_match = url_as_string.match(viewer_regexp);

    if (folder_match && folder_match[1]) {
        ret = {
            commander: true,
            folder: { id: folder_match[1] }
        };
    } else if (viewer_match && viewer_match[1]) {
        ret = {
            viewer: true,
            doc: { id: viewer_match[1] }
        };

    } else if (folder_match) {
        ret = {
            commander: true,
        };
    }

    return ret;
}

document.addEventListener("DOMContentLoaded", () => {
    let dual_commander, left, right;


    dual_commander = new DualCommanderView({
        'panel_left': {'el': '#panel_left'},
        'panel_right': {'el': '#panel_right'},
        'dual_history': true
    });

    left = left_panel_from_url(window.location.pathname);
    right = right_panel_from_url(window.location.search);

    dual_commander.open({
        left: left,
        right: right
    });

    if (!right) {
        dual_commander.on_switch_2_single(
            dual_commander.commander_right,
            dual_commander.commander_left,
        );
    }

    window.addEventListener('resize', adjust_panels_height);
    adjust_panels_height();
});