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
        this.text = "";
        this.hide = true;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            var data = action.data;
            switch (action.type) {
                case ActionTypes.SHOW_POP:
                    _this.text = data.text;
                    _this.hide = false;
                    _this.emitChange();
                    break;
                case ActionTypes.HIDE_POP:
                    _this.hide = true;
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    return Store;
})(BaseStore);
module.exports = Store;
