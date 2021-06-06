import { ActionsView } from "./views/actions";
import { TagPreviewView } from "./views/tag_preview";
import { AdvancedSearchTagsView } from "./views/tags";
import { AutomateTagsView } from "./views/tags";
import { WidgetsBarView } from "./views/widgetsbar";
import { PinnedTagsView } from "./views/pinned_tags_view";
import { ChangelistCheckboxView } from "./views/changelist_checkbox_view";
import { ContextMenuView } from "./views/context_menu";
import { RoleMultiToggleView } from "./views/roles";
import { UserMenuView } from "./views/user_menu";

import { BrowseRouter } from "./routers/browse";

import Backbone from 'backbone';

import $ from "jquery";

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/modal';

let backboneSync = Backbone.sync;

Backbone.sync = function (method, model, options) {
    let csrf_token = $("[name=csrfmiddlewaretoken]").val();
    /*
     * The jQuery `ajax` method includes a 'headers' option
     * which lets you set any headers you like
     */
    options.headers = {
        'X-CSRFToken': csrf_token
    };
    /*
     * Call the stored original Backbone.sync method with
     * extra headers argument added
     */
    backboneSync(method, model, options);
};

let App = function() {

  let browse_view,
    actions_view,
    breadcrumb_view,
    document_view,
    document_actions_view,
    browse_router,
    tag_preview_view,
    pinned_tags_view,
    changelist_checkbox,
    av_tags_view,
    automate_tags_view,
    widgetsbar_view,
    context_menu_view,
    role_multi_toggle_view,
    user_menu_view,
    wfeedback;

  actions_view = new ActionsView();
  tag_preview_view = new TagPreviewView();
  pinned_tags_view = new PinnedTagsView();
  changelist_checkbox = new ChangelistCheckboxView();
  av_tags_view = new AdvancedSearchTagsView();
  automate_tags_view = new AutomateTagsView();
  widgetsbar_view = new WidgetsBarView();
  context_menu_view = new ContextMenuView();
  role_multi_toggle_view = new RoleMultiToggleView();
  user_menu_view = new UserMenuView();

};

$(function(event) {
  App();
});
