var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
var Actions = require("./app.actions");
;
var ClickerSpec = (function (_super) {
    __extends(ClickerSpec, _super);
    function ClickerSpec() {
        _super.apply(this, arguments);
        this._handleOnClick = function () {
            Actions.clicked();
        };
    }
    ClickerSpec.prototype.render = function () {
        var cx = React.addons.classSet({
            "game-events": true,
            "my-hide": this.props.store.hideClicker
        });
        return React.createElement("div", { className: cx, onClick: this._handleOnClick });
    };
    return ClickerSpec;
})(TypedReact.Component);
var component = TypedReact.createClass(ClickerSpec);
module.exports = component;
