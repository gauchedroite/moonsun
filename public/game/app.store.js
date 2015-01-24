var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypedModel = require("../helpers/TypedModel");
var Payload = require("./app.payload");
var dispatcher = require("./app.dispatcher");
var CinemaStore = require("./cinema.store");
var DescriptionStore = require("./description.store");
var cinema = new CinemaStore();
var description = new DescriptionStore();
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = this;
        _super.call(this);
        this.ready = function () {
        };
        this.showAnim = function (text, url, nextEvent, immediate) {
            cinema.set({ text: text, url: url });
            _this.animEvent = nextEvent;
        };
        this.showDescription = function (text, nextEvent, options) {
            description.set({ text: text, hide: false });
            _this.animEvent = function () {
                description.hide = true;
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
    }
    Store.prototype.defaults = function () {
        return {
            hideClicker: false
        };
    };
    Store.prototype.initialize = function (attributes, options) {
        var _this = this;
        this.dispatchToken = dispatcher.register(function (payload) {
            switch (payload.actionName) {
                case Payload.Action.CLICK:
                    _this.animEvent();
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
})(TypedModel);
module.exports = Store;
