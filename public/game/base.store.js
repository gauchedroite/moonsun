var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventEmitter = require("../helpers/EventEmitter");
var CHANGE_EVENT = "change";
var BaseStore = (function (_super) {
    __extends(BaseStore, _super);
    function BaseStore() {
        _super.apply(this, arguments);
        this.emitChange = function () {
            this.emit(CHANGE_EVENT);
        };
        this.addChangeListener = function (callback) {
            this.on(CHANGE_EVENT, callback);
        };
    }
    return BaseStore;
})(EventEmitter);
module.exports = BaseStore;
