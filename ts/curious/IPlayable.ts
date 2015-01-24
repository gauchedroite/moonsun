"use strict";

import IRunner = require("./IRunner");

interface IPlayable {
    funWhen_curious_internal: () => boolean;
    funDone_curious_internal: () => void;
    play_curious_internal(runner: IRunner, completed: () => void): void;
}


export = IPlayable;
