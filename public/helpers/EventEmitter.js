'use strict';
function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
        if (listeners[i].listener === listener) {
            return i;
        }
    }
    return -1;
}
function alias(name) {
    return function aliasClosure() {
        return this[name].apply(this, arguments);
    };
}
var EventEmitter = (function () {
    function EventEmitter() {
        this.getListeners = function getListeners(evt) {
            var events = this._getEvents();
            var response;
            var key;
            if (evt instanceof RegExp) {
                response = {};
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        response[key] = events[key];
                    }
                }
            }
            else {
                response = events[evt] || (events[evt] = []);
            }
            return response;
        };
        this.flattenListeners = function flattenListeners(listeners) {
            var flatListeners = [];
            var i;
            for (i = 0; i < listeners.length; i += 1) {
                flatListeners.push(listeners[i].listener);
            }
            return flatListeners;
        };
        this.getListenersAsObject = function getListenersAsObject(evt) {
            var listeners = this.getListeners(evt);
            var response;
            if (listeners instanceof Array) {
                response = {};
                response[evt] = listeners;
            }
            return response || listeners;
        };
        this.addListener = function addListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var listenerIsWrapped = typeof listener === 'object';
            var key;
            for (key in listeners) {
                if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                    listeners[key].push(listenerIsWrapped ? listener : {
                        listener: listener,
                        once: false
                    });
                }
            }
            return this;
        };
        this.on = alias('addListener');
        this.addOnceListener = function addOnceListener(evt, listener) {
            return this.addListener(evt, {
                listener: listener,
                once: true
            });
        };
        this.once = alias('addOnceListener');
        this.defineEvent = function defineEvent(evt) {
            this.getListeners(evt);
            return this;
        };
        this.defineEvents = function defineEvents(evts) {
            for (var i = 0; i < evts.length; i += 1) {
                this.defineEvent(evts[i]);
            }
            return this;
        };
        this.removeListener = function removeListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var index;
            var key;
            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    index = indexOfListener(listeners[key], listener);
                    if (index !== -1) {
                        listeners[key].splice(index, 1);
                    }
                }
            }
            return this;
        };
        this.off = alias('removeListener');
        this.addListeners = function addListeners(evt, listeners) {
            return this.manipulateListeners(false, evt, listeners);
        };
        this.removeListeners = function removeListeners(evt, listeners) {
            return this.manipulateListeners(true, evt, listeners);
        };
        this.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
            var i;
            var value;
            var single = remove ? this.removeListener : this.addListener;
            var multiple = remove ? this.removeListeners : this.addListeners;
            if (typeof evt === 'object' && !(evt instanceof RegExp)) {
                for (i in evt) {
                    if (evt.hasOwnProperty(i) && (value = evt[i])) {
                        if (typeof value === 'function') {
                            single.call(this, i, value);
                        }
                        else {
                            multiple.call(this, i, value);
                        }
                    }
                }
            }
            else {
                i = listeners.length;
                while (i--) {
                    single.call(this, evt, listeners[i]);
                }
            }
            return this;
        };
        this.removeEvent = function removeEvent(evt) {
            var type = typeof evt;
            var events = this._getEvents();
            var key;
            if (type === 'string') {
                delete events[evt];
            }
            else if (evt instanceof RegExp) {
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        delete events[key];
                    }
                }
            }
            else {
                delete this._events;
            }
            return this;
        };
        this.removeAllListeners = alias('removeEvent');
        this.emitEvent = function emitEvent(evt, args) {
            var listeners = this.getListenersAsObject(evt);
            var listener;
            var i;
            var key;
            var response;
            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    i = listeners[key].length;
                    while (i--) {
                        listener = listeners[key][i];
                        if (listener.once === true) {
                            this.removeListener(evt, listener.listener);
                        }
                        response = listener.listener.apply(this, args || []);
                        if (response === this._getOnceReturnValue()) {
                            this.removeListener(evt, listener.listener);
                        }
                    }
                }
            }
            return this;
        };
        this.trigger = alias('emitEvent');
        this.emit = function emit(evt) {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(evt, args);
        };
        this.setOnceReturnValue = function setOnceReturnValue(value) {
            this._onceReturnValue = value;
            return this;
        };
        this._getOnceReturnValue = function _getOnceReturnValue() {
            if (this.hasOwnProperty('_onceReturnValue')) {
                return this._onceReturnValue;
            }
            else {
                return true;
            }
        };
        this._getEvents = function _getEvents() {
            return this._events || (this._events = {});
        };
    }
    return EventEmitter;
})();
module.exports = EventEmitter;
