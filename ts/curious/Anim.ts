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
    SHOW = 0, DESC = 1, HEAD = 2, LINE = 3, QUEST = 4, GAMEOVER = 5
}

class Anim implements IAnim, IPlayableAnim {
    private data = new Array<AnimData>();
    private index: number = 0;
    private currentData: AnimData;
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
    step_curious_internal(runner: IRunner): any {
        var data = this.currentData;

        if (data != undefined && data.done != undefined)
            data.done();

        var found = false;
        while (this.index != this.data.length) {
            data = this.currentData = this.data[this.index];
            this.index++;
            var ok = true;
            if (data.when != undefined)
                ok = data.when();
            if (ok) {
                found = true;
                break;
            }
        }

        if (found) {
            if (data.type == AnimType.SHOW) {
                return {
                    type: data.type,
                    text: data.text,
                    url: Misc.fixText(this.level, this.level.imgFolder + data.url)
                };
            }
            else if (data.type == AnimType.DESC) {
                return {
                    type: data.type,
                    text: Misc.fixText(this.level, data.text),
                    options: data.options
                };
            }
            else if (data.type == AnimType.LINE) {
                return {
                    type: data.type,
                    text: Misc.fixText(this.level, data.text)
                };
            }
            else if (data.type == AnimType.HEAD) {
                return {
                    type: data.type,
                    talker: data.text,
                    url: this.level.imgFolder + data.url
                }
            }
        }

        this.index = 0;
        return null;
    }
}


export = Anim;
