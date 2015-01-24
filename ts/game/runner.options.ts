"use strict";

import IDescOptions = require("../curious/IDescOptions");

enum DescType {
    NORMAL = 0, ANNOYING = 1
}

enum DescLocation {
    NORMAL = 0, CENTER = 1
}

interface IMyDescOptions extends IDescOptions {
    location?: DescLocation;
    shake?: boolean;
    type?: DescType;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    className?: string;
}

class DescOptions implements IDescOptions {
    location: DescLocation;
    shake: boolean;
    type: DescType;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderWidth: number;
    className: string;
    constructor(options: IMyDescOptions) {
        this.location = options.location;
        this.shake = options.shake;
        this.type = options.type;
        this.backgroundColor = options.backgroundColor;
        this.textColor = options.textColor;
        this.borderColor = options.borderColor;
        this.borderWidth = options.borderWidth;
        this.className = options.className;
    }
}

class DescOpts {
    static get AnnoyingCenter(): DescOptions {
        return new DescOptions({
            type: DescType.ANNOYING,
            location: DescLocation.CENTER,
            backgroundColor: "yellow",
            borderColor: "orange",
            borderWidth: 60,
            textColor: "red",
            className: "description-text-annoying"
        });
    }
    static get Center(): DescOptions {
        return new DescOptions({
            location: DescLocation.CENTER,
            className: "description-text-center"
        });
    }
}


export = DescOpts;
