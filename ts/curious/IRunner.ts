"use strict";

import IDescOptions = require("./IDescOptions");

interface IRunner {
    ready(): void;
    showAnim(title: string, url: string, nextEvent: () => void, immediate?: boolean): void;
    showDescription(text: string, nextEvent: () => void, options?: IDescOptions): void;
    setHead(talker: string, url: string, nextEvent: () => void): void;
    showLine(line: string, nextEvent: () => void): void;
    showQuestion(question: string, choices: Array<string>, timeout: number, defaultChoice: number, answerEvent: (choice: number) => void): void;
    popMessage(message: string): void;
    gameOver(): void;
    log(text: string): void;
    onGameEvent: (eventName: string) => void;
    preload(assets: Array<string>): void;
}


export = IRunner;
