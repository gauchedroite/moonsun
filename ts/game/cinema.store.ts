
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


class CinemaStore extends BaseStore {
    //
    // Store data
    //
    public text: string = "";
    public url: string = "pleeeeeze wait!";
    public wait: string = "";

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.SHOW_ANIM:
                    var data = action.data;
                    this.text = data.text;
                    this.url = data.url;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = CinemaStore;
