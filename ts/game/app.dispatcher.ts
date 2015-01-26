
import Flux = require("flux");
import Payload = require("./app.payload");

class appDispatcher extends Flux.Dispatcher<Payload.IPayload>
{
    handleServerAction = (action: Payload.IPayloadAction) => {
        var payload: Payload.IPayload = {
            source: Payload.PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    }

    handleViewAction = (action: Payload.IPayloadAction) => {
        var payload: Payload.IPayload = {
            source: Payload.PayloadSources.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
}


var dispatcher = new appDispatcher();
export = dispatcher;
