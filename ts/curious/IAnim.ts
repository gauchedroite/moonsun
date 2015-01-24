"use strict";

import Anim = require("./Anim");
import Game = require("./Game");
import Question = require("./Question");
import IRunner = require("./IRunner");
import IDescOptions = require("./IDescOptions");
import WhenDone = require("./WhenDone");

interface IAnim {
    show(title: string, url: string, whendone?: WhenDone): IAnim;
    head(name: string, url: string): IAnim;
    line(text: string, whendone?: WhenDone): IAnim;
    description(text: string, options?: IDescOptions, whendone?: WhenDone): IAnim;
    value(): Anim;
}


export = IAnim;
