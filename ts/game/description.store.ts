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

    constructor() {
        super();

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;

            switch (action.type) {
                case ActionTypes.SHOW_DESCRIPTION:
                    var data1 = action.data;
                    this.text = data1.text;
                    this.hide = false;
                    this.emitChange();
                    break;

                case ActionTypes.HIDE_MOVE:
                    var data2 = action.data;
                    if (data2.move == Payload.AnimType.DESC) {
                        this.hide = true;
                        this.emitChange();
                    }
            };
        });
    }
}

export = Store;
