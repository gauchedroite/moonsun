
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;
var RunnerActions = Payload.RunnerActions;


class Store extends BaseStore {
    public question: string = "";
    public choices: Array<string> = new Array<string>();
    public timeoutMax: number = 0;
    public defaultChoice: number = -1;
    public hide: boolean = true;
    public hideClock: boolean = true;
    public indexSelected: number = -1;
    public fireNextAction: boolean = false;

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.SHOW_QUEST:
                    var data1 = action.data;
                    this.question = data1.question;
                    this.choices = data1.choices;
                    this.timeoutMax = data1.timeoutMax;
                    this.defaultChoice = data1.defaultChoice;
                    this.hideClock = (this.timeoutMax == 0);
                    this.indexSelected = -1;
                    this.hide = false;
                    this.fireNextAction = false;
                    this.emitChange();
                    break;

                case ActionTypes.SELECT_QUEST:
                    var data2 = action.data;
                    this.hide = true;
                    this.hideClock = true;
                    this.indexSelected = data2.index;
                    this.fireNextAction = true;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = Store;
