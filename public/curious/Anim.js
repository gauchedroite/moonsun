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
})(AnimType || (AnimType = {}));
var Anim = (function () {
    function Anim(level) {
        this.level = level;
        this.data = new Array();
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
    Anim.prototype.play_curious_internal = function (runner, completed) {
        var _this = this;
        var index = 0;
        var currentData;
        var iterateAnim = function () {
            while (index != _this.data.length) {
                currentData = _this.data[index];
                index++;
                var ok = true;
                if (currentData.when != undefined)
                    ok = currentData.when();
                if (ok) {
                    return currentData;
                }
            }
            return null;
        };
        var onnext = function () {
            if (currentData != undefined && currentData.done != undefined)
                currentData.done();
            var data = iterateAnim();
            if (data == null) {
                completed();
                return;
            }
            runProper(runner, data, onnext);
        };
        var runProper = function (runner, data, nextEvent) {
            if (data.type == 0 /* SHOW */) {
                runner.showAnim(data.text, Misc.fixText(_this.level, _this.level.imgFolder + data.url), nextEvent);
            }
            else if (data.type == 1 /* DESC */) {
                runner.showDescription(Misc.fixText(_this.level, data.text), nextEvent, data.options);
            }
            else if (data.type == 3 /* LINE */) {
                runner.showLine(Misc.fixText(_this.level, data.text), nextEvent);
            }
            else if (data.type == 2 /* HEAD */) {
                runner.setHead(data.text, _this.level.imgFolder + data.url, nextEvent);
            }
        };
        runProper(runner, iterateAnim(), onnext);
    };
    return Anim;
})();
module.exports = Anim;
