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
    private needToInitialize: boolean = true;
    private needToSelectNextBlock: boolean = true;
    private playing: IPlayable = null;
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
    // Do not allow calls to the runner in level-001-intro.ts (e.g. game.runner.popMessage in LaFemmeEstSeule())
    //  -> add the action in the gameDataList with some sort of high priority
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


    public getNextMove(): any {
        if (this.needToInitialize) {
            this.needToInitialize = false;

            this.clearAllState();////////
            this.loadAllState();
        }

        var getNextBlockIfNeeded = (): IPlayable => {
            if (this.needToSelectNextBlock) {
                this.needToSelectNextBlock = false;

                if (this.playing != null) {
                    if (this.playing.funDone_curious_internal != undefined)
                        this.playing.funDone_curious_internal();
                    this.saveAllState();
                }

                var readyList = new Array<xData.GameData>();

                for (var index = 0; index < this.gameDataList.length; index++) {
                    var gameData = this.gameDataList.at(index);
                    if (gameData.processed == false) {
                        var ready = gameData.playable.funWhen_curious_internal();
                        if (ready)
                            readyList.push(gameData);
                    }
                }

                if (readyList.length == 0) {
                    this.runner.gameOver();
                    this.clearAllState();
                    return null;
                }

                var index = Misc.randomFromInterval(0, readyList.length - 1);
                var gameData = readyList[index];
                gameData.processed = true;
                this.playing = gameData.playable;
            }
            return this.playing;
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
    }

    public answerQuest(choice: number) {
        (<Question>this.playing).answerQuest(choice);
    }
}


export = Game;
