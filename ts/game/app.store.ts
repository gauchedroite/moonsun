
import TypedReact = require("typed-react");
import TypedModel = require("../helpers/TypedModel");
import IRunner = require("../curious/IRunner");
import Payload = require("./app.payload");
import dispatcher = require("./app.dispatcher");
import CinemaStore = require("./cinema.store");
import DescriptionStore = require("./description.store");
import IDescOptions = require("../curious/IDescOptions");


//
// Local variables
//
var cinema = new CinemaStore();
var description = new DescriptionStore();


//
// Store data shape (Backbone attributes)
//
interface IApp {
    hideClicker: boolean;
}

class Store extends TypedModel<IApp> implements IApp, IRunner {
    //
    // Could be saved in localStorage instead
    //
    constructor() {
        super();
        (<any>window).appStore = this;
    }

    //
    // Store data (Backbone attributes)
    //
    public hideClicker: boolean;

    public defaults(): IApp {
        return {
            hideClicker: false
        };
    }

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
        cinema.set({ text: text, url: url });
        this.animEvent = nextEvent;
    }

    showDescription = (text: string, nextEvent: () => void, options?: IDescOptions): void => {
        //description.text = text;
        //description.hide = false;
        description.set({ text: text, hide: false });

        this.animEvent = () => {
            description.hide = true;
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
    initialize(attributes?: any, options?: any) {
        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            switch (payload.actionName) {
                case Payload.Action.CLICK:
                    //We could be changing some store properties that would then trigger Backbone "change" events
                    //setTimeout(this.animEvent, 1);
                    this.animEvent();
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
