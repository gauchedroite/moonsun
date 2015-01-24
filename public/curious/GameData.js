"use strict";
var GameData = (function () {
    function GameData(playable) {
        this.playable = playable;
        this.processed = false;
    }
    return GameData;
})();
exports.GameData = GameData;
var GameDataList = (function () {
    function GameDataList() {
        this.list = new Array();
    }
    Object.defineProperty(GameDataList.prototype, "length", {
        get: function () {
            return this.list.length;
        },
        enumerable: true,
        configurable: true
    });
    GameDataList.prototype.add = function (playable) {
        this.list.push(new GameData(playable));
    };
    GameDataList.prototype.at = function (index) {
        return this.list[index];
    };
    GameDataList.prototype.Clear = function () {
        for (var index = 0; index < this.list.length; index++) {
            this.list[index].processed = false;
        }
        this.Save();
    };
    GameDataList.prototype.Load = function () {
        var stateText = localStorage.getItem("GameDataList.processed");
        var processedList = JSON.parse(stateText);
        for (var index = 0; index < processedList.length; index++) {
            this.list[index].processed = processedList[index];
        }
    };
    GameDataList.prototype.Save = function () {
        var processedList = this.list.map(function (value, index, array) {
            return value.processed;
        });
        var stateText = JSON.stringify(processedList);
        localStorage.setItem("GameDataList.processed", stateText);
    };
    return GameDataList;
})();
exports.GameDataList = GameDataList;
var GameState = (function () {
    function GameState() {
        this.data = {};
    }
    GameState.prototype.Clear = function () {
        this.data = {};
        this.Save();
    };
    GameState.prototype.Load = function () {
        var stateText = localStorage.getItem("gameState");
        this.data = JSON.parse(stateText);
    };
    GameState.prototype.Save = function () {
        var stateText = JSON.stringify(this.data);
        localStorage.setItem("gameState", stateText);
    };
    return GameState;
})();
exports.GameState = GameState;
