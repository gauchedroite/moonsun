"use strict";

import Anim = require("./Anim");
import IAnim = require("./IAnim");
import Game = require("./Game");
import Question = require("./Question");
import IWhen = require("./IWhen");
import IWhenDone = require("./IWhenDone");
import IQuestion = require("./IQuestion");

export interface IGame {
    addAnim: (anim: Anim) => Game;
    addQuestion: (question: Question) => Game;

    newAnim: (id?: string) => IWhenDone<IAnim>;
    newQuestion: (id?: string) => IWhen<IQuestion>;
}
