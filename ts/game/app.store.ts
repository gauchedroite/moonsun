
import TypedReact = require("typed-react");
import IRunner = require("../curious/IRunner");
import Game = require("../curious/Game");
import Level = require("../assets/level-001-intro");
import Payload = require("./app.payload");
import dispatcher = require("./app.dispatcher");
import CinemaStore = require("./cinema.store");
import DescriptionStore = require("./description.store");
import HeadStore = require("./head.store");
import PopStore = require("./pop.store");
import TalkStore = require("./talk.store");
import QuestStore = require("./quest.store");
import MenuStore = require("./menu.store");
import IDescOptions = require("../curious/IDescOptions");
import ActionCreators = require("./app.actioncreators");
import BaseStore = require("./base.store");

var ActionTypes = Payload.ActionTypes;
var RunnerActions = Payload.RunnerActions;

//
// Local variables
//
var game: Game = null;
var level: Level = null;

var cinema = new CinemaStore();
var description = new DescriptionStore();
var pop = new PopStore();
var head = new HeadStore();
var talk = new TalkStore();
var quest = new QuestStore();
var menu = new MenuStore();

class Store extends BaseStore implements IRunner {
    //
    // Store data
    //
    public hideClicker: boolean = false;
    public feedbackX = -1;
    public feedbackY = -1;
    public showFeedback = false;

    //
    // Private variables and methods
    //
    private move: any = null;

    //
    // Static methods for components to get access to (static) data
    //
    static getApp = () => { return (<any>window).appStore; }
    static getCinema = () => { return cinema; }
    static getDescription = () => { return description; }
    static getPop = () => { return pop; }
    static getHead = () => { return head; }
    static getTalk = () => { return talk; }
    static getQuest = () => { return quest; }
    static getMenu = () => { return menu; }

    //
    // The appStore instance could have been saved in localStorage instead of the global window.
    //
    constructor() {
        super();
        (<any>window).appStore = this;

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.CLICK:
                    setTimeout(() => { this.endMove() }, 0);
                    break;

                case ActionTypes.SHOW_MOVE:
                    setTimeout(() => { this.startMove() }, 0);
                    break;

                case ActionTypes.SHOW_QUEST:
                    this.hideClicker = true;
                    this.emitChange();
                    break;

                case ActionTypes.SELECT_QUEST:
                    var data1 = action.data;
                    this.hideClicker = false;
                    this.emitChange();
                    setTimeout(() => {
                        game.answerQuest(data1.index);
                        this.endMove()
                    }, 0);
                    break;

                case ActionTypes.SHOW_FEEDBACK:
                    var data2 = action.data;
                    this.feedbackX = data2.clientX;
                    this.feedbackY = data2.clientY;
                    this.showFeedback = true;
                    this.emitChange();
                    break;

                case ActionTypes.HIDE_FEEDBACK:
                    this.showFeedback = false;
                    this.emitChange();
                    break;
            };
        });
    }

    startGame() {
        game = new Game(this);
        level = new Level(game);
        this.move = game.getNextMove();
        this.startMove();
    }

    endMove() {
        var currentType = this.move.type;
        this.move = game.getNextMove();
        ActionCreators.hideMove(currentType, this.move.type);
    }

    startMove() {
        switch (this.move.type) {
            case Payload.AnimType.SHOW:
                ActionCreators.showAnim(this.move.text, this.move.url);
                break;

            case Payload.AnimType.DESC:
                ActionCreators.showDescription(this.move.text);
                break;

            case Payload.AnimType.HEAD:
                ActionCreators.setHead(this.move.talker, this.move.url);
                this.move = game.getNextMove();
                setTimeout(() => { this.startMove() }, 0);
                break;

            case Payload.AnimType.LINE:
                ActionCreators.showLine(this.move.text);
                break;

            case Payload.AnimType.QUEST:
                ActionCreators.showQuest(this.move.question, this.move.choices, this.move.timeout, this.move.defaultChoice);
                break;
        }
    }

    //#region IRunner

    popMessage = (message: string): void => {
        setTimeout(() => {
            ActionCreators.showPop(message);
            setTimeout(() => { ActionCreators.hidePop(); }, 3000);
        }, 1000);
    };

    gameOver = (): void => {
        alert("GAME OVER");
    };

    log = (text: string): void => { };
    preload = (assets: Array<string>): void => { };

    //#endregion
}

export = Store;
