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
    ActionTypes.CHANGE_CINEMA = "CHANGE_CINEMA";
    ActionTypes.SHOW_ANIM = "SHOW_ANIM";
    ActionTypes.SHOW_DESCRIPTION = "SHOW_DESCRIPTION";
    ActionTypes.HIDE_DESCRIPTION = "HIDE_DESCRIPTION";
    return ActionTypes;
})();
exports.ActionTypes = ActionTypes;
