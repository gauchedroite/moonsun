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
var TitleSpec = (function (_super) {
    __extends(TitleSpec, _super);
    function TitleSpec() {
        _super.apply(this, arguments);
    }
    TitleSpec.prototype.getInitialState = function () {
        return {
            hide: false,
            text: null
        };
    };
    TitleSpec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    TitleSpec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    TitleSpec.prototype.render = function () {
        return React.createElement("div", { className: "title" }, React.createElement("div", { className: (this.state.hide ? "my-hide" : "") }, this.state.text));
    };
    TitleSpec.prototype._onChange = function () {
        var _this = this;
        this.setState({
            hide: true
        });
        setTimeout(function () {
            _this.setState({ hide: false, text: _this.props.store.text });
        }, 250);
    };
    return TitleSpec;
})(TypedReact.Component);
var component = TypedReact.createClass(TitleSpec);
module.exports = component;
