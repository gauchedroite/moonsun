var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Backbone = require("backbone");
var TypedModel = (function (_super) {
    __extends(TypedModel, _super);
    function TypedModel(attributes, options) {
        var _this = this;
        _super.call(this, attributes, options);
        var defaults = this.defaults();
        for (var key in defaults) {
            var value = defaults[key];
            (function (k) {
                Object.defineProperty(_this, k, {
                    get: function () {
                        return _this.get(k);
                    },
                    set: function (value) {
                        _this.set(k, value);
                    },
                    enumerable: true,
                    configurable: true
                });
            })(key);
        }
    }
    TypedModel.prototype.defaults = function () {
        throw new Error('You must implement this');
        return {};
    };
    return TypedModel;
})(Backbone.Model);
module.exports = TypedModel;
