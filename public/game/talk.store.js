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
                case ActionTypes.SHOW_LINE:
                    var data1 = action.data;
                    _this.text = data1.text;
                    _this.hide = false;
                    _this.hideText = false;
                    _this.collapse = false;
                    _this.emitChange();
                    break;
                case ActionTypes.HIDE_MOVE:
                    var data2 = action.data;
                    if (data2.move == 3 /* LINE */) {
                        if (data2.nextMove == 3 /* LINE */) {
                            _this.hideText = true;
                            _this.emitChange();
                        }
                        else {
                            _this.hide = true;
                            _this.hideText = true;
                            _this.collapse = true;
                            _this.emitChange();
                        }
                    }
            }
            ;
        });
    }
    return Store;
})(BaseStore);
module.exports = Store;
