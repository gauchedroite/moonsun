var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
var ActionCreators = require("./app.actioncreators");
var rce = React.createElement;
var DivSpec = (function (_super) {
    __extends(DivSpec, _super);
    function DivSpec() {
        _super.apply(this, arguments);
    }
    DivSpec.prototype.render = function () {
        return rce("div", {
            className: this.props.className,
            onClick: this._onClick,
            onTouchEnd: this._onTouchEnd
        }, rce("div", { dangerouslySetInnerHTML: { __html: this.props.name } }));
    };
    DivSpec.prototype._onClick = function (ev) {
        this.props.onClick(this.props.actionKey, this.props.actionIndex, ev.clientX, ev.clientY);
    };
    DivSpec.prototype._onTouchEnd = function (ev) {
        if (ev.changedTouches.length > 0) {
            var touch = ev.changedTouches[0];
            this.props.onClick(this.props.actionKey, this.props.actionIndex, touch.clientX, touch.clientY);
        }
    };
    return DivSpec;
})(TypedReact.Component);
var liComponent = TypedReact.createClass(DivSpec);
;
;
var Spec = (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        _super.apply(this, arguments);
    }
    Spec.prototype.getInitialState = function () {
        return {
            hideBackground: true
        };
    };
    Spec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
    };
    Spec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    Spec.prototype.render = function () {
        var _this = this;
        var cx = React.addons.classSet({
            "menu": true,
            "my-hide": this.props.store.hide
        });
        var cx2 = React.addons.classSet({
            "menu-bg": true,
            "my-hide": this.props.store.hide
        });
        var lise = this.props.store.list.map(function (action, index) {
            var className = "menu-circle menu-item-" + action.key;
            if (action.selected)
                className += " selected";
            if (_this.props.store.hide && !action.selected)
                className += " my-hide";
            return rce(liComponent, {
                className: className,
                key: index,
                actionKey: action.key,
                actionIndex: index,
                name: action.name,
                onClick: _this._onClick
            });
        });
        return rce("div", { className: cx }, rce("div", { className: cx2, style: { display: (this.state.hideBackground ? "none" : "") } }), rce("div", { className: "menu-items" }, lise));
    };
    Spec.prototype._onChange = function () {
        var _this = this;
        if (this.props.store.hide) {
            setTimeout(function () {
                _this.setState({ hideBackground: true });
            }, 250);
            this.forceUpdate();
        }
        else {
            this.setState({ hideBackground: false });
        }
    };
    Spec.prototype._onClick = function (key, keyIndex, clientX, clientY) {
        ActionCreators.selectMenu(key, keyIndex);
        ActionCreators.showFeedback(clientX, clientY);
    };
    return Spec;
})(TypedReact.Component);
var description = TypedReact.createClass(Spec);
module.exports = description;
