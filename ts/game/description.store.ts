
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


class DescriptionStore extends BaseStore {
    public text: string = "";
    public hide: boolean = true;

    constructor() {
        super();

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
