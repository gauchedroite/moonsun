var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
;
var DescriptionSpec = (function (_super) {
    __extends(DescriptionSpec, _super);
    function DescriptionSpec() {
        _super.apply(this, arguments);
    }
    DescriptionSpec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    DescriptionSpec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    DescriptionSpec.prototype.render = function () {
        var cx = React.addons.classSet({
            "description": true,
            "my-hide": this.props.store.hide
        });
        return React.createElement("div", { className: cx }, React.createElement("div", { className: "description-text-default" }, this.props.store.text));
    };
    DescriptionSpec.prototype._onChange = function () {
        this.forceUpdate();
    };
    return DescriptionSpec;
})(TypedReact.Component);
var description = TypedReact.createClass(DescriptionSpec);
module.exports = description;
