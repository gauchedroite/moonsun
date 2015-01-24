
import TypedReact = require("typed-react");
import TypedModel = require("../helpers/TypedModel");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");


//
// Store shape (Backbone attributes)
//
interface ICinema {
    text: string;
    url: string;
    wait: string;
}

class CinemaStore extends TypedModel<ICinema> implements ICinema {
    //
    // Store data (Backbone attributes)
    //
    public text: string;
    public url: string;
    public wait: string;
    public defaults(): ICinema {
        return { text: "", wait: "pleeeeeze wait!", url: "" };
    }

    //
    // Dispatch action listeners
    //
    dispatchToken: string;
    initialize(attributes?: any, options?: any) {
        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            switch (payload.actionName) {
                case Payload.Action.CINEMA_LOADED:
                    //We could be changing some store properties that would then trigger Backbone "change" events
                    break;
            };
        });
    }

    //
    // Public methods
    //
    addChangeListener = (callback, context?) => {
        this.on("change", (model, options) => { callback(model, options); }, context);
    }
    removeAllListeners = (context?) => {
        this.off(null, null, context);
    }
}

export = CinemaStore;
