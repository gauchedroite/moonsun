var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
;
;
var img = new Image();
var Spec = (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        _super.apply(this, arguments);
    }
    Spec.prototype.getInitialState = function () {
        return {
            hide: true,
            url: null
        };
    };
    Spec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    Spec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    Spec.prototype.render = function () {
        var divStyle = {
            backgroundImage: 'url(' + this.props.store.url + ')'
        };
        var cx = React.addons.classSet({
            "head": true,
            "my-hide": this.state.hide
        });
        return React.createElement("div", { className: cx, style: divStyle }, React.createElement("div", null, React.createElement("div", null, this.props.store.talker)));
    };
    Spec.prototype._onChange = function () {
        var _this = this;
        if (this.state.url !== this.props.store.url) {
            this.setState({
                hide: true
            });
            img.onload = function (ev) {
                _this.setState({
                    hide: false,
                    url: _this.props.store.url
                });
            };
            img.src = this.props.store.url;
        }
    };
    return Spec;
})(TypedReact.Component);
var component = TypedReact.createClass(Spec);
module.exports = component;
