
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

    static showPop = (text: string) => {
        var action = {
            type: Payload.ActionTypes.SHOW_POP,
            data: {
                text: text
            }
        }
        dispatcher.handleViewAction(action);
    }

    static hidePop = () => {
        var action = {
            type: Payload.ActionTypes.HIDE_POP
        }
        dispatcher.handleViewAction(action);
    }

    static setHead = (talker: string, url: string) => {
        var action = {
            type: Payload.ActionTypes.SET_HEAD,
            data: {
                talker: talker,
                url: url
            }
        }
        dispatcher.handleViewAction(action);
    }

    static showLine = (text: string, nextEvent: () => void) => {
        var action = {
            type: Payload.ActionTypes.SHOW_LINE,
            data: {
                text: text,
                nextEvent: nextEvent
            }
        }
        dispatcher.handleViewAction(action);
    }

    static hideLine = () => {
        var action = {
            type: Payload.ActionTypes.HIDE_LINE
        }
        dispatcher.handleViewAction(action);
    }

    static showQuest = (question: string, choices: Array<string>, timeoutMax: number, defaultChoice: number, answerEvent: (choice: number) => void) => {
        var action = {
            type: Payload.ActionTypes.SHOW_QUEST,
            data: {
                question: question,
                choices: choices,
                timeoutMax: timeoutMax,
                defaultChoice: defaultChoice,
                answerEvent: answerEvent
            }
        }
        dispatcher.handleViewAction(action);
    }

    static selectQuest = (index: number) => {
        var action = {
            type: Payload.ActionTypes.SELECT_QUEST,
            data: {
                index: index
            }
        }
        dispatcher.handleViewAction(action);
    }

    static questAnimDone = () => {
        var action = {
            type: Payload.ActionTypes.QUEST_ANIM_DONE
        }
        dispatcher.handleViewAction(action);
    }

    static showFeedback = (clientX: number, clientY: number) => {
        var action = {
            type: Payload.ActionTypes.SHOW_FEEDBACK,
            data: {
                clientX: clientX,
                clientY: clientY
            }
        }
        dispatcher.handleViewAction(action);
    }

    static hideFeedback = () => {
        var action = {
            type: Payload.ActionTypes.HIDE_FEEDBACK
        }
        dispatcher.handleViewAction(action);
    }

    static showMenu = () => {
        var action = {
            type: Payload.ActionTypes.SHOW_MENU
        }
        dispatcher.handleViewAction(action);
    }

    static selectMenu = (item: string, index: number) => {
        var action = {
            type: Payload.ActionTypes.SELECT_MENU,
            data: {
                action: item,
                index: index
            }
        }
        dispatcher.handleViewAction(action);
    }

    static menuAnimDone = () => {
        var action = {
            type: Payload.ActionTypes.MENU_ANIM_DONE
        }
        dispatcher.handleViewAction(action);
    }
}


export = AppActionCreators;
