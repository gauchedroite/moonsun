var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypedModel = require("../helpers/TypedModel");
var DescriptionStore = (function (_super) {
    __extends(DescriptionStore, _super);
    function DescriptionStore() {
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
    DescriptionStore.prototype.defaults = function () {
        return {
            text: "",
            hide: true
        };
    };
    return DescriptionStore;
})(TypedModel);
module.exports = DescriptionStore;
