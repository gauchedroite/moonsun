
import Payload = require("./app.payload");
import dispatcher = require("./app.dispatcher");


class AppActionCreators {
    static fire = (action: any) => {
        dispatcher.handleViewAction(action);
    }

    static clicked = () => {
        var action = {
            type: Payload.ActionTypes.CLICK
        }
        dispatcher.handleViewAction(action);
    }

    static hideRunningPrepareNextFire = (now: string, next: string, nextAction: any) => {
        var action = {
            type: Payload.ActionTypes.HIDE_RUNNING,
            data: <Payload.IHideRunning> {
                now: now,
                next: next,
                nextAction: nextAction
            }
        }
        dispatcher.handleViewAction(action);
    }

    static buildShowAnim = (text: string, url: string) => {
        return {
            type: Payload.ActionTypes.SHOW_ANIM,
            data: {
                text: text,
                url: url
            }
        };
    }
    static showAnim = (text: string, url: string) => {
        var action = AppActionCreators.buildShowAnim(text, url);
        dispatcher.handleViewAction(action);
    }

    static buildShowDescription = (text: string) => {
        return {
            type: Payload.ActionTypes.SHOW_DESCRIPTION,
            data: {
                text: text
            }
        };
    }
    static showDescription = (text: string) => {
        var action = AppActionCreators.buildShowDescription(text);
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

    static buildShowLine = (text: string) => {
        return {
            type: Payload.ActionTypes.SHOW_LINE,
            data: {
                text: text
            }
        };
    }
    static showLine = (text: string) => {
        var action = AppActionCreators.buildShowLine(text);
        dispatcher.handleViewAction(action);
    }

    static buildShowQuest = (question: string, choices: Array<string>, timeoutMax: number, defaultChoice: number) => {
        return {
            type: Payload.ActionTypes.SHOW_QUEST,
            data: {
                question: question,
                choices: choices,
                timeoutMax: timeoutMax,
                defaultChoice: defaultChoice
            }
        }
    }
    static showQuest = (question: string, choices: Array<string>, timeoutMax: number, defaultChoice: number) => {
        var action = AppActionCreators.buildShowQuest(question, choices, timeoutMax, defaultChoice);
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

    static questDone = () => {
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
