
import EventEmitter = require("../helpers/EventEmitter");


var CHANGE_EVENT = "change";

class BaseStore extends EventEmitter {
    public dispatchToken: string;

    protected emitChange = function () {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener = function (callback) {
        this.on(CHANGE_EVENT, callback);
    }
}

export = BaseStore;
