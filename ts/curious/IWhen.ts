"use strict";

interface IWhen<T> {
    when(fun: () => boolean): T;
}


export = IWhen;
