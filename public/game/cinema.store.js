var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dispatcher = require("./app.dispatcher");
var Payload = require("./app.payload");
var AppEventEmitter = require("./app.eventemitter");
var ActionTypes = Payload.ActionTypes;
var CinemaStore = (function (_super) {
    __extends(CinemaStore, _super);
    function CinemaStore() {
        _super.call(this);
        this.text = "";
        this.url = "pleeeeeze wait!";
        this.wait = "";
        this.initialize();
    }
    CinemaStore.prototype.initialize = function () {
        var _this = this;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.SHOW_ANIM:
                    var data = action.data;
                    _this.text = data.text;
                    _this.url = data.url;
                    _this.emitChange();
                    break;
            }
            ;
        });
    };
    return CinemaStore;
})(AppEventEmitter);
module.exports = CinemaStore;
