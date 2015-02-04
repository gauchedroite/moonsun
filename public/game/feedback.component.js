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
        if (this.props.store.showFeedback) {
            var fb = this.getDOMNode();
            var top = ((this.props.store.feedbackY - game.DISPLAY_TOP) / game.DISPLAY_SCALE) - 10;
            var left = ((this.props.store.feedbackX - game.DISPLAY_LEFT) / game.DISPLAY_SCALE) - 10;
            fb.style.top = top.toString() + "px";
            fb.style.left = left.toString() + "px";
            var onfbFadeout = function (event) {
                fb.removeEventListener(game.EVT_TRANSITION_END, onfbFadeout);
                fb.removeAttribute("style");
                ActionCreators.hideFeedback();
            };
            fb.style[game.TRANSITION] = "opacity 0.4s, " + game.STRANSFORM + " 0.4s";
            fb.style.opacity = "0";
            fb.style[game.TRANSFORM] = "scale(5)";
            fb.addEventListener(game.EVT_TRANSITION_END, onfbFadeout);
        }
    };
    Spec.prototype.render = function () {
        var cx = React.addons.classSet({
            "feedback": true,
            "my-hide": !this.props.store.showFeedback
        });
        return React.createElement("div", { className: cx });
    };
    Spec.prototype._onChange = function () {
        this.forceUpdate();
    };
    return Spec;
})(TypedReact.Component);
var description = TypedReact.createClass(Spec);
module.exports = description;
