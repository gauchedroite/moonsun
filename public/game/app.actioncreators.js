var Payload = require("./app.payload");
var dispatcher = require("./app.dispatcher");
var AppActionCreators = (function () {
    function AppActionCreators() {
    }
    AppActionCreators.clicked = function () {
        var action = {
            type: Payload.ActionTypes.CLICK
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.showAnim = function (text, url, nextEvent) {
        var action = {
            type: Payload.ActionTypes.SHOW_ANIM,
            data: {
                text: text,
                url: url,
                nextEvent: nextEvent
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.showDescription = function (text, nextEvent) {
        var action = {
            type: Payload.ActionTypes.SHOW_DESCRIPTION,
            data: {
                text: text,
                nextEvent: nextEvent
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.hideDescription = function () {
        var action = {
            type: Payload.ActionTypes.HIDE_DESCRIPTION
        };
        dispatcher.handleViewAction(action);
    };
    return AppActionCreators;
})();
module.exports = AppActionCreators;
