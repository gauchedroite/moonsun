"use strict";

import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;
var RunnerActions = Payload.RunnerActions;


class CinemaStore extends BaseStore {
    public text: string = "";
    public url: string = "pleeeeeze wait!";
    public wait: string = "";

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.HIDE_RUNNING:
                    var data0 = <Payload.IHideRunning>action.data;
                    if (data0.now == RunnerActions.ANIM) {
                        setTimeout(() => { ActionCreators.fire(data0.nextAction); }, 10);
                    }
                    break;

                case ActionTypes.SHOW_ANIM:
                    var data1 = action.data;
                    this.text = data1.text;
                    this.url = data1.url;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = CinemaStore;
