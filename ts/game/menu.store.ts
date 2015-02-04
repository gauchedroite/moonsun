
import TypedReact = require("typed-react");
import dispatcher = require("./app.dispatcher");
import Payload = require("./app.payload");
import BaseStore = require("./base.store");
import ActionCreators = require("./app.actioncreators");

var ActionTypes = Payload.ActionTypes;


class MenuItem {
    selected: boolean = false;
    constructor(public key: string, public name: string) {
    }
}


class Store extends BaseStore {
    public hide: boolean = true;
    public list: Array<MenuItem> = null;

    constructor() {
        super();

        this.list = [
            new MenuItem("restart", "Nouvelle<br/>partie"),
            new MenuItem("play", "Retour<br/>au jeu")
        ];

        this.dispatchToken = dispatcher.register((payload: Payload.IPayload) => {
            var action = payload.action;
            var data = action.data;

            switch (action.type) {
                case ActionTypes.SHOW_MENU:
                    this.hide = !this.hide;
                    this.emitChange();
                    break;

                case ActionTypes.SELECT_MENU:
                    this.hide = true;
                    this.list[data.index].selected = true;
                    this.emitChange();
                    if (data.action == "restart") {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }
                    else {
                        setTimeout(ActionCreators.menuAnimDone, 550);
                    }
                    break;

                case ActionTypes.MENU_ANIM_DONE:
                    for (var i = 0; i < this.list.length; i++) {
                        this.list[i].selected = false;
                    }
                    this.emitChange();
                    break;
            };
        });
    }
}

export = Store;
