"use strict";

import Anim = require("./Anim");
import IAnim = require("./IAnim");
import ILevel = require("./ILevel");
import IRunner = require("./IRunner");
import Misc = require("./Utils");
import xData = require("./GameData");
import Question = require("./Question");
import IQuestion = require("./IQuestion");
import IWhenDone = require("./IWhenDone");
import IWhen = require("./IWhen");
import IPlayable = require("./IPlayable");

class Game {
    private gameDataList = new xData.GameDataList();
    private gameState = new xData.GameState();

    private clearAllState(): void {
        this.gameState.Clear();
        this.gameDataList.Clear();
    }

    private saveAllState(): void {
        this.gameState.Save();
        this.gameDataList.Save();
    }

    private loadAllState(): void {
        this.gameState.Load();
        this.gameDataList.Load();
    }

    getVar(key: string, defValue: any): any {
        var data = this.gameState.data[key];
        return (data != undefined ? data : defValue);
    }

    setVar(key: string, val: any): void {
        return this.gameState.data[key] = val;
    }

  constructor(public runner: IRunner) {
        return this;
    }

  addAnim(anim: Anim): void {
        this.gameDataList.add(anim);
    }

    addQuestion(question: Question) {
        this.gameDataList.add(question);
    }

  newAnim(level: ILevel): IWhenDone<IAnim> {
    return new Anim(level);
    }

  newQuestion(level: ILevel): IWhen<IQuestion> {
      return new Question(level);
    }



    //
    // TODO LIST
    //
    // Confirmation pour une nouvelle partie
    // Faire apparaitre le menu dans des bulles (fond mouvant)
    // intro screen
    // preload images
    // zoom/pinch image
    // Implement Recall
    // Implement animations
    // Dynamic loading of level
    // 
    //
    // sound
    // je pourrais utiliser svg pour des bulles de texte
    //


    onGameEvent(eventName: string) {
        this.clearAllState();
    }


    //
    // Play()
    //
  public Play(level: ILevel) {
        level.load();

    var playing: IPlayable = null;
        var ready = false;

        this.runner.ready();
        this.runner.onGameEvent = this.onGameEvent.bind(this);

        this.clearAllState();////////
        this.loadAllState();

        var playnext = () => {
            if (playing != null) {
                if (playing.funDone_curious_internal != undefined)
                    playing.funDone_curious_internal();
                this.saveAllState();
            }

            var readyList = new Array<xData.GameData>();

            for (var index = 0; index < this.gameDataList.length; index++) {
                var gameData = this.gameDataList.at(index);
                if (gameData.processed == false) {
                    ready = gameData.playable.funWhen_curious_internal();
                    if (ready)
                        readyList.push(gameData);
                }
            }

            if (readyList.length == 0) {
                this.runner.gameOver();
                this.clearAllState();
                return;
            }
            else {
                var index = Misc.randomFromInterval(0, readyList.length - 1);
                var gameData = readyList[index];
                playing = gameData.playable;
                gameData.playable.play_curious_internal(this.runner, playnext);
                gameData.processed = true;
            }
        };

        playnext();
    }
}


export = Game;
