
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

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.SHOW_LINE:
                    var data1 = action.data;
                    this.text = data1.text;
                    this.hide = false;
                    this.hideText = false;
                    this.collapse = false;
                    this.emitChange();
                    break;

                case ActionTypes.HIDE_MOVE:
                    var data2 = action.data;
                    if (data2.move == Payload.AnimType.LINE) {
                        if (data2.nextMove == Payload.AnimType.LINE /*|| data2.move.nextMove == Payload.AnimType.QUEST*/) {
                            this.hideText = true;
                            this.emitChange();
                        }
                        else {
                            this.hide = true;
                            this.hideText = true;
                            this.collapse = true;
                            this.emitChange();
                        }
                    }
            };
        });
    }
}

export = Store;
