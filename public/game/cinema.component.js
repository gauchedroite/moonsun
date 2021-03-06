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
var Spec = (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        var _this = this;
        _super.apply(this, arguments);
        this._onLoad = function () {
            _this.setState({
                hideCinema: false,
                hideWait: true
            });
        };
    }
    Spec.prototype.getInitialState = function () {
        return {
            hideCinema: true,
            hideWait: true,
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
        var cxCinema = React.addons.classSet({
            "cinema": true,
            "my-hide": this.state.hideCinema
        });
        var cxWait = React.addons.classSet({
            "cinema-wait": true,
            "my-hide": this.state.hideWait
        });
        return React.createElement("div", null, React.createElement("div", { className: cxCinema }, React.createElement("img", { width: "960", height: "540", src: this.state.url, onLoad: this._onLoad })), React.createElement("div", { className: cxWait }, React.createElement("div", null, this.props.store.wait)));
    };
    Spec.prototype._onChange = function () {
        var _this = this;
        this.setState({
            hideCinema: true,
            hideWait: false
        });
        setTimeout(function () {
            _this.setState({ url: _this.props.store.url });
        }, 250);
    };
    return Spec;
})(TypedReact.Component);
var component = TypedReact.createClass(Spec);
module.exports = component;
