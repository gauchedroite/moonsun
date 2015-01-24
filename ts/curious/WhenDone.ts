"use strict";

interface WhenDone {
    when?: () => boolean;
    done?: () => void;
}


export = WhenDone;
