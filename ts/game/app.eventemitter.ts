
import EventEmitter = require("../helpers/EventEmitter");


var CHANGE_EVENT = "change";

class AppEventEmitter extends EventEmitter {
    protected emitChange = function () {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener = function (callback) {
        this.on(CHANGE_EVENT, callback);
    }
}

export = AppEventEmitter;
