"use strict";
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
var RunnerActions = Payload.RunnerActions;
var CinemaStore = (function (_super) {
    __extends(CinemaStore, _super);
    function CinemaStore() {
        var _this = this;
        _super.call(this);
        this.text = "";
        this.url = "pleeeeeze wait!";
        this.wait = "";
        this.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.type) {
                case ActionTypes.SHOW_ANIM:
                    var data1 = action.data;
                    _this.text = data1.text;
                    _this.url = data1.url;
                    _this.emitChange();
                    break;
                case ActionTypes.HIDE_MOVE:
                    var data2 = action.data;
                    if (data2.move == 0 /* SHOW */) {
                        setTimeout(function () {
                            ActionCreators.showMove();
                        }, 10);
                    }
            }
            ;
        });
    }
    return CinemaStore;
})(BaseStore);
module.exports = CinemaStore;
