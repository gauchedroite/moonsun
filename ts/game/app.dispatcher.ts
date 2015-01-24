
import Flux = require("flux");
import Payload = require("./app.payload");

var dispatcher = new Flux.Dispatcher<Payload.IPayload>();
export = dispatcher;
