"use strict";
var Anim = require("./Anim");
var Misc = require("./Utils");
var xData = require("./GameData");
var Question = require("./Question");
var Game = (function () {
    function Game(runner) {
        this.runner = runner;
        this.needToInitialize = true;
        this.needToSelectNextBlock = true;
        this.playing = null;
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
    Game.prototype.getNextMove = function () {
        var _this = this;
        if (this.needToInitialize) {
            this.needToInitialize = false;
            this.clearAllState();
            this.loadAllState();
        }
        var getNextBlockIfNeeded = function () {
            if (_this.needToSelectNextBlock) {
                _this.needToSelectNextBlock = false;
                if (_this.playing != null) {
                    if (_this.playing.funDone_curious_internal != undefined)
                        _this.playing.funDone_curious_internal();
                    _this.saveAllState();
                }
                var readyList = new Array();
                for (var index = 0; index < _this.gameDataList.length; index++) {
                    var gameData = _this.gameDataList.at(index);
                    if (gameData.processed == false) {
                        var ready = gameData.playable.funWhen_curious_internal();
                        if (ready)
                            readyList.push(gameData);
                    }
                }
                if (readyList.length == 0) {
                    _this.runner.gameOver();
                    _this.clearAllState();
                    return null;
                }
                var index = Misc.randomFromInterval(0, readyList.length - 1);
                var gameData = readyList[index];
                gameData.processed = true;
                _this.playing = gameData.playable;
            }
            return _this.playing;
        };
        var playing = getNextBlockIfNeeded();
        if (playing == null)
            return { type: "GAMEOVER" };
        var move = playing.step_curious_internal(this.runner);
        if (move == null) {
            this.needToSelectNextBlock = true;
            playing = getNextBlockIfNeeded();
            if (playing == null)
                return { type: "GAMEOVER" };
            move = playing.step_curious_internal(this.runner);
        }
        return move;
    };
    Game.prototype.answerQuest = function (choice) {
        this.playing.answerQuest(choice);
    };
    return Game;
})();
module.exports = Game;
