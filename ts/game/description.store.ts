"use strict";

import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;
var RunnerActions = Payload.RunnerActions;


class Store extends BaseStore {
    public text: string = "";
    public hide: boolean = true;
    public nextAction: any;

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.HIDE_RUNNING:
                    var data0 = <Payload.IHideRunning>action.data;
                    if (data0.now == RunnerActions.DESC) {
                        this.hide = true;
                        this.nextAction = data0.nextAction;
                        this.emitChange();
                    }
                    break;

                case ActionTypes.SHOW_DESCRIPTION:
                    var data1 = action.data;
                    this.text = data1.text;
                    this.hide = false;
                    this.emitChange();
                    break;
            };
        });
    }
}

export = Store;
