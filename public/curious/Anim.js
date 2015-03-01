"use strict";
var Misc = require("./Utils");
var AnimData = (function () {
    function AnimData(level, type, text, url, options, whendone) {
        this.level = level;
        this.type = type;
        this.text = text;
        this.url = url;
        this.options = options;
        if (whendone != undefined) {
            if (whendone.when != undefined)
                this.when = whendone.when.bind(this.level);
            if (whendone.done != undefined)
                this.done = whendone.done.bind(this.level);
        }
    }
    return AnimData;
})();
var AnimType;
(function (AnimType) {
    AnimType[AnimType["SHOW"] = 0] = "SHOW";
    AnimType[AnimType["DESC"] = 1] = "DESC";
    AnimType[AnimType["HEAD"] = 2] = "HEAD";
    AnimType[AnimType["LINE"] = 3] = "LINE";
    AnimType[AnimType["QUEST"] = 4] = "QUEST";
    AnimType[AnimType["GAMEOVER"] = 5] = "GAMEOVER";
})(AnimType || (AnimType = {}));
var Anim = (function () {
    function Anim(level) {
        this.level = level;
        this.data = new Array();
        this.index = 0;
        this.funWhen_curious_internal = function () {
            return false;
        };
        this.funDone_curious_internal = function () {
        };
        return this;
    }
    Anim.prototype.show = function (title, url, whendone) {
        this.data.push(new AnimData(this.level, 0 /* SHOW */, title, url, null, whendone));
        return this;
    };
    Anim.prototype.description = function (text, options, whendone) {
        this.data.push(new AnimData(this.level, 1 /* DESC */, text, null, options, whendone));
        return this;
    };
    Anim.prototype.head = function (name, url) {
        this.data.push(new AnimData(this.level, 2 /* HEAD */, name, url, null));
        return this;
    };
    Anim.prototype.line = function (text, whendone) {
        this.data.push(new AnimData(this.level, 3 /* LINE */, text, null, null, whendone));
        return this;
    };
    Anim.prototype.value = function () {
        return this;
    };
    Anim.prototype.when = function (fun) {
        this.funWhen_curious_internal = fun.bind(this.level);
        return this;
    };
    Anim.prototype.done = function (fun) {
        this.funDone_curious_internal = fun.bind(this.level);
        return this;
    };
    Anim.prototype.step_curious_internal = function (runner) {
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
            if (data.type == 0 /* SHOW */) {
                return {
                    type: data.type,
                    text: data.text,
                    url: Misc.fixText(this.level, this.level.imgFolder + data.url)
                };
            }
            else if (data.type == 1 /* DESC */) {
                return {
                    type: data.type,
                    text: Misc.fixText(this.level, data.text),
                    options: data.options
                };
            }
            else if (data.type == 3 /* LINE */) {
                return {
                    type: data.type,
                    text: Misc.fixText(this.level, data.text)
                };
            }
            else if (data.type == 2 /* HEAD */) {
                return {
                    type: data.type,
                    talker: data.text,
                    url: this.level.imgFolder + data.url
                };
            }
        }
        this.index = 0;
        return null;
    };
    return Anim;
})();
module.exports = Anim;
