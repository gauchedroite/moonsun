var PayloadSources = (function () {
    function PayloadSources() {
    }
    PayloadSources.VIEW_ACTION = "VIEW_ACTION";
    PayloadSources.SERVER_ACTION = "SERVER_ACTION";
    return PayloadSources;
})();
exports.PayloadSources = PayloadSources;
var ActionTypes = (function () {
    function ActionTypes() {
    }
    ActionTypes.CLICK = "CLICK";
    ActionTypes.HIDE_RUNNING = "HIDE_RUNNING";
    ActionTypes.CHANGE_CINEMA = "CHANGE_CINEMA";
    ActionTypes.SHOW_ANIM = "SHOW_ANIM";
    ActionTypes.SHOW_DESCRIPTION = "SHOW_DESCRIPTION";
    ActionTypes.SHOW_POP = "SHOW_POP";
    ActionTypes.HIDE_POP = "HIDE_POP";
    ActionTypes.SET_HEAD = "SET_HEAD";
    ActionTypes.SHOW_LINE = "SHOW_LINE";
    ActionTypes.SHOW_QUEST = "SHOW_QUEST";
    ActionTypes.SELECT_QUEST = "SELECT_QUEST";
    ActionTypes.QUEST_ANIM_DONE = "QUEST_ANIM_DONE";
    ActionTypes.SHOW_FEEDBACK = "SHOW_FEEDBACK";
    ActionTypes.HIDE_FEEDBACK = "HIDE_FEEDBACK";
    ActionTypes.SHOW_MENU = "SHOW_MENU";
    ActionTypes.SELECT_MENU = "SELECT_MENU";
    ActionTypes.MENU_ANIM_DONE = "MENU_ANIM_DONE";
    return ActionTypes;
})();
exports.ActionTypes = ActionTypes;
var RunnerActions = (function () {
    function RunnerActions() {
    }
    RunnerActions.ANIM = "ANIM";
    RunnerActions.DESC = "DESC";
    RunnerActions.POP = "POP";
    RunnerActions.HEAD = "HEAD";
    RunnerActions.LINE = "LINE";
    RunnerActions.QUEST = "QUEST";
    RunnerActions.MENU = "MENU";
    return RunnerActions;
})();
exports.RunnerActions = RunnerActions;
