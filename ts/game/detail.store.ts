
import TypedReact = require("typed-react");
import TypedModel = require("../helpers/TypedModel");

interface IText {
    text: string;
    hide: boolean;
}

interface IDetail extends IText {
}

class DetailStore extends TypedModel<IDetail> implements IDetail {
    public text: string;
    public hide: boolean;

    public defaults(): IDetail {
        return {
            text: "",
            hide: true
        };
    }

    //
    // Public methods
    //
    addChangeListener = (callback, context?) => {
        this.on("change", (model, options) => { callback(model, options); }, context);
    }
    removeAllListeners = (context?) => {
        this.off(null, null, context);
    }
}

export = DetailStore;
