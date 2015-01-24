"use strict";

interface IWhenDone<T> {
    when(fun: () => boolean): IWhenDone<T>;
    done(fun: () => void): T;
}


export = IWhenDone;
