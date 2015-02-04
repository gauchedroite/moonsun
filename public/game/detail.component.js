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
        this.props.talk.addChangeListener(this._onChange);
        this.props.quest.addChangeListener(this._onChange);
    };
    Spec.prototype.componentWillUnmount = function () {
        this.props.talk.removeAllListeners();
        this.props.quest.removeAllListeners();
    };
    Spec.prototype.render = function () {
        var cx = React.addons.classSet({
            "detail": true,
            "ofTalk": (this.props.talk.hide == false),
            "ofQuest": (this.props.quest.hide == false)
        });
        return React.createElement("div", { className: cx }, this.props.children);
    };
    Spec.prototype._onChange = function () {
        this.forceUpdate();
    };
    return Spec;
})(TypedReact.Component);
var component = TypedReact.createClass(Spec);
module.exports = component;
