"use strict";

import ILevel = require("../curious/ILevel");
import Game = require("../curious/Game");
import Utils = require("../curious/Utils");
import DescOpts = require("../game/runner.options");

class Level_001_Intro implements ILevel {
    public imgFolder = "/assets/level_001/img/";
    private JACK = "jack_small.jpg";
    private SPECKY = "specky_1920_low_2.jpg";
    private MASKINER = "gangmaskiner_1920_badge_small.jpg";
    private PC_intro = 0.0;
    private PC_blesses = 1.0;
    private PC_accident = 2.0;
    private PC_encore = 3.0;
    private PC_pourri = 4.0;
    private PC_qaz = 5.0;
    private PC_gameover = 99.0;

    private get pc(): number { return this.game.getVar("pc", 0); }
    private set pc(val: number) { this.game.setVar("pc", val); }
    private get attrib(): number { return this.game.getVar("attrib", 0); }
    private set attrib(val: number) { this.game.setVar("attrib", val); }

    constructor(private game: Game) {
    }

    load() {
        var game = this.game;

        game.runner.preload([this.imgFolder + this.JACK, this.imgFolder + this.SPECKY, this.imgFolder + this.MASKINER]);

        this.Accident(game);
        //this.Qaz(game);
        this.Duchesse(game);

        game.addAnim(game.newAnim(this)
            .when(() => { return this.pc == this.PC_intro; })
            .done(() => { this.pc = this.PC_blesses; })

            .show("Matante", this.SPECKY, {
                when: () => { return true; },
                done: () => { this.attrib = 42; }
            })

            /*
            //.show("Mononcle", this.MASKINER)
            //.description("Le robot est en plein milieu de la rue.")
            //.description("Et il est pas mal gros.")

            .head("Jack", this.JACK)
            .line("une **chance** que j'ai ${attrib} rex", { when: () => { return true; } })

            .head("Jaques", this.JACK) //jack-pensif
            .line("ce n'est pas facile depuis que selly n'est plus là")
            .show("Mononcle", this.MASKINER)

            .head("Jaques", this.JACK) //jack-pensif
            .line("nope")

            .description("Jack a parlé")
            */
            .value()
            )
        ;

        var LaFemmeEstSeule = () => {
            game.runner.popMessage("et je ne sais pas pourquoi...");
            this.pc = this.PC_encore;
        };

        game.addQuestion(game.newQuestion(this)
            .when(() => { return this.pc == this.PC_blesses; })

            .show("fraktarna", "gaussfraktarna_1920_badge_small.jpg")
            .head("Jack", this.JACK)
            .ask("Est-ce que je devrais voir s'il y a d'autres blessés?")
            .choice("Non, la femme a besoin d'aide immédiatement!", () => { this.pc = this.PC_qaz; }, () => { return true; })
            .choice("Non, elle semble seule", LaFemmeEstSeule)
            .choice("Non, j'appelle le 9-1-1", this.Call911)
            .timeout(Utils.Delay_Normal, 0)
            .value()
            )
        ;

        game.addQuestion(game.newQuestion(this)
            .when(() => { return this.pc == this.PC_encore; })

            .show("maskiner", "gangmaskiner_1920_badge_small.jpg")
            .head("jack", this.JACK)
            .ask("Une autre question?")
            .choice("Non, la femme a besoin d'aide immédiatement!", () => { this.pc = this.PC_pourri; })
            .choice("Non, elle semble seule", LaFemmeEstSeule)
            .timeout(Utils.Delay_Fast, 0)
            .value()
            )
        ;

        game.addAnim(game.newAnim(this)
            .when(() => { return this.pc == this.PC_pourri; })
            .done(() => { this.pc = this.PC_gameover; })

            .show("La badge", "spanviken_1920_badge_small.jpg")
            .head("Jack", this.JACK)
            .line("assez pourri...")
            .description("c'est la fin de mon histoire")
            .description("désolé de la perte de temps...", DescOpts.Center)
            .value()
            )
        ;
    }

    private Call911() {
        this.pc = this.PC_gameover;
    }

    private Accident(game: Game) {
        game.addAnim(game.newAnim(this)
            .when(() => { return this.pc == this.PC_accident; })
            .done(() => { this.pc = this.PC_encore; })

            .show("C'est piquant", this.SPECKY)
            .description("TUUUUUUUUUUUUUU uuuuu .. uuuuuu UUUUUUUUU", DescOpts.AnnoyingCenter)
            .description("Une femme, du même âge que Jack environ, est coincée dans la voiture.")
            .description("TUUuuUUUuuuuuUUUUUU UUUUUUUUUUUUU", DescOpts.AnnoyingCenter)
            .head("Jack", this.JACK)
            .line("...")
            .line("..a.. ....té.. ... arr...")
            .description("TUUuuuuuUUUUUUUUuu uuuuuu", DescOpts.AnnoyingCenter)
            .value()
            )
        ;
    }

    private Qaz(game: Game) {
        game.addAnim(game.newAnim(this)
            .when(() => { return this.pc == this.PC_qaz; })
            .done(() => { this.pc = this.PC_encore; })

            .show("C'est piquant", this.SPECKY)
            .head("Jack", this.JACK)
            .line("...")
            .line("..a.. ....té.. ... arr...")
            .description("TUUuuuuuUUUUUUUUuu uuuuuu", DescOpts.AnnoyingCenter)
            .value()
            )
        ;
    }

    private Duchesse(game: Game) {
        game.addQuestion(game.newQuestion(this)
            .when(() => { return this.pc == this.PC_qaz + 1; })

            .show("fraktarna", "gaussfraktarna_1920_badge_small.jpg")
            .head("Jack", this.JACK)
            .ask("Comment sont les chemises de la duchesse?")
            .choice("Archi froissées", () => { this.pc = this.PC_intro; }, () => { return true; })
            .choice("Blanches", this.Call911)
            .timeout(Utils.Delay_Normal, 0)
            .value()
            )
        ;
    }
}


export = Level_001_Intro;
