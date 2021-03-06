var React = require("react");
var GameInit = require("./helpers/GameInit");
var AppComponent = require("./game/app.component");
var AppStore = require("./game/app.store");
var css = require("./assets/app.css");
window.onload = function () {
    var store = new AppStore();
    React.initializeTouchEvents(true);
    var appElement = React.createElement(AppComponent, null);
    React.render(appElement, document.getElementById("id-game-wrapper"));
    document.body.classList.remove("preload");
    new GameInit("id-game-wrapper");
    store.startGame();
};
