var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dispatcher = require("./app.dispatcher");
var Payload = require("./app.payload");
var EventEmitter = require("../helpers/EventEmitter");
var ActionTypes = Payload.ActionTypes;
var CHANGE_EVENT = "change";
var DescriptionStore = (function (_super) {
    __extends(DescriptionStore, _super);
    function DescriptionStore() {
        _super.call(this);
        this.text = "";
        this.hide = true;
        this.emitChange = function () {
            this.emit(CHANGE_EVENT);
        };
        this.addChangeListener = function (callback) {
            this.on(CHANGE_EVENT, callback);
        };
        this.initialize();
    }
    DescriptionStore.prototype.initialize = function () {
        var _this = this;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.SHOW_DESCRIPTION:
                    var data = action.data;
                    _this.text = data.text;
                    _this.hide = false;
                    _this.emitChange();
                    break;
                case ActionTypes.HIDE_DESCRIPTION:
                    _this.hide = true;
                    _this.emitChange();
                    break;
            }
            ;
        });
    };
    return DescriptionStore;
})(EventEmitter);
module.exports = DescriptionStore;
