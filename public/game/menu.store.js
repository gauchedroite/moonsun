var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dispatcher = require("./app.dispatcher");
var Payload = require("./app.payload");
var BaseStore = require("./base.store");
var ActionCreators = require("./app.actioncreators");
var ActionTypes = Payload.ActionTypes;
var MenuItem = (function () {
    function MenuItem(key, name) {
        this.key = key;
        this.name = name;
        this.selected = false;
    }
    return MenuItem;
})();
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = this;
        _super.call(this);
        this.hide = true;
        this.list = null;
        this.list = [
            new MenuItem("restart", "Nouvelle<br/>partie"),
            new MenuItem("play", "Retour<br/>au jeu")
        ];
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            var data = action.data;
            switch (action.type) {
                case ActionTypes.SHOW_MENU:
                    _this.hide = !_this.hide;
                    _this.emitChange();
                    break;
                case ActionTypes.SELECT_MENU:
                    _this.hide = true;
                    _this.list[data.index].selected = true;
                    _this.emitChange();
                    if (data.action == "restart") {
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    }
                    else {
                        setTimeout(ActionCreators.menuAnimDone, 550);
                    }
                    break;
                case ActionTypes.MENU_ANIM_DONE:
                    for (var i = 0; i < _this.list.length; i++) {
                        _this.list[i].selected = false;
                    }
                    _this.emitChange();
                    break;
            }
            ;
        });
    }
    return Store;
})(BaseStore);
module.exports = Store;
