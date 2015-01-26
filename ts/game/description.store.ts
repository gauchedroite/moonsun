
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import AppEventEmitter = require("./app.eventemitter");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


interface IDescription {
    text: string;
    hide: boolean;
}

class DescriptionStore extends AppEventEmitter implements IDescription {
    public text: string = "";
    public hide: boolean = true;

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
                case ActionTypes.SHOW_DESCRIPTION:
                    var data = action.data;
                    this.text = data.text;
                    this.hide = false;
                    this.emitChange();
                    break;

                case ActionTypes.HIDE_DESCRIPTION:
                    this.hide = true;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = DescriptionStore;
