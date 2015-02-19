var Payload = require("./app.payload");
var dispatcher = require("./app.dispatcher");
var AppActionCreators = (function () {
    function AppActionCreators() {
    }
    AppActionCreators.fire = function (action) {
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.clicked = function () {
        var action = {
            type: Payload.ActionTypes.CLICK
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.hideRunningPrepareNextFire = function (now, next, nextAction) {
        var action = {
            type: Payload.ActionTypes.HIDE_RUNNING,
            data: {
                now: now,
                next: next,
                nextAction: nextAction
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.buildShowAnim = function (text, url) {
        return {
            type: Payload.ActionTypes.SHOW_ANIM,
            data: {
                text: text,
                url: url
            }
        };
    };
    AppActionCreators.showAnim = function (text, url) {
        var action = AppActionCreators.buildShowAnim(text, url);
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.buildShowDescription = function (text) {
        return {
            type: Payload.ActionTypes.SHOW_DESCRIPTION,
            data: {
                text: text
            }
        };
    };
    AppActionCreators.showDescription = function (text) {
        var action = AppActionCreators.buildShowDescription(text);
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.showPop = function (text) {
        var action = {
            type: Payload.ActionTypes.SHOW_POP,
            data: {
                text: text
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.hidePop = function () {
        var action = {
            type: Payload.ActionTypes.HIDE_POP
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.setHead = function (talker, url) {
        var action = {
            type: Payload.ActionTypes.SET_HEAD,
            data: {
                talker: talker,
                url: url
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.buildShowLine = function (text) {
        return {
            type: Payload.ActionTypes.SHOW_LINE,
            data: {
                text: text
            }
        };
    };
    AppActionCreators.showLine = function (text) {
        var action = AppActionCreators.buildShowLine(text);
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.buildShowQuest = function (question, choices, timeoutMax, defaultChoice) {
        return {
            type: Payload.ActionTypes.SHOW_QUEST,
            data: {
                question: question,
                choices: choices,
                timeoutMax: timeoutMax,
                defaultChoice: defaultChoice
            }
        };
    };
    AppActionCreators.showQuest = function (question, choices, timeoutMax, defaultChoice) {
        var action = AppActionCreators.buildShowQuest(question, choices, timeoutMax, defaultChoice);
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.selectQuest = function (index) {
        var action = {
            type: Payload.ActionTypes.SELECT_QUEST,
            data: {
                index: index
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.questDone = function () {
        var action = {
            type: Payload.ActionTypes.QUEST_ANIM_DONE
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.showFeedback = function (clientX, clientY) {
        var action = {
            type: Payload.ActionTypes.SHOW_FEEDBACK,
            data: {
                clientX: clientX,
                clientY: clientY
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.hideFeedback = function () {
        var action = {
            type: Payload.ActionTypes.HIDE_FEEDBACK
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.showMenu = function () {
        var action = {
            type: Payload.ActionTypes.SHOW_MENU
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.selectMenu = function (item, index) {
        var action = {
            type: Payload.ActionTypes.SELECT_MENU,
            data: {
                action: item,
                index: index
            }
        };
        dispatcher.handleViewAction(action);
    };
    AppActionCreators.menuAnimDone = function () {
        var action = {
            type: Payload.ActionTypes.MENU_ANIM_DONE
        };
        dispatcher.handleViewAction(action);
    };
    return AppActionCreators;
})();
module.exports = AppActionCreators;
