"use strict";
var Utils = require("../curious/Utils");
var DescOpts = require("../game/runner.options");
var Level_001_Intro = (function () {
    function Level_001_Intro(game) {
        this.game = game;
        this.imgFolder = "/assets/level_001/img/";
        this.JACK = "jack_small.jpg";
        this.SPECKY = "specky_1920_low_2.jpg";
        this.MASKINER = "gangmaskiner_1920_badge_small.jpg";
        this.PC_intro = 0.0;
        this.PC_blesses = 1.0;
        this.PC_accident = 2.0;
        this.PC_encore = 3.0;
        this.PC_pourri = 4.0;
        this.PC_qaz = 5.0;
        this.PC_gameover = 99.0;
    }
    Object.defineProperty(Level_001_Intro.prototype, "pc", {
        get: function () {
            return this.game.getVar("pc", 0);
        },
        set: function (val) {
            this.game.setVar("pc", val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Level_001_Intro.prototype, "attrib", {
        get: function () {
            return this.game.getVar("attrib", 0);
        },
        set: function (val) {
            this.game.setVar("attrib", val);
        },
        enumerable: true,
        configurable: true
    });
    Level_001_Intro.prototype.load = function () {
        var _this = this;
        var game = this.game;
        game.runner.preload([this.imgFolder + this.JACK, this.imgFolder + this.SPECKY, this.imgFolder + this.MASKINER]);
        this.Accident(game);
        this.Duchesse(game);
        game.addAnim(game.newAnim(this).when(function () {
            return _this.pc == _this.PC_intro;
        }).done(function () {
            _this.pc = _this.PC_blesses;
        }).show("Matante", this.SPECKY, {
            when: function () {
                return true;
            },
            done: function () {
                _this.attrib = 42;
            }
        }).value());
        var LaFemmeEstSeule = function () {
            game.runner.popMessage("et je ne sais pas pourquoi...");
            _this.pc = _this.PC_encore;
        };
        game.addQuestion(game.newQuestion(this).when(function () {
            return _this.pc == _this.PC_blesses;
        }).show("fraktarna", "gaussfraktarna_1920_badge_small.jpg").head("Jack", this.JACK).ask("Est-ce que je devrais voir s'il y a d'autres blessés?").choice("Non, la femme a besoin d'aide immédiatement!", function () {
            _this.pc = _this.PC_qaz;
        }, function () {
            return true;
        }).choice("Non, elle semble seule", LaFemmeEstSeule).choice("Non, j'appelle le 9-1-1", this.Call911).timeout(Utils.Delay_Normal, 0).value());
        game.addQuestion(game.newQuestion(this).when(function () {
            return _this.pc == _this.PC_encore;
        }).show("maskiner", "gangmaskiner_1920_badge_small.jpg").head("jack", this.JACK).ask("Une autre question?").choice("Non, la femme a besoin d'aide immédiatement!", function () {
            _this.pc = _this.PC_pourri;
        }).choice("Non, elle semble seule", LaFemmeEstSeule).timeout(Utils.Delay_Fast, 0).value());
        game.addAnim(game.newAnim(this).when(function () {
            return _this.pc == _this.PC_pourri;
        }).done(function () {
            _this.pc = _this.PC_gameover;
        }).show("La badge", "spanviken_1920_badge_small.jpg").head("Jack", this.JACK).line("assez pourri...").description("c'est la fin de mon histoire").description("désolé de la perte de temps...", DescOpts.Center).value());
    };
    Level_001_Intro.prototype.Call911 = function () {
        this.pc = this.PC_gameover;
    };
    Level_001_Intro.prototype.Accident = function (game) {
        var _this = this;
        game.addAnim(game.newAnim(this).when(function () {
            return _this.pc == _this.PC_accident;
        }).done(function () {
            _this.pc = _this.PC_encore;
        }).show("C'est piquant", this.SPECKY).description("TUUUUUUUUUUUUUU uuuuu .. uuuuuu UUUUUUUUU", DescOpts.AnnoyingCenter).description("Une femme, du même âge que Jack environ, est coincée dans la voiture.").description("TUUuuUUUuuuuuUUUUUU UUUUUUUUUUUUU", DescOpts.AnnoyingCenter).head("Jack", this.JACK).line("...").line("..a.. ....té.. ... arr...").description("TUUuuuuuUUUUUUUUuu uuuuuu", DescOpts.AnnoyingCenter).value());
    };
    Level_001_Intro.prototype.Qaz = function (game) {
        var _this = this;
        game.addAnim(game.newAnim(this).when(function () {
            return _this.pc == _this.PC_qaz;
        }).done(function () {
            _this.pc = _this.PC_encore;
        }).show("C'est piquant", this.SPECKY).head("Jack", this.JACK).line("...").line("..a.. ....té.. ... arr...").description("TUUuuuuuUUUUUUUUuu uuuuuu", DescOpts.AnnoyingCenter).value());
    };
    Level_001_Intro.prototype.Duchesse = function (game) {
        var _this = this;
        game.addQuestion(game.newQuestion(this).when(function () {
            return _this.pc == _this.PC_qaz + 1;
        }).show("fraktarna", "gaussfraktarna_1920_badge_small.jpg").head("Jack", this.JACK).ask("Comment sont les chemises de la duchesse?").choice("Archi froissées", function () {
            _this.pc = _this.PC_intro;
        }, function () {
            return true;
        }).choice("Blanches", this.Call911).timeout(Utils.Delay_Normal, 0).value());
    };
    return Level_001_Intro;
})();
module.exports = Level_001_Intro;
