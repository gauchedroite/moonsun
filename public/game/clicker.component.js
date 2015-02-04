var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
var ActionCreators = require("./app.actioncreators");
;
var ClickerSpec = (function (_super) {
    __extends(ClickerSpec, _super);
    function ClickerSpec() {
        _super.apply(this, arguments);
        this._handleOnClick = function () {
            ActionCreators.clicked();
        };
    }
    ClickerSpec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    ClickerSpec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    ClickerSpec.prototype.render = function () {
        var cx = React.addons.classSet({
            "game-events": true,
            "my-hide": this.props.store.hideClicker
        });
        return React.createElement("div", { className: cx, onClick: this._handleOnClick, onTouchEnd: this._handleOnClick });
    };
    ClickerSpec.prototype._onChange = function () {
        this.forceUpdate();
    };
    return ClickerSpec;
})(TypedReact.Component);
var component = TypedReact.createClass(ClickerSpec);
module.exports = component;
