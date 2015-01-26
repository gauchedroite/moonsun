
import TypedReact = require("typed-react");
import IRunner = require("../curious/IRunner");
import Payload = require("./app.payload");
import dispatcher = require("./app.dispatcher");
import CinemaStore = require("./cinema.store");
import DescriptionStore = require("./description.store");
import IDescOptions = require("../curious/IDescOptions");
import ActionCreators = require("./app.actioncreators");
import AppEventEmitter = require("./app.eventemitter");

var ActionTypes = Payload.ActionTypes;

//
// Local variables
//
var cinema = new CinemaStore();
var description = new DescriptionStore();


//
// Store data shape
//
interface IApp {
    hideClicker: boolean;
}

class Store extends AppEventEmitter implements IApp, IRunner {
    //
    // Could be saved in localStorage instead
    //
    constructor() {
        super();
        (<any>window).appStore = this;
        this.initialize();
    }

    //
    // Store data
    //
    public hideClicker: boolean = false;

    //
    // Static methods for components to get access to (static) data
    //
    static getApp = () => { return (<any>window).appStore; }
    static getCinema = () => { return cinema; }
    static getDescription = () => { return description; }

    //#region IRunner

    //
    // IRunner implementation
    //

    ready = (): void => {
    };

    showAnim = (text: string, url: string, nextEvent: () => void, immediate?: boolean): void => {
        //cinema.text = text;
        //cinema.url = url;
        //this.animEvent = nextEvent;
        ActionCreators.showAnim(text, url, nextEvent);
    }

    showDescription = (text: string, nextEvent: () => void, options?: IDescOptions): void => {
        //description.text = text;
        //description.hide = false;
        ActionCreators.showDescription(text, nextEvent);
        //description.set({ text: text, hide: false });

        this.animEvent = () => {
            ActionCreators.hideDescription();
            setTimeout(nextEvent, 150);
        };
    }

    setHead = (talker: string, url: string, nextEvent: () => void): void => {
        //debugger;
    };

    showLine = (line: string, nextEvent: () => void): void => {
        //debugger;
    };

    showQuestion = (question: string, choices: Array<string>, timeoutMax: number, defaultChoice: number, answerEvent: (choice: number) => void): void => {
        //debugger;
    };

    popMessage = (message: string): void => {
        //debugger;
    };

    gameOver = (): void => {
        //debugger;
    };

    log = (text: string): void => { };
    onGameEvent: (eventName: string) => void;
    preload = (assets: Array<string>): void => { };

    //#endregion

    //
    // Dispatch action listeners
    //
    dispatchToken: string;
    initialize() {
        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.CLICK:
                    setTimeout(this.animEvent, 0);
                    break;

                case ActionTypes.SHOW_ANIM:
                case ActionTypes.SHOW_DESCRIPTION:
                    var data = action.data;
                    this.animEvent = data.nextEvent;
                    break;
            };
        });
    }

    //
    // Private variables and methods
    //
    private animEvent: () => void;
}

export = Store;
