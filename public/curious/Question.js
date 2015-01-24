"use strict";
var Misc = require("./Utils");
var QuestionData = (function () {
    function QuestionData(level, type, text, url, whendone) {
        this.level = level;
        this.type = type;
        this.text = text;
        this.url = url;
        if (whendone != undefined) {
            if (whendone.when != undefined)
                this.when = whendone.when.bind(this.level);
            if (whendone.done != undefined)
                this.done = whendone.done.bind(this.level);
        }
    }
    return QuestionData;
})();
var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["SHOW"] = 0] = "SHOW";
    QuestionType[QuestionType["HEAD"] = 1] = "HEAD";
    QuestionType[QuestionType["ASK"] = 2] = "ASK";
    QuestionType[QuestionType["CHOICE"] = 3] = "CHOICE";
    QuestionType[QuestionType["DEFAULTANSWER"] = 4] = "DEFAULTANSWER";
    QuestionType[QuestionType["DELAY"] = 5] = "DELAY";
})(QuestionType || (QuestionType = {}));
var Question = (function () {
    function Question(level) {
        this.level = level;
        this.data = new Array();
        this.funWhen_curious_internal = function () {
            return false;
        };
        this.funDone_curious_internal = function () {
        };
        return this;
    }
    Question.prototype.show = function (title, url, whendone) {
        this.data.push(new QuestionData(this.level, 0 /* SHOW */, title, url, whendone));
        return this;
    };
    Question.prototype.head = function (name, url) {
        this.data.push(new QuestionData(this.level, 1 /* HEAD */, name, url));
        return this;
    };
    Question.prototype.ask = function (line) {
        this.data.push(new QuestionData(this.level, 2 /* ASK */, line));
        return this;
    };
    Question.prototype.choice = function (line, done, when) {
        this.data.push(new QuestionData(this.level, 3 /* CHOICE */, line, null, { done: done, when: when }));
        return this;
    };
    Question.prototype.timeout = function (delay, defaultAnswer, whendone) {
        this.data.push(new QuestionData(this.level, 5 /* DELAY */, delay.toString(), null, whendone));
        this.data.push(new QuestionData(this.level, 4 /* DEFAULTANSWER */, defaultAnswer.toString()));
        return this;
    };
    Question.prototype.value = function () {
        return this;
    };
    Question.prototype.when = function (fun) {
        this.funWhen_curious_internal = fun.bind(this.level);
        return this;
    };
    Question.prototype.play_curious_internal = function (runner, completed) {
        var question;
        var choices = new Array();
        var choicesMap = new Array();
        var imap = 0;
        var answers = [];
        var timeout_ = 0;
        var choice_ = 0;
        for (var index = 0; index < this.data.length; index++) {
            var currentData = this.data[index];
            var ok = true;
            if (currentData.when != undefined)
                ok = currentData.when();
            if (ok) {
                if (currentData.type == 2 /* ASK */)
                    question = currentData.text;
                if (currentData.type == 3 /* CHOICE */) {
                    choices.push(currentData.text);
                    answers.push(currentData.done.bind(this.level));
                    choicesMap.push(imap);
                    imap++;
                }
                if (currentData.type == 4 /* DEFAULTANSWER */)
                    choice_ = +currentData.text;
                if (currentData.type == 5 /* DELAY */)
                    timeout_ = +currentData.text;
            }
            else {
                if (currentData.type == 3 /* CHOICE */) {
                    choicesMap.push(-1);
                }
            }
        }
        var onanswer = function (choice) {
            if (choice != -1) {
                for (var i = 0; i < choicesMap.length; i++) {
                    if (choicesMap[i] == choice) {
                        choice = i;
                        break;
                    }
                }
                var funAnswer = answers[choice];
                if (funAnswer != undefined) {
                    funAnswer();
                }
            }
            completed();
        };
        this.play_anim_actions(runner, function () {
            runner.showQuestion(question, choices, timeout_, choicesMap[choice_], onanswer);
        });
    };
    Question.prototype.play_anim_actions = function (runner, completed) {
        var _this = this;
        var index = 0;
        var currentData;
        var iterateAnim = function () {
            while (index != _this.data.length) {
                currentData = _this.data[index];
                index++;
                if (currentData.type == 0 /* SHOW */ || currentData.type == 1 /* HEAD */) {
                    var ok = true;
                    if (currentData.when != undefined)
                        ok = currentData.when();
                    if (ok) {
                        return currentData;
                    }
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
            if (data == null)
                nextEvent();
            if (data.type == 0 /* SHOW */) {
                runner.showAnim(data.text, Misc.fixText(_this.level, _this.level.imgFolder + data.url), nextEvent);
            }
            else if (data.type == 1 /* HEAD */) {
                runner.setHead(data.text, _this.level.imgFolder + data.url, nextEvent);
            }
        };
        runProper(runner, iterateAnim(), onnext);
    };
    return Question;
})();
module.exports = Question;
