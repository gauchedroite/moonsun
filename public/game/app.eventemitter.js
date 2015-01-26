var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventEmitter = require("../helpers/EventEmitter");
var CHANGE_EVENT = "change";
var AppEventEmitter = (function (_super) {
    __extends(AppEventEmitter, _super);
    function AppEventEmitter() {
        _super.apply(this, arguments);
        this.emitChange = function () {
            this.emit(CHANGE_EVENT);
        };
        this.addChangeListener = function (callback) {
            this.on(CHANGE_EVENT, callback);
        };
    }
    return AppEventEmitter;
})(EventEmitter);
module.exports = AppEventEmitter;
