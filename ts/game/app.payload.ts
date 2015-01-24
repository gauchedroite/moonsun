
export interface IPayload {
    actionName: string;
    data?: any;
}

export class Action {
    static CLICK = "CLICK";
    static CHANGE_CINEMA = "CHANGE_CINEMA";
    static CINEMA_LOADED = "CINEMA_LOADED";
}

