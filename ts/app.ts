/// <reference path="typings/tsd.d.ts" />

import React = require("react");
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

    store.startGame();
};


