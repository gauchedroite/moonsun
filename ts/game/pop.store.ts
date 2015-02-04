
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


class Store extends BaseStore {
    public text: string = "";
    public hide: boolean = true;

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;
            var data = action.data;

            switch (action.type) {
                case ActionTypes.SHOW_POP:
                    this.text = data.text;
                    this.hide = false;
                    this.emitChange();
                    break;

                case ActionTypes.HIDE_POP:
                    this.hide = true;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = Store;
