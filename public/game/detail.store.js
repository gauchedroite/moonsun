var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypedModel = require("../helpers/TypedModel");
var DetailStore = (function (_super) {
    __extends(DetailStore, _super);
    function DetailStore() {
        _super.apply(this, arguments);
    }
    DetailStore.prototype.defaults = function () {
        return {
            text: "",
            hide: true
        };
    };
    return DetailStore;
})(TypedModel);
module.exports = DetailStore;
