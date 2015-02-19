
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;
var RunnerActions = Payload.RunnerActions;


class Store extends BaseStore {
    public text: string = "";
    public hide: boolean = true;
    public hideText: boolean = true;
    public collapse: boolean = true;
    public nextAction: any;

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.HIDE_RUNNING:
                    var data0 = <Payload.IHideRunning>action.data;
                    if (data0.now == RunnerActions.LINE) {
                        if (data0.next == RunnerActions.LINE || data0.next == RunnerActions.QUEST) {
                            this.hideText = true;
                            this.emitChange();
                        }
                        else {
                            this.hide = true;
                            this.hideText = true;
                            this.collapse = true;
                            this.emitChange();
                        }
                        this.nextAction = data0.nextAction;
                    }
                    break;

                case ActionTypes.SHOW_LINE:
                    var data1 = action.data;
                    this.text = data1.text;
                    this.hide = false;
                    this.hideText = false;
                    this.collapse = false;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = Store;
