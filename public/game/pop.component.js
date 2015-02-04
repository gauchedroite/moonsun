var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
;
var Spec = (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        _super.apply(this, arguments);
    }
    Spec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    Spec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    Spec.prototype.render = function () {
        var cx = React.addons.classSet({
            "pop": true,
            "my-hide": this.props.store.hide
        });
        return React.createElement("div", { className: cx }, React.createElement("div", {
            dangerouslySetInnerHTML: { __html: this.props.store.text }
        }));
    };
    Spec.prototype._onChange = function () {
        this.forceUpdate();
    };
    return Spec;
})(TypedReact.Component);
var description = TypedReact.createClass(Spec);
module.exports = description;
