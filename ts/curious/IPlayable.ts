"use strict";

import IRunner = require("./IRunner");

interface IPlayable {
    funWhen_curious_internal: () => boolean;
    funDone_curious_internal: () => void;
    step_curious_internal(runner: IRunner): any;
}


export = IPlayable;
