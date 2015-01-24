"use strict";

import Game = require("./Game");
import ILevel = require("./ILevel");
import IRunner = require("./IRunner");
import Misc = require("./Utils");
import WhenDone = require("./WhenDone");
import IQuestion = require("./IQuestion");
import IPlayableQuestion = require("./IPlayableQuestion");

class QuestionData {
    public when: () => boolean;
    public done: () => void;
    constructor(public level: ILevel, public type: QuestionType, public text: string, public url?: string, whendone?: WhenDone) {
        if (whendone != undefined) {
            if (whendone.when != undefined)
                this.when = whendone.when.bind(this.level);

            if (whendone.done != undefined)
                this.done = whendone.done.bind(this.level);
        }
    }
}

enum QuestionType {
    SHOW = 0, HEAD = 1, ASK = 2, CHOICE = 3, DEFAULTANSWER = 4, DELAY = 5
}

class Question implements IQuestion, IPlayableQuestion {
    private data = new Array<QuestionData>();
    funWhen_curious_internal: () => boolean = () => { return false; };
    funDone_curious_internal: () => void = () => { };

    constructor(private level: any) {
        return this;
    }

    show(title: string, url: string, whendone?: WhenDone): IQuestion {
        this.data.push(new QuestionData(this.level, QuestionType.SHOW, title, url, whendone));
        return this;
    }

    head(name: string, url: string): IQuestion {
        this.data.push(new QuestionData(this.level, QuestionType.HEAD, name, url));
        return this;
    }

    ask(line: string): IQuestion {
        this.data.push(new QuestionData(this.level, QuestionType.ASK, line));
        return this;
    }

    choice(line: string, done: () => void, when?: () => boolean): IQuestion {
        this.data.push(new QuestionData(this.level, QuestionType.CHOICE, line, null, { done: done, when: when }));
        return this;
    }

    timeout(delay: number, defaultAnswer: number, whendone?: WhenDone): IQuestion {
        this.data.push(new QuestionData(this.level, QuestionType.DELAY, delay.toString(), null, whendone));
        this.data.push(new QuestionData(this.level, QuestionType.DEFAULTANSWER, defaultAnswer.toString()));
        return this;
    }

    value(): Question {
        return this;
    }

    //
    //
    //
    when(fun: (game: Game) => boolean): IQuestion {
        this.funWhen_curious_internal = fun.bind(this.level);
        return this;
    }

    //
    //
    //
    play_curious_internal(runner: IRunner, completed: () => void) {

        var question: string;
        var choices = new Array<string>();
        var choicesMap = new Array<number>();
        var imap = 0;
        var answers: { (): void }[] = [];     // Array of functions because "(ParamList) => ReturnType" == "{ (ParamList): ReturnType }"
        var timeout_ = 0;
        var choice_ = 0;

        for (var index = 0; index < this.data.length; index++) {
            var currentData = this.data[index];
            var ok = true;
            if (currentData.when != undefined)
                ok = currentData.when();
            if (ok) {
                if (currentData.type == QuestionType.ASK)
                    question = currentData.text;
                if (currentData.type == QuestionType.CHOICE) {
                    choices.push(currentData.text);
                    answers.push(currentData.done.bind(this.level));
                    choicesMap.push(imap);
                    imap++;
                }
                if (currentData.type == QuestionType.DEFAULTANSWER)
                    choice_ = +currentData.text;
                if (currentData.type == QuestionType.DELAY)
                    timeout_ = +currentData.text;
            }
            else {
                if (currentData.type == QuestionType.CHOICE) {
                    choicesMap.push(-1);
                }
            }
        }

        var onanswer = (choice: number) => {
            //The only way to get -1 is when a timeout expires and the matching default answer was filtered out.
            if (choice != -1) {
                for (var i = 0; i < choicesMap.length; i++) {
                    if (choicesMap[i] == choice) {
                        choice = i;
                        break;
                    }
                }

                var funAnswer = answers[choice];
                if (funAnswer != undefined) {
                    funAnswer();
                }
            }
            completed();
        };

        this.play_anim_actions(runner, () => {
            runner.showQuestion(question, choices, timeout_, choicesMap[choice_], onanswer);
        });
    }

    private play_anim_actions(runner: IRunner, completed: () => void) {
        var index = 0;
        var currentData: QuestionData;

        var iterateAnim = () => {
            while (index != this.data.length) {
                currentData = this.data[index];
                index++;
                if (currentData.type == QuestionType.SHOW || currentData.type == QuestionType.HEAD) {
                    var ok = true;
                    if (currentData.when != undefined)
                        ok = currentData.when();
                    if (ok) {
                        return currentData;
                    }
                }
            }
            return null;
        }

        var onnext = () => {
            if (currentData != undefined && currentData.done != undefined)
                currentData.done();

            var data = iterateAnim();
            if (data == null) {
                completed();
                return;
            }
            runProper(runner, data, onnext);
        };

        var runProper = (runner: IRunner, data: QuestionData, nextEvent: () => void): void => {
            if (data == null)
                nextEvent();

            if (data.type == QuestionType.SHOW) {
                runner.showAnim(
                    data.text,
                    Misc.fixText(this.level, this.level.imgFolder + data.url),
                    nextEvent);
            }
            else if (data.type == QuestionType.HEAD) {
                runner.setHead(
                    data.text,
                    this.level.imgFolder + data.url,
                    nextEvent);
            }
        }

        runProper(runner, iterateAnim(), onnext);
    }
}


export = Question;
