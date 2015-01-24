var React = require("react");
var Game = require("./curious/Game");
var Level = require("./assets/level-001-intro");
var GameInit = require("./helpers/GameInit");
var AppComponent = require("./game/app.component");
var AppStore = require("./game/app.store");
var css = require("./assets/app.css");
window.onload = function () {
    var store = new AppStore();
    var appElement = React.createElement(AppComponent, null);
    React.render(appElement, document.getElementById("id-game-wrapper"));
    document.body.classList.remove("preload");
    new GameInit("id-game-wrapper");
    var game = new Game(store);
    var level = new Level(game);
    game.Play(level);
};
