var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
var ActionCreators = require("./app.actioncreators");
var game = require("../helpers/GameConstants");
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
    Spec.prototype.componentDidUpdate = function () {
        if (this.props.store.hide) {
            var desc = this.getDOMNode();
            var onFadeout = function (event) {
                desc.removeEventListener(game.EVT_TRANSITION_END, onFadeout);
                ActionCreators.showMove();
            };
            desc.addEventListener(game.EVT_TRANSITION_END, onFadeout);
        }
    };
    Spec.prototype.render = function () {
        var cx = React.addons.classSet({
            "description": true,
            "my-hide": this.props.store.hide
        });
        return React.createElement("div", { className: cx }, React.createElement("div", { className: "description-text-default" }, this.props.store.text));
    };
    Spec.prototype._onChange = function () {
        this.forceUpdate();
    };
    return Spec;
})(TypedReact.Component);
var description = TypedReact.createClass(Spec);
module.exports = description;
