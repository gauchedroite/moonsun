
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
    private animEvent: () => void;
    private answerEvent: (choice: number) => void;
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
            var data = action.data;

            switch (action.type) {
                case ActionTypes.CLICK:
                    setTimeout(this.animEvent, 0);
                    break;

                case ActionTypes.SHOW_ANIM:
                case ActionTypes.SHOW_DESCRIPTION:
                case ActionTypes.SHOW_LINE:
                    this.animEvent = data.nextEvent;
                    break;

                case ActionTypes.SHOW_QUEST:
                    this.answerEvent = data.answerEvent;
                    this.hideClicker = true;
                    this.emitChange();
                    break;

                case ActionTypes.SELECT_QUEST:
                    this.hideClicker = false;
                    this.selectedQuest = data.index;
                    this.emitChange();
                    break;

                case ActionTypes.QUEST_ANIM_DONE:
                    setTimeout(() => { this.answerEvent(this.selectedQuest); }, 0);
                    break;

                case ActionTypes.SHOW_FEEDBACK:
                    //if (this.showFeedback == false) {
                        this.feedbackX = data.clientX;
                        this.feedbackY = data.clientY;
                        this.showFeedback = true;
                        this.emitChange();
                    //}
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
        ActionCreators.showAnim(text, url, nextEvent);
    }

    showDescription = (text: string, nextEvent: () => void, options?: IDescOptions): void => {
        ActionCreators.showDescription(text, nextEvent);

        this.animEvent = () => {
            ActionCreators.hideDescription();
            setTimeout(nextEvent, 150);
        };
    }

    setHead = (talker: string, url: string, nextEvent: () => void): void => {
        ActionCreators.setHead(talker, url);
        setTimeout(nextEvent, 0);
    };

    showLine = (line: string, nextEvent: () => void): void => {
        ActionCreators.showLine(line, nextEvent);

        this.animEvent = () => {
            ActionCreators.hideLine();
            setTimeout(nextEvent, 0);
        };
    };

    showQuestion = (question: string, choices: Array<string>, timeoutMax: number, defaultChoice: number, answerEvent: (choice: number) => void): void => {
        ActionCreators.showQuest(question, choices, timeoutMax, defaultChoice, answerEvent);
        //answerEvent(index) will be called on HIDE_QUEST
    };

    popMessage = (message: string): void => {
        ActionCreators.showPop(message);

        setTimeout(() => {
            ActionCreators.hidePop();
        }, 3000);
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
