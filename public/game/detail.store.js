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
var DetailStore = (function (_super) {
    __extends(DetailStore, _super);
    function DetailStore() {
        var _this = this;
        _super.call(this);
        this.text = "";
        this.hide = true;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.SHOW_DESCRIPTION:
                    var data = action.data;
                    _this.text = data.text;
                    _this.hide = false;
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    return DetailStore;
})(BaseStore);
module.exports = DetailStore;
