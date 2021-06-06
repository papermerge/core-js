import "./assets/scss/index.scss";

import $ from "jquery";
import { DualCommanderView } from "@papermerge/dual-commander";

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
});