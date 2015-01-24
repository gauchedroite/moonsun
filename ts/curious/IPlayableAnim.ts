"use strict";

import IAnim = require("./IAnim");
import IPlayable = require("./IPlayable");
import IWhenDone = require("./IWhenDone");

interface IPlayableAnim extends IPlayable, IWhenDone<IAnim> {
}


export = IPlayableAnim;
