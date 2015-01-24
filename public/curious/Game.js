"use strict";
var Anim = require("./Anim");
var Misc = require("./Utils");
var xData = require("./GameData");
var Question = require("./Question");
var Game = (function () {
    function Game(runner) {
        this.runner = runner;
        this.gameDataList = new xData.GameDataList();
        this.gameState = new xData.GameState();
        return this;
    }
    Game.prototype.clearAllState = function () {
        this.gameState.Clear();
        this.gameDataList.Clear();
    };
    Game.prototype.saveAllState = function () {
        this.gameState.Save();
        this.gameDataList.Save();
    };
    Game.prototype.loadAllState = function () {
        this.gameState.Load();
        this.gameDataList.Load();
    };
    Game.prototype.getVar = function (key, defValue) {
        var data = this.gameState.data[key];
        return (data != undefined ? data : defValue);
    };
    Game.prototype.setVar = function (key, val) {
        return this.gameState.data[key] = val;
    };
    Game.prototype.addAnim = function (anim) {
        this.gameDataList.add(anim);
    };
    Game.prototype.addQuestion = function (question) {
        this.gameDataList.add(question);
    };
    Game.prototype.newAnim = function (level) {
        return new Anim(level);
    };
    Game.prototype.newQuestion = function (level) {
        return new Question(level);
    };
    Game.prototype.onGameEvent = function (eventName) {
        this.clearAllState();
    };
    Game.prototype.Play = function (level) {
        var _this = this;
        level.load();
        var playing = null;
        var ready = false;
        this.runner.ready();
        this.runner.onGameEvent = this.onGameEvent.bind(this);
        this.clearAllState();
        this.loadAllState();
        var playnext = function () {
            if (playing != null) {
                if (playing.funDone_curious_internal != undefined)
                    playing.funDone_curious_internal();
                _this.saveAllState();
            }
            var readyList = new Array();
            for (var index = 0; index < _this.gameDataList.length; index++) {
                var gameData = _this.gameDataList.at(index);
                if (gameData.processed == false) {
                    ready = gameData.playable.funWhen_curious_internal();
                    if (ready)
                        readyList.push(gameData);
                }
            }
            if (readyList.length == 0) {
                _this.runner.gameOver();
                _this.clearAllState();
                return;
            }
            else {
                var index = Misc.randomFromInterval(0, readyList.length - 1);
                var gameData = readyList[index];
                playing = gameData.playable;
                gameData.playable.play_curious_internal(_this.runner, playnext);
                gameData.processed = true;
            }
        };
        playnext();
    };
    return Game;
})();
module.exports = Game;
