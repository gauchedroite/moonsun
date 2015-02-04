var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
var ActionCreators = require("./app.actioncreators");
var AppStore = require("./app.store");
var cinema = require("./cinema.component");
var title = require("./title.component");
var description = require("./description.component");
var pop = require("./pop.component");
var detail = require("./detail.component");
var head = require("./head.component");
var talk = require("./talk.component");
var quest = require("./quest.component");
var clicker = require("./clicker.component");
var feedback = require("./feedback.component");
var menu = require("./menu.component");
;
var getStateFromStores = function () {
    return {
        app: AppStore.getApp(),
        cinema: AppStore.getCinema(),
        description: AppStore.getDescription(),
        pop: AppStore.getPop(),
        head: AppStore.getHead(),
        talk: AppStore.getTalk(),
        quest: AppStore.getQuest(),
        menu: AppStore.getMenu()
    };
};
var AppSpec = (function (_super) {
    __extends(AppSpec, _super);
    function AppSpec() {
        _super.apply(this, arguments);
        this._handleOnMenu = function () {
            ActionCreators.showMenu();
        };
    }
    AppSpec.prototype.getInitialState = function () {
        return getStateFromStores();
    };
    AppSpec.prototype.render = function () {
        return React.createElement("div", { className: "game layer", tabIndex: "1", style: { zIndex: "1" } }, React.createElement(cinema, { store: this.state.cinema }), React.createElement(description, { store: this.state.description }), React.createElement(pop, { store: this.state.pop }), React.createElement("div", { className: "main" }, React.createElement(title, { store: this.state.cinema }), React.createElement(detail, { talk: this.state.talk, quest: this.state.quest }, React.createElement(head, { store: this.state.head }), React.createElement(talk, { store: this.state.talk }), React.createElement(quest, { store: this.state.quest }))), React.createElement(clicker, { store: this.state.app }), React.createElement(menu, { store: this.state.menu }), React.createElement(feedback, { store: this.state.app }), React.createElement("svg", { className: "svg", onClick: this._handleOnMenu, onTouchEnd: this._handleOnMenu }, React.createElement("g", { transform: "translate(40,0)" }, React.createElement("circle", { r: "40", fill: "#23b0ff" }), React.createElement("path", { d: "M-25,-10 A25,25 0 0,0 -25,10", stroke: "white", strokeWidth: "5", fill: "none", transform: "rotate(-45)" }))));
    };
    return AppSpec;
})(TypedReact.Component);
var component = TypedReact.createClass(AppSpec);
module.exports = component;
