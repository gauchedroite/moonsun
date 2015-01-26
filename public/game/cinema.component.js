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
var CinemaSpec = (function (_super) {
    __extends(CinemaSpec, _super);
    function CinemaSpec() {
        var _this = this;
        _super.apply(this, arguments);
        this._onLoad = function () {
            _this.setState({
                hideCinema: false,
                hideWait: true
            });
        };
    }
    CinemaSpec.prototype.getInitialState = function () {
        return {
            hideCinema: true,
            hideWait: true,
            url: null
        };
    };
    CinemaSpec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    CinemaSpec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    CinemaSpec.prototype.render = function () {
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
    CinemaSpec.prototype._onChange = function () {
        var _this = this;
        this.setState({
            hideCinema: true,
            hideWait: false
        });
        setTimeout(function () {
            _this.setState({ url: _this.props.store.url });
        }, 250);
    };
    return CinemaSpec;
})(TypedReact.Component);
var component = TypedReact.createClass(CinemaSpec);
module.exports = component;
