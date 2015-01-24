"use strict";

import ILevel = require("./ILevel");
import Misc = require("./Utils");
import IDescOptions = require("./IDescOptions");
import IRunner = require("./IRunner");
import IAnim = require("./IAnim");
import WhenDone = require("./WhenDone");
import IWhenDone = require("./IWhenDone");
import IPlayableAnim = require("./IPlayableAnim");

class AnimData {
    public when: () => boolean;
    public done: () => void;
    constructor(public level: ILevel, public type: AnimType, public text: string, public url?: string, public options?: any, whendone?: WhenDone) {
        if (whendone != undefined) {
            if (whendone.when != undefined)
                this.when = whendone.when.bind(this.level);

            if (whendone.done != undefined)
                this.done = whendone.done.bind(this.level);
        }
    }
}

enum AnimType {
    SHOW = 0, DESC = 1, HEAD = 2, LINE = 3
}

class Anim implements IAnim, IPlayableAnim {
    private data = new Array<AnimData>();
    funWhen_curious_internal: () => boolean = () => { return false; };
    funDone_curious_internal: () => void = () => { };

    constructor(private level: ILevel) {
        return this;
    }

    show(title: string, url: string, whendone?: WhenDone): IAnim {
        this.data.push(new AnimData(this.level, AnimType.SHOW, title, url, null, whendone));
        return this;
    }

    description(text: string, options?: IDescOptions, whendone?: WhenDone): IAnim {
        this.data.push(new AnimData(this.level, AnimType.DESC, text, null, options, whendone));
        return this;
    }

    head(name: string, url: string): IAnim {
        this.data.push(new AnimData(this.level, AnimType.HEAD, name, url, null));
        return this;
    }

    line(text: string, whendone?: WhenDone): IAnim {
        this.data.push(new AnimData(this.level, AnimType.LINE, text, null, null, whendone));
        return this;
    }

    value(): Anim {
        return this;
    }

    //
    //
    //
    when(fun: () => boolean): IWhenDone<IAnim> {
        this.funWhen_curious_internal = fun.bind(this.level);
        return this;
    }

    done(fun: () => void): IAnim {
        this.funDone_curious_internal = fun.bind(this.level);
        return this;
    }

    //
    //
    //
    play_curious_internal(runner: IRunner, completed: () => void) {
        var index = 0;
        var currentData: AnimData;

        var iterateAnim = () => {
            while (index != this.data.length) {
                currentData = this.data[index];
                index++;
                var ok = true;
                if (currentData.when != undefined)
                    ok = currentData.when();
                if (ok) {
                    return currentData;
                }
            }
            return null;
        }

        var onnext = () => {
            if (currentData != undefined && currentData.done != undefined)
                currentData.done();

            var data = iterateAnim();
            if (data == null) {
                completed();
                return;
            }
            runProper(runner, data, onnext);
        };

        var runProper = (runner: IRunner, data: AnimData, nextEvent: () => void): void => {
            if (data.type == AnimType.SHOW) {
                runner.showAnim(
                    data.text,
                    Misc.fixText(this.level, this.level.imgFolder + data.url),
                    nextEvent);
            }
            else if (data.type == AnimType.DESC) {
                runner.showDescription(
                    Misc.fixText(this.level, data.text),
                    nextEvent,
                    data.options);
            }
            else if (data.type == AnimType.LINE) {
                runner.showLine(
                    Misc.fixText(this.level, data.text),
                    nextEvent);
            }
            else if (data.type == AnimType.HEAD) {
                runner.setHead(
                    data.text,
                    this.level.imgFolder + data.url,
                    nextEvent);
            }
        }

        runProper(runner, iterateAnim(), onnext);
    }
}


export = Anim;
