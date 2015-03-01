var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game = require("../curious/Game");
var Level = require("../assets/level-001-intro");
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
var game = null;
var level = null;
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
        this.move = null;
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
                    setTimeout(function () {
                        _this.endMove();
                    }, 0);
                    break;
                case ActionTypes.SHOW_MOVE:
                    setTimeout(function () {
                        _this.startMove();
                    }, 0);
                    break;
                case ActionTypes.SHOW_QUEST:
                    _this.hideClicker = true;
                    _this.emitChange();
                    break;
                case ActionTypes.SELECT_QUEST:
                    var data1 = action.data;
                    _this.hideClicker = false;
                    _this.emitChange();
                    setTimeout(function () {
                        game.answerQuest(data1.index);
                        _this.endMove();
                    }, 0);
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
    Store.prototype.startGame = function () {
        game = new Game(this);
        level = new Level(game);
        this.move = game.getNextMove();
        this.startMove();
    };
    Store.prototype.endMove = function () {
        var currentType = this.move.type;
        this.move = game.getNextMove();
        ActionCreators.hideMove(currentType, this.move.type);
    };
    Store.prototype.startMove = function () {
        var _this = this;
        switch (this.move.type) {
            case 0 /* SHOW */:
                ActionCreators.showAnim(this.move.text, this.move.url);
                break;
            case 1 /* DESC */:
                ActionCreators.showDescription(this.move.text);
                break;
            case 2 /* HEAD */:
                ActionCreators.setHead(this.move.talker, this.move.url);
                this.move = game.getNextMove();
                setTimeout(function () {
                    _this.startMove();
                }, 0);
                break;
            case 3 /* LINE */:
                ActionCreators.showLine(this.move.text);
                break;
            case 4 /* QUEST */:
                ActionCreators.showQuest(this.move.question, this.move.choices, this.move.timeout, this.move.defaultChoice);
                break;
        }
    };
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
