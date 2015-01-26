
import Payload = require("./app.payload");
import dispatcher = require("./app.dispatcher");


class AppActionCreators {
    static clicked = () => {
        var action = {
            type: Payload.ActionTypes.CLICK
        }
        dispatcher.handleViewAction(action);
    }

    static showAnim = (text: string, url: string, nextEvent: () => void) => {
        var action = {
            type: Payload.ActionTypes.SHOW_ANIM,
            data: {
                text: text,
                url: url,
                nextEvent: nextEvent
            }
        }
        dispatcher.handleViewAction(action);
    }

    static showDescription = (text: string, nextEvent: () => void) => {
        var action = {
            type: Payload.ActionTypes.SHOW_DESCRIPTION,
            data: {
                text: text,
                nextEvent: nextEvent
            }
        }
        dispatcher.handleViewAction(action);
    }

    static hideDescription = () => {
        var action = {
            type: Payload.ActionTypes.HIDE_DESCRIPTION
        }
        dispatcher.handleViewAction(action);
    }
}


export = AppActionCreators;
