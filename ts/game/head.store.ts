
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


class Store extends BaseStore {
    public talker: string = "";
    public url: string = "";

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.SET_HEAD:
                    var data = action.data;
                    this.talker = data.talker;
                    this.url = data.url;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = Store;
