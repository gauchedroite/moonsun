var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypedModel = require("../helpers/TypedModel");
var dispatcher = require("./app.dispatcher");
var Payload = require("./app.payload");
var CinemaStore = (function (_super) {
    __extends(CinemaStore, _super);
    function CinemaStore() {
        var _this = this;
        _super.apply(this, arguments);
        this.addChangeListener = function (callback, context) {
            _this.on("change", function (model, options) {
                callback(model, options);
            }, context);
        };
        this.removeAllListeners = function (context) {
            _this.off(null, null, context);
        };
    }
    CinemaStore.prototype.defaults = function () {
        return { text: "", wait: "pleeeeeze wait!", url: "" };
    };
    CinemaStore.prototype.initialize = function (attributes, options) {
        this.dispatchToken = dispatcher.register(function (payload) {
            switch (payload.actionName) {
                case Payload.Action.CINEMA_LOADED:
                    break;
            }
            ;
        });
    };
    return CinemaStore;
})(TypedModel);
module.exports = CinemaStore;
