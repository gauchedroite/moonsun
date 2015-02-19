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
var RunnerActions = Payload.RunnerActions;
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
        this.fireNextAction = false;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.HIDE_RUNNING:
                    var data0 = action.data;
                    if (data0.now == RunnerActions.QUEST) {
                        _this.hide = true;
                        _this.hideClock = true;
                        _this.nextAction = data0.nextAction;
                        _this.fireNextAction = false;
                        _this.emitChange();
                    }
                    break;
                case ActionTypes.SHOW_QUEST:
                    var data1 = action.data;
                    _this.question = data1.question;
                    _this.choices = data1.choices;
                    _this.timeoutMax = data1.timeoutMax;
                    _this.defaultChoice = data1.defaultChoice;
                    _this.hideClock = (_this.timeoutMax == 0);
                    _this.indexSelected = -1;
                    _this.hide = false;
                    _this.fireNextAction = false;
                    _this.emitChange();
                    break;
                case ActionTypes.SELECT_QUEST:
                    var data2 = action.data;
                    _this.hide = true;
                    _this.hideClock = true;
                    _this.indexSelected = data2.index;
                    _this.fireNextAction = true;
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    return Store;
})(BaseStore);
module.exports = Store;
