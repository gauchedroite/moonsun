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

enum AnimType {
    SHOW = 0, DESC = 1, HEAD = 2, LINE = 3, QUEST = 4, GAMEOVER = 5
}

enum QuestionType {
    SHOW = 0, HEAD = 1, ASK = 2, CHOICE = 3, DEFAULTANSWER = 4, DELAY = 5
}

class Question implements IQuestion, IPlayableQuestion {
    private initialized: boolean = false;
    private question: string = null;
    private choices = new Array<string>();
    private choicesMap = new Array<number>();
    private answers: { (): void }[] = [];     // Array of functions because "(ParamList) => ReturnType" == "{ (ParamList): ReturnType }"
    private data = new Array<QuestionData>();
    private timeout_ = 0;
    private choice_ = 0;
    private index: number = 0;
    private currentData: QuestionData;
    private questShowned: boolean = false;
    //
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
    step_curious_internal(runner: IRunner): any {
        var data = this.currentData;

        if (this.initialized == false) {
            this.initialized = true;
            var imap = 0;

            for (var ix = 0; ix < this.data.length; ix++) {
                var ixData = this.data[ix];
                var ok = true;
                if (ixData.when != undefined)
                    ok = ixData.when();
                if (ok) {
                    if (ixData.type == QuestionType.ASK)
                        this.question = ixData.text;
                    if (ixData.type == QuestionType.CHOICE) {
                        this.choices.push(ixData.text);
                        this.answers.push(ixData.done.bind(this.level));
                        this.choicesMap.push(imap);
                        imap++;
                    }
                    if (ixData.type == QuestionType.DEFAULTANSWER)
                        this.choice_ = +ixData.text;
                    if (ixData.type == QuestionType.DELAY)
                        this.timeout_ = +ixData.text;
                }
                else {
                    if (ixData.type == QuestionType.CHOICE) {
                        this.choicesMap.push(-1);
                    }
                }
            }
        }

        var found = false;
        while (this.index != this.data.length) {
            data = this.currentData = this.data[this.index];
            this.index++;
            if (data.type == QuestionType.SHOW || data.type == QuestionType.HEAD) {
                var ok = true;
                if (data.when != undefined)
                    ok = data.when();
                if (ok) {
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            if (data.type == QuestionType.SHOW) {
                return {
                    type: AnimType.SHOW,
                    text: data.text,
                    url: Misc.fixText(this.level, this.level.imgFolder + data.url)
                };
            }
            else if (data.type == QuestionType.HEAD) {
                return {
                    type: AnimType.HEAD,
                    talker: data.text,
                    url: this.level.imgFolder + data.url
                }
            }
        }

        if (this.questShowned == false) {
            this.questShowned = true;

            return {
                type: AnimType.QUEST,
                question: this.question,
                choices: this.choices,
                timeout: this.timeout_,
                defaultChoice: this.choicesMap[this.choice_]
            }
        }

        this.index = 0;
        this.questShowned = false;
        return null;
    }

    public answerQuest(choice: number) {
        //The only way to get -1 is when a timeout expires and the matching default answer was filtered out.
        if (choice != -1) {
            for (var i = 0; i < this.choicesMap.length; i++) {
                if (this.choicesMap[i] == choice) {
                    choice = i;
                    break;
                }
            }

            var funAnswer = this.answers[choice];
            if (funAnswer != undefined) {
                funAnswer();
            }
        }
    }
}


export = Question;
