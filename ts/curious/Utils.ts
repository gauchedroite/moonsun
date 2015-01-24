"use strict";

import ILevel = require("./ILevel");

enum InputKey {
    Num1 = 97, Num2 = 98, Num3 = 99, Num4 = 100, Num5 = 101, Num6 = 102, Num7 = 103, Num8 = 104, Num9 = 105, Num0 = 96,
    Numlock = 144,
    Semicolon = 186,
    ZERO = 48, ONE = 49, TWO = 50, THREE = 51, FOUR = 52, FIVE = 53, SIX = 54, SEVEN = 55, EIGHT = 56, NINE = 57,
    A = 65, B = 66, C = 67, D = 68, E = 69, F = 70, G = 71, H = 72, I = 73, J = 74, K = 75, L = 76, M = 77,
    N = 78, O = 79, P = 80, Q = 81, R = 82, S = 83, T = 84, U = 85, V = 86, W = 87, X = 88, Y = 89, Z = 90,
    Shift = 16, Alt = 18,
    Up = 38, Down = 40, Left = 37, Right = 39,
    Space = 32, Esc = 27
}

class Misc {

    static Delay_None = 0;
    static Delay_Slow = 5000;
    static Delay_Normal = 3000;
    static Delay_Fast = 2000;

    static randomFromInterval(from: number, to: number) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    static markdown(text: string): string {
        if (text == null) return null;
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(new RegExp('//(.*?)//', 'g'), '<em>$1</em>');
    }

  static fixText(level: ILevel, text: string): string {
        var txt = Misc.markdown(text);

        var interpolated = txt;
        var re = /\$\{(.*?)\}/g;
        var match: RegExpExecArray;

        while ((match = re.exec(txt)) != null) {
            //txt = txt.replace("${attrib}", this.level["attrib"]);
            interpolated = interpolated.replace(match[0], level[match[1]]);
        }
        return interpolated;
    }

    static getPx(styleTop: string): number {
        var top = +styleTop.replace("px", "");
        return top;
    }
}

class Rect {
    constructor(public left = 0, public top = 0, public width = 0, public height = 0) { }

    hitBy(x: number, y: number): boolean {
        return (x >= this.left && x <= (this.left + this.width) && y >= this.top && y <= (this.top + this.height));
    }
}


export = Misc;
