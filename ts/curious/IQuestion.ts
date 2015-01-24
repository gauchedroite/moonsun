"use strict";

import Question = require("./Question");
import WhenDone = require("./WhenDone");

interface IQuestion {
    show(title: string, url: string, whendone?: WhenDone): IQuestion;
    head(name: string, url: string): IQuestion;
    ask(text: string): IQuestion;
    choice(text: string, done: () => void, when?: () => boolean): IQuestion;
    timeout(delay: number, defaultAnswer: number, whendone?: WhenDone): IQuestion;
    value(): Question;
}


export = IQuestion;
