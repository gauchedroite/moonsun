
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


class Store extends BaseStore {
    public question: string = "";
    public choices: Array<string> = new Array<string>();
    public timeoutMax: number = 0;
    public defaultChoice: number = -1;
    public hide: boolean = true;
    public hideClock: boolean = true;
    public indexSelected: number = -1;

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;
            var data = action.data;

            switch (action.type) {
                case ActionTypes.SHOW_QUEST:
                    this.question = data.question;
                    this.choices = data.choices;
                    this.timeoutMax = data.timeoutMax;
                    this.defaultChoice = data.defaultChoice;
                    this.hideClock = (this.timeoutMax == 0);
                    this.indexSelected = -1;
                    this.hide = false;
                    this.emitChange();
                    break;

                case ActionTypes.SELECT_QUEST:
                    this.hide = true;
                    this.hideClock = true;
                    this.indexSelected = data.index;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = Store;
