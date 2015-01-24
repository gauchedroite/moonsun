"use strict";

import IQuestion = require("./IQuestion");
import IPlayable = require("./IPlayable");
import IWhen = require("./IWhen");

interface IPlayableQuestion extends IPlayable, IWhen<IQuestion> {
}


export = IPlayableQuestion;
