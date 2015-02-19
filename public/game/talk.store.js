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
        this.text = "";
        this.hide = true;
        this.hideText = true;
        this.collapse = true;
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.HIDE_RUNNING:
                    var data0 = action.data;
                    if (data0.now == RunnerActions.LINE) {
                        if (data0.next == RunnerActions.LINE || data0.next == RunnerActions.QUEST) {
                            _this.hideText = true;
                            _this.emitChange();
                        }
                        else {
                            _this.hide = true;
                            _this.hideText = true;
                            _this.collapse = true;
                            _this.emitChange();
                        }
                        _this.nextAction = data0.nextAction;
                    }
                    break;
                case ActionTypes.SHOW_LINE:
                    var data1 = action.data;
                    _this.text = data1.text;
                    _this.hide = false;
                    _this.hideText = false;
                    _this.collapse = false;
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    return Store;
})(BaseStore);
module.exports = Store;
