
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import AppEventEmitter = require("./app.eventemitter");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


//
// Store shape
//
interface ICinema {
    text: string;
    url: string;
    wait: string;
}

class CinemaStore extends AppEventEmitter implements ICinema {
    //
    // Store data
    //
    public text: string = "";
    public url: string = "pleeeeeze wait!";
    public wait: string = "";

    constructor() {
        super();
        this.initialize();
    }

    //
    // Dispatch action listeners
    //
    dispatchToken: string;
    initialize() {
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
