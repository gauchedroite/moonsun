"use strict";

import IDescOptions = require("./IDescOptions");

interface IRunner {
    popMessage(message: string): void;
    gameOver(): void;
    log(text: string): void;
    preload(assets: Array<string>): void;
}


export = IRunner;
