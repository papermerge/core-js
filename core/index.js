import "./assets/scss/index.scss";

import $ from "jquery";
import { DualCommanderView } from "@papermerge/dual-commander";

function adjust_panels_height() {
    /**
     * Adjusts left and right panels' heights to fit the window size
     *
    */
    let nav,
        actions,
        panel_height,
        margins_total_height;

    nav = document.querySelector("nav.main-header");
    actions = document.querySelector("#actions");
    panel_left = document.querySelector("#panel_left");
    panel_right = document.querySelector("#panel_right");
    margins_total_height = 20;

    if (!nav) {
        console.error("nav.main-header not found. Cannot calculate panel height");
        return;
    }

    if (!actions) {
        console.error("#actions not found. Cannot calculate panel height");
        return;
    }

    panel_height = window.innerHeight - nav.clientHeight - actions.clientHeight;
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

$(() => {
    let dual_commander;


    dual_commander = new DualCommanderView({
        'panel_left': {'el': '#panel_left'},
        'panel_right': {'el': '#panel_right'},
    });

    dual_commander.open({
        left: {commander: true},
        right: {commander: true},
    });
    dual_commander.panel_view_left.on('document_clicked', (doc) => {
        alert(`Panel Left: doc id=${doc.id} title=${doc.title} clicked`);
    });

    dual_commander.panel_view_right.on('document_clicked', (doc) => {
        alert(`Panel Right: doc id=${doc.id} title=${doc.title} clicked`);
    });

    window.addEventListener('resize', adjust_panels_height);
    adjust_panels_height();
});