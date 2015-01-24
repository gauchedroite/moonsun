var Payload = require("./app.payload");
var dispatcher = require("./app.dispatcher");
var AppActions = (function () {
    function AppActions() {
    }
    AppActions.clicked = function () {
        dispatcher.dispatch({ actionName: Payload.Action.CLICK });
    };
    return AppActions;
})();
module.exports = AppActions;
