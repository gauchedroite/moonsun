/// <reference path="typings/tsd.d.ts" />

import React = require("react");
import Game = require("./curious/Game");
import Level = require("./assets/level-001-intro");
import GameInit = require("./helpers/GameInit");
import AppComponent = require("./game/app.component");
import AppStore = require("./game/app.store");

declare function require(name: string): any;
var css = require("./assets/app.css");


window.onload = function () {

    var store = new AppStore();

    React.initializeTouchEvents(true);

    var appElement = React.createElement(AppComponent, null);
    React.render(appElement, document.getElementById("id-game-wrapper"));

    document.body.classList.remove("preload");

    new GameInit("id-game-wrapper");

    var game = new Game(store);
    var level = new Level(game);
    game.Play(level);
};


