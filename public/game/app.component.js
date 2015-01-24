var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
var AppStore = require("./app.store");
var cinema = require("./cinema.component");
var title = require("./title.component");
var description = require("./description.component");
var clicker = require("./clicker.component");
;
var getStateFromStores = function () {
    return {
        app: AppStore.getApp(),
        cinema: AppStore.getCinema(),
        description: AppStore.getDescription()
    };
};
var AppSpec = (function (_super) {
    __extends(AppSpec, _super);
    function AppSpec() {
        _super.apply(this, arguments);
    }
    AppSpec.prototype.getInitialState = function () {
        return getStateFromStores();
    };
    AppSpec.prototype.render = function () {
        return React.createElement("div", { className: "game layer", tabIndex: "1", style: { zIndex: "1" } }, React.createElement(cinema, { store: this.state.cinema }), React.createElement(description, { store: this.state.description }), React.createElement("div", { className: "main" }, React.createElement(title, { store: this.state.cinema }), React.createElement(title, { store: this.state.cinema })), React.createElement(clicker, { store: this.state.app }));
    };
    return AppSpec;
})(TypedReact.Component);
var component = TypedReact.createClass(AppSpec);
module.exports = component;
