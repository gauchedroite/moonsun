var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Flux = require("flux");
var Payload = require("./app.payload");
var appDispatcher = (function (_super) {
    __extends(appDispatcher, _super);
    function appDispatcher() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleServerAction = function (action) {
            var payload = {
                source: Payload.PayloadSources.SERVER_ACTION,
                action: action
            };
            _this.dispatch(payload);
        };
        this.handleViewAction = function (action) {
            var payload = {
                source: Payload.PayloadSources.VIEW_ACTION,
                action: action
            };
            _this.dispatch(payload);
        };
    }
    return appDispatcher;
})(Flux.Dispatcher);
var dispatcher = new appDispatcher();
module.exports = dispatcher;
