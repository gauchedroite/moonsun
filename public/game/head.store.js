var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dispatcher = require("./app.dispatcher");
var Payload = require("./app.payload");
var BaseStore = require("./base.store");
var ActionTypes = Payload.ActionTypes;
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = this;
        _super.call(this);
        this.talker = "";
        this.url = "";
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.SET_HEAD:
                    var data = action.data;
                    _this.talker = data.talker;
                    _this.url = data.url;
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    return Store;
})(BaseStore);
module.exports = Store;
