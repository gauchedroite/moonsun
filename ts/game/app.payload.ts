
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
}
