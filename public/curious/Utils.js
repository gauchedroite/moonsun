"use strict";
var InputKey;
(function (InputKey) {
    InputKey[InputKey["Num1"] = 97] = "Num1";
    InputKey[InputKey["Num2"] = 98] = "Num2";
    InputKey[InputKey["Num3"] = 99] = "Num3";
    InputKey[InputKey["Num4"] = 100] = "Num4";
    InputKey[InputKey["Num5"] = 101] = "Num5";
    InputKey[InputKey["Num6"] = 102] = "Num6";
    InputKey[InputKey["Num7"] = 103] = "Num7";
    InputKey[InputKey["Num8"] = 104] = "Num8";
    InputKey[InputKey["Num9"] = 105] = "Num9";
    InputKey[InputKey["Num0"] = 96] = "Num0";
    InputKey[InputKey["Numlock"] = 144] = "Numlock";
    InputKey[InputKey["Semicolon"] = 186] = "Semicolon";
    InputKey[InputKey["ZERO"] = 48] = "ZERO";
    InputKey[InputKey["ONE"] = 49] = "ONE";
    InputKey[InputKey["TWO"] = 50] = "TWO";
    InputKey[InputKey["THREE"] = 51] = "THREE";
    InputKey[InputKey["FOUR"] = 52] = "FOUR";
    InputKey[InputKey["FIVE"] = 53] = "FIVE";
    InputKey[InputKey["SIX"] = 54] = "SIX";
    InputKey[InputKey["SEVEN"] = 55] = "SEVEN";
    InputKey[InputKey["EIGHT"] = 56] = "EIGHT";
    InputKey[InputKey["NINE"] = 57] = "NINE";
    InputKey[InputKey["A"] = 65] = "A";
    InputKey[InputKey["B"] = 66] = "B";
    InputKey[InputKey["C"] = 67] = "C";
    InputKey[InputKey["D"] = 68] = "D";
    InputKey[InputKey["E"] = 69] = "E";
    InputKey[InputKey["F"] = 70] = "F";
    InputKey[InputKey["G"] = 71] = "G";
    InputKey[InputKey["H"] = 72] = "H";
    InputKey[InputKey["I"] = 73] = "I";
    InputKey[InputKey["J"] = 74] = "J";
    InputKey[InputKey["K"] = 75] = "K";
    InputKey[InputKey["L"] = 76] = "L";
    InputKey[InputKey["M"] = 77] = "M";
    InputKey[InputKey["N"] = 78] = "N";
    InputKey[InputKey["O"] = 79] = "O";
    InputKey[InputKey["P"] = 80] = "P";
    InputKey[InputKey["Q"] = 81] = "Q";
    InputKey[InputKey["R"] = 82] = "R";
    InputKey[InputKey["S"] = 83] = "S";
    InputKey[InputKey["T"] = 84] = "T";
    InputKey[InputKey["U"] = 85] = "U";
    InputKey[InputKey["V"] = 86] = "V";
    InputKey[InputKey["W"] = 87] = "W";
    InputKey[InputKey["X"] = 88] = "X";
    InputKey[InputKey["Y"] = 89] = "Y";
    InputKey[InputKey["Z"] = 90] = "Z";
    InputKey[InputKey["Shift"] = 16] = "Shift";
    InputKey[InputKey["Alt"] = 18] = "Alt";
    InputKey[InputKey["Up"] = 38] = "Up";
    InputKey[InputKey["Down"] = 40] = "Down";
    InputKey[InputKey["Left"] = 37] = "Left";
    InputKey[InputKey["Right"] = 39] = "Right";
    InputKey[InputKey["Space"] = 32] = "Space";
    InputKey[InputKey["Esc"] = 27] = "Esc";
})(InputKey || (InputKey = {}));
var Misc = (function () {
    function Misc() {
    }
    Misc.randomFromInterval = function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };
    Misc.markdown = function (text) {
        if (text == null)
            return null;
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(new RegExp('//(.*?)//', 'g'), '<em>$1</em>');
    };
    Misc.fixText = function (level, text) {
        var txt = Misc.markdown(text);
        var interpolated = txt;
        var re = /\$\{(.*?)\}/g;
        var match;
        while ((match = re.exec(txt)) != null) {
            interpolated = interpolated.replace(match[0], level[match[1]]);
        }
        return interpolated;
    };
    Misc.getPx = function (styleTop) {
        var top = +styleTop.replace("px", "");
        return top;
    };
    Misc.Delay_None = 0;
    Misc.Delay_Slow = 5000;
    Misc.Delay_Normal = 3000;
    Misc.Delay_Fast = 2000;
    return Misc;
})();
var Rect = (function () {
    function Rect(left, top, width, height) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    Rect.prototype.hitBy = function (x, y) {
        return (x >= this.left && x <= (this.left + this.width) && y >= this.top && y <= (this.top + this.height));
    };
    return Rect;
})();
module.exports = Misc;
