var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Payload = require("./app.payload");
var dispatcher = require("./app.dispatcher");
var CinemaStore = require("./cinema.store");
var DescriptionStore = require("./description.store");
var HeadStore = require("./head.store");
var PopStore = require("./pop.store");
var TalkStore = require("./talk.store");
var QuestStore = require("./quest.store");
var MenuStore = require("./menu.store");
var ActionCreators = require("./app.actioncreators");
var BaseStore = require("./base.store");
var ActionTypes = Payload.ActionTypes;
var cinema = new CinemaStore();
var description = new DescriptionStore();
var pop = new PopStore();
var head = new HeadStore();
var talk = new TalkStore();
var quest = new QuestStore();
var menu = new MenuStore();
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = this;
        _super.call(this);
        this.hideClicker = false;
        this.feedbackX = -1;
        this.feedbackY = -1;
        this.showFeedback = false;
        this.selectedQuest = -1;
        this.ready = function () {
        };
        this.showAnim = function (text, url, nextEvent, immediate) {
            ActionCreators.showAnim(text, url, nextEvent);
        };
        this.showDescription = function (text, nextEvent, options) {
            ActionCreators.showDescription(text, nextEvent);
            _this.animEvent = function () {
                ActionCreators.hideDescription();
                setTimeout(nextEvent, 150);
            };
        };
        this.setHead = function (talker, url, nextEvent) {
            ActionCreators.setHead(talker, url);
            setTimeout(nextEvent, 0);
        };
        this.showLine = function (line, nextEvent) {
            ActionCreators.showLine(line, nextEvent);
            _this.animEvent = function () {
                ActionCreators.hideLine();
                setTimeout(nextEvent, 0);
            };
        };
        this.showQuestion = function (question, choices, timeoutMax, defaultChoice, answerEvent) {
            ActionCreators.showQuest(question, choices, timeoutMax, defaultChoice, answerEvent);
        };
        this.popMessage = function (message) {
            ActionCreators.showPop(message);
            setTimeout(function () {
                ActionCreators.hidePop();
            }, 3000);
        };
        this.gameOver = function () {
            alert("GAME OVER");
        };
        this.log = function (text) {
        };
        this.preload = function (assets) {
        };
        window.appStore = this;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            var data = action.data;
            switch (action.type) {
                case ActionTypes.CLICK:
                    setTimeout(_this.animEvent, 0);
                    break;
                case ActionTypes.SHOW_ANIM:
                case ActionTypes.SHOW_DESCRIPTION:
                case ActionTypes.SHOW_LINE:
                    _this.animEvent = data.nextEvent;
                    break;
                case ActionTypes.SHOW_QUEST:
                    _this.answerEvent = data.answerEvent;
                    _this.hideClicker = true;
                    _this.emitChange();
                    break;
                case ActionTypes.SELECT_QUEST:
                    _this.hideClicker = false;
                    _this.selectedQuest = data.index;
                    _this.emitChange();
                    break;
                case ActionTypes.QUEST_ANIM_DONE:
                    setTimeout(function () {
                        _this.answerEvent(_this.selectedQuest);
                    }, 0);
                    break;
                case ActionTypes.SHOW_FEEDBACK:
                    _this.feedbackX = data.clientX;
                    _this.feedbackY = data.clientY;
                    _this.showFeedback = true;
                    _this.emitChange();
                    break;
                case ActionTypes.HIDE_FEEDBACK:
                    _this.showFeedback = false;
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    Store.getApp = function () {
        return window.appStore;
    };
    Store.getCinema = function () {
        return cinema;
    };
    Store.getDescription = function () {
        return description;
    };
    Store.getPop = function () {
        return pop;
    };
    Store.getHead = function () {
        return head;
    };
    Store.getTalk = function () {
        return talk;
    };
    Store.getQuest = function () {
        return quest;
    };
    Store.getMenu = function () {
        return menu;
    };
    return Store;
})(BaseStore);
module.exports = Store;
