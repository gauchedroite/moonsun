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
var RunnerActions = Payload.RunnerActions;
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
        this.running = null;
        this.selectedQuest = -1;
        this.ready = function () {
        };
        this.showAnim = function (text, url, nextEvent, immediate) {
            ActionCreators.hideRunningPrepareNextFire(_this.running, RunnerActions.ANIM, ActionCreators.buildShowAnim(text, url));
            _this.gotoNext = function () {
                _this.running = RunnerActions.ANIM;
                nextEvent();
            };
        };
        this.showDescription = function (text, nextEvent, options) {
            ActionCreators.hideRunningPrepareNextFire(_this.running, RunnerActions.DESC, ActionCreators.buildShowDescription(text));
            _this.gotoNext = function () {
                _this.running = RunnerActions.DESC;
                nextEvent();
            };
        };
        this.setHead = function (talker, url, nextEvent) {
            ActionCreators.setHead(talker, url);
            setTimeout(nextEvent, 0);
        };
        this.showLine = function (line, nextEvent) {
            ActionCreators.hideRunningPrepareNextFire(_this.running, RunnerActions.LINE, ActionCreators.buildShowLine(line));
            _this.gotoNext = function () {
                _this.running = RunnerActions.LINE;
                nextEvent();
            };
        };
        this.showQuestion = function (question, choices, timeoutMax, defaultChoice, answerEvent) {
            ActionCreators.hideRunningPrepareNextFire(_this.running, RunnerActions.QUEST, ActionCreators.buildShowQuest(question, choices, timeoutMax, defaultChoice));
            _this.gotoNext = function () {
                _this.running = RunnerActions.QUEST;
                answerEvent(_this.selectedQuest);
            };
        };
        this.popMessage = function (message) {
            setTimeout(function () {
                ActionCreators.showPop(message);
                setTimeout(function () {
                    ActionCreators.hidePop();
                }, 3000);
            }, 1000);
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
            switch (action.type) {
                case ActionTypes.CLICK:
                    setTimeout(_this.gotoNext, 0);
                    break;
                case ActionTypes.HIDE_RUNNING:
                    var data0 = action.data;
                    if (data0.now == null) {
                        setTimeout(function () {
                            ActionCreators.fire(data0.nextAction);
                        }, 0);
                    }
                    break;
                case ActionTypes.SHOW_QUEST:
                    _this.hideClicker = true;
                    _this.emitChange();
                    break;
                case ActionTypes.SELECT_QUEST:
                    var data1 = action.data;
                    _this.hideClicker = false;
                    _this.selectedQuest = data1.index;
                    _this.emitChange();
                    setTimeout(_this.gotoNext, 0);
                    break;
                case ActionTypes.SHOW_FEEDBACK:
                    var data2 = action.data;
                    _this.feedbackX = data2.clientX;
                    _this.feedbackY = data2.clientY;
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
