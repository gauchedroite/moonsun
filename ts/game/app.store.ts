
import TypedReact = require("typed-react");
import IRunner = require("../curious/IRunner");
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
    private gotoNext: () => void;
    private running: string = null;
    private selectedQuest: number = -1;

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
    // Could be saved in localStorage instead
    //
    constructor() {
        super();
        (<any>window).appStore = this;

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.CLICK:
                    setTimeout(this.gotoNext, 0);
                    break;

                case ActionTypes.HIDE_RUNNING:
                    var data0 = <Payload.IHideRunning>action.data;
                    if (data0.now == null) {
                        setTimeout(() => { ActionCreators.fire(data0.nextAction); }, 0);
                    }
                    break;

                case ActionTypes.SHOW_QUEST:
                    this.hideClicker = true;
                    this.emitChange();
                    break;

                case ActionTypes.SELECT_QUEST:
                    var data1 = action.data;
                    this.hideClicker = false;
                    this.selectedQuest = data1.index;
                    this.emitChange();
                    setTimeout(this.gotoNext, 0);
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

    //#region IRunner

    //
    // IRunner implementation
    //

    ready = (): void => {
    };

    showAnim = (text: string, url: string, nextEvent: () => void, immediate?: boolean): void => {
        ActionCreators.hideRunningPrepareNextFire(
            this.running,
            RunnerActions.ANIM,
            ActionCreators.buildShowAnim(text, url));

        this.gotoNext = () => {
            this.running = RunnerActions.ANIM;
            nextEvent();
        };
    }

    showDescription = (text: string, nextEvent: () => void, options?: IDescOptions): void => {
        ActionCreators.hideRunningPrepareNextFire(
            this.running,
            RunnerActions.DESC,
            ActionCreators.buildShowDescription(text));

        this.gotoNext = () => {
            this.running = RunnerActions.DESC;
            nextEvent();
        };
    }

    setHead = (talker: string, url: string, nextEvent: () => void): void => {
        ActionCreators.setHead(talker, url);
        setTimeout(nextEvent, 0);
    };

    showLine = (line: string, nextEvent: () => void): void => {
        ActionCreators.hideRunningPrepareNextFire(
            this.running,
            RunnerActions.LINE,
            ActionCreators.buildShowLine(line));

        this.gotoNext = () => {
            this.running = RunnerActions.LINE;
            nextEvent();
        };
    };

    showQuestion = (question: string, choices: Array<string>, timeoutMax: number, defaultChoice: number, answerEvent: (choice: number) => void): void => {
        ActionCreators.hideRunningPrepareNextFire(
            this.running,
            RunnerActions.QUEST,
            ActionCreators.buildShowQuest(question, choices, timeoutMax, defaultChoice));

        this.gotoNext = () => {
            this.running = RunnerActions.QUEST;
            answerEvent(this.selectedQuest);
        };
    };

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
    onGameEvent: (eventName: string) => void;
    preload = (assets: Array<string>): void => { };

    //#endregion
}

export = Store;
