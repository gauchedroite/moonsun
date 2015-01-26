var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
;
var DetailSpec = (function (_super) {
    __extends(DetailSpec, _super);
    function DetailSpec() {
        _super.apply(this, arguments);
    }
    DetailSpec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    DetailSpec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    DetailSpec.prototype.render = function () {
        var cx = React.addons.classSet({
            "detail": true,
            "ofTalk": this.props.store.hide
        });
        return React.createElement("div", { className: cx });
    };
    DetailSpec.prototype._onChange = function () {
        this.forceUpdate();
    };
    return DetailSpec;
})(TypedReact.Component);
module.exports = DetailSpec;
