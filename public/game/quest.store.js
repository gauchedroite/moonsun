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
        this.question = "";
        this.choices = new Array();
        this.timeoutMax = 0;
        this.defaultChoice = -1;
        this.hide = true;
        this.hideClock = true;
        this.indexSelected = -1;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            var data = action.data;
            switch (action.type) {
                case ActionTypes.SHOW_QUEST:
                    _this.question = data.question;
                    _this.choices = data.choices;
                    _this.timeoutMax = data.timeoutMax;
                    _this.defaultChoice = data.defaultChoice;
                    _this.hideClock = (_this.timeoutMax == 0);
                    _this.indexSelected = -1;
                    _this.hide = false;
                    _this.emitChange();
                    break;
                case ActionTypes.SELECT_QUEST:
                    _this.hide = true;
                    _this.hideClock = true;
                    _this.indexSelected = data.index;
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    return Store;
})(BaseStore);
module.exports = Store;
