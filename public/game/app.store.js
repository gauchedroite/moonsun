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
var ActionCreators = require("./app.actioncreators");
var AppEventEmitter = require("./app.eventemitter");
var ActionTypes = Payload.ActionTypes;
var cinema = new CinemaStore();
var description = new DescriptionStore();
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = this;
        _super.call(this);
        this.hideClicker = false;
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
        };
        this.showLine = function (line, nextEvent) {
        };
        this.showQuestion = function (question, choices, timeoutMax, defaultChoice, answerEvent) {
        };
        this.popMessage = function (message) {
        };
        this.gameOver = function () {
        };
        this.log = function (text) {
        };
        this.preload = function (assets) {
        };
        window.appStore = this;
        this.initialize();
    }
    Store.prototype.initialize = function () {
        var _this = this;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.CLICK:
                    setTimeout(_this.animEvent, 0);
                    break;
                case ActionTypes.SHOW_ANIM:
                case ActionTypes.SHOW_DESCRIPTION:
                    var data = action.data;
                    _this.animEvent = data.nextEvent;
                    break;
            }
            ;
        });
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
    return Store;
})(AppEventEmitter);
module.exports = Store;
