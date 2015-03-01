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
var AnimType;
(function (AnimType) {
    AnimType[AnimType["SHOW"] = 0] = "SHOW";
    AnimType[AnimType["DESC"] = 1] = "DESC";
    AnimType[AnimType["HEAD"] = 2] = "HEAD";
    AnimType[AnimType["LINE"] = 3] = "LINE";
    AnimType[AnimType["QUEST"] = 4] = "QUEST";
    AnimType[AnimType["GAMEOVER"] = 5] = "GAMEOVER";
})(AnimType || (AnimType = {}));
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
        this.initialized = false;
        this.question = null;
        this.choices = new Array();
        this.choicesMap = new Array();
        this.answers = [];
        this.data = new Array();
        this.timeout_ = 0;
        this.choice_ = 0;
        this.index = 0;
        this.questShowned = false;
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
    Question.prototype.step_curious_internal = function (runner) {
        var data = this.currentData;
        if (this.initialized == false) {
            this.initialized = true;
            var imap = 0;
            for (var ix = 0; ix < this.data.length; ix++) {
                var ixData = this.data[ix];
                var ok = true;
                if (ixData.when != undefined)
                    ok = ixData.when();
                if (ok) {
                    if (ixData.type == 2 /* ASK */)
                        this.question = ixData.text;
                    if (ixData.type == 3 /* CHOICE */) {
                        this.choices.push(ixData.text);
                        this.answers.push(ixData.done.bind(this.level));
                        this.choicesMap.push(imap);
                        imap++;
                    }
                    if (ixData.type == 4 /* DEFAULTANSWER */)
                        this.choice_ = +ixData.text;
                    if (ixData.type == 5 /* DELAY */)
                        this.timeout_ = +ixData.text;
                }
                else {
                    if (ixData.type == 3 /* CHOICE */) {
                        this.choicesMap.push(-1);
                    }
                }
            }
        }
        var found = false;
        while (this.index != this.data.length) {
            data = this.currentData = this.data[this.index];
            this.index++;
            if (data.type == 0 /* SHOW */ || data.type == 1 /* HEAD */) {
                var ok = true;
                if (data.when != undefined)
                    ok = data.when();
                if (ok) {
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            if (data.type == 0 /* SHOW */) {
                return {
                    type: 0 /* SHOW */,
                    text: data.text,
                    url: Misc.fixText(this.level, this.level.imgFolder + data.url)
                };
            }
            else if (data.type == 1 /* HEAD */) {
                return {
                    type: 2 /* HEAD */,
                    talker: data.text,
                    url: this.level.imgFolder + data.url
                };
            }
        }
        if (this.questShowned == false) {
            this.questShowned = true;
            return {
                type: 4 /* QUEST */,
                question: this.question,
                choices: this.choices,
                timeout: this.timeout_,
                defaultChoice: this.choicesMap[this.choice_]
            };
        }
        this.index = 0;
        this.questShowned = false;
        return null;
    };
    Question.prototype.answerQuest = function (choice) {
        if (choice != -1) {
            for (var i = 0; i < this.choicesMap.length; i++) {
                if (this.choicesMap[i] == choice) {
                    choice = i;
                    break;
                }
            }
            var funAnswer = this.answers[choice];
            if (funAnswer != undefined) {
                funAnswer();
            }
        }
    };
    return Question;
})();
module.exports = Question;
