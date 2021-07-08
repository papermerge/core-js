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
    Looks at window.location to figure out the
    starting folder/document of the left panel.

    Returns:
        {commander: true, folder: { id: <folder_id> }}
        or
        {viewer: true, doc: {id: <document_id>} }

    Note that left panel will always start as opened, as such
    if, for various reasons, function is unable to figure out
    the folder/document to open - it will return (or try as
    much as it can) { commander: true, folder: undefined }.
    Undefined folder tells commander to open root folder.
    */
    let regexp = /\/core\/folder\/([0-9]+)/,
        _match,
        ret = undefined,
        folder_id = undefined;

    _match = url_as_string.match(regexp);

    if (_match) {
        ret = {
            commander: true,
            folder: { id: _match[1] }
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
    Looks at window.location to figure out if right panel needs to
    be open at all, and if it yes, then what is the correct
    folder/document to open.

    Returns either:
        { commander: true, folder: { id: <folder_id> } }
        or
        { viewer: true, doc: { id: <document_id> } }
        or
        undefined

    In case of undefined return value, it signals that
    right side panel will start as closed.
    */
    let regexp = /\/core\/folder\/([0-9]+)/,
        _match,
        ret = undefined;

    _match = url_as_string.match(regexp);

    if (_match) {
        ret = {
            commander: true,
            folder: { id: _match[1] }
        };
    }

    return ret;
}

document.addEventListener("DOMContentLoaded", () => {
    let dual_commander, left, right;


    dual_commander = new DualCommanderView({
        'panel_left': {'el': '#panel_left'},
        'panel_right': {'el': '#panel_right'},
    });

    left = left_panel_from_url(window.location.pathname);
    console.log(`left = ${left}`);

    right = right_panel_from_url(window.location.search);
    console.log(` right= ${right}`);

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