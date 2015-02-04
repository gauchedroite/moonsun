
export interface IPayload {
    source: string;
    action: IPayloadAction;
}

export interface IPayloadAction {
    type: string;
    data?: any;
}

export class PayloadSources {
    static VIEW_ACTION = "VIEW_ACTION";
    static SERVER_ACTION = "SERVER_ACTION";
}

export class ActionTypes {
    static CLICK = "CLICK";
    static CHANGE_CINEMA = "CHANGE_CINEMA";
    static SHOW_ANIM = "SHOW_ANIM";
    static SHOW_DESCRIPTION = "SHOW_DESCRIPTION";
    static HIDE_DESCRIPTION = "HIDE_DESCRIPTION";
    static SHOW_POP = "SHOW_POP";
    static HIDE_POP = "HIDE_POP";
    static SET_HEAD = "SET_HEAD";
    static SHOW_LINE = "SHOW_LINE";
    static HIDE_LINE = "HIDE_LINE";
    static SHOW_QUEST = "SHOW_QUEST";
    static SELECT_QUEST = "SELECT_QUEST";
    static QUEST_ANIM_DONE = "QUEST_ANIM_DONE";
    static SHOW_FEEDBACK = "SHOW_FEEDBACK";
    static HIDE_FEEDBACK = "HIDE_FEEDBACK";
    static SHOW_MENU = "SHOW_MENU";
    static SELECT_MENU = "SELECT_MENU";
    static MENU_ANIM_DONE = "MENU_ANIM_DONE";
}
