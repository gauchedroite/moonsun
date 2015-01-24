"use strict";

import IPlayable = require("./IPlayable");

export class GameData {
    processed = false;
    constructor(public playable: IPlayable) { }
}

export class GameDataList {
    private list = new Array<GameData>();

    get length(): number {
        return this.list.length;
    }

    add(playable: IPlayable): void {
        this.list.push(new GameData(playable));
    }

    at(index: number): GameData {
        return this.list[index];
    }

    Clear() {
        for (var index = 0; index < this.list.length; index++) {
            this.list[index].processed = false;
        }
        this.Save();
    }

    Load() {
        var stateText = localStorage.getItem("GameDataList.processed");
        var processedList = <Array<boolean>>JSON.parse(stateText);
        for (var index = 0; index < processedList.length; index++) {
            this.list[index].processed = processedList[index];
        }
    }

    Save() {
        var processedList = this.list.map<boolean>((value, index, array) => {
            return value.processed;
        });
        var stateText = JSON.stringify(processedList);
        localStorage.setItem("GameDataList.processed", stateText);
    }
}

export class GameState {
    data: { [index: string]: any } = {}; //this.data[id] = "yellow"; //associative array

    Clear() {
        this.data = {};
        this.Save();
    }

    Load() {
        var stateText = localStorage.getItem("gameState");
        this.data = JSON.parse(stateText);
    }

    Save() {
        var stateText = JSON.stringify(this.data);
        localStorage.setItem("gameState", stateText);
    }
}
