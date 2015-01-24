
import Payload = require("./app.payload");
import dispatcher = require("./app.dispatcher");


class AppActions {
    static clicked = () => {
        dispatcher.dispatch({ actionName: Payload.Action.CLICK });
    }
}


export = AppActions;
