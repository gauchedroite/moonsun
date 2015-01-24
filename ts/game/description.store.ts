
import TypedReact = require("typed-react");
import TypedModel = require("../helpers/TypedModel");


interface IDescription {
    text: string;
    hide: boolean;
}

class DescriptionStore extends TypedModel<IDescription> implements IDescription {
    public text: string;
    public hide: boolean;

    public defaults(): IDescription {
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

export = DescriptionStore;
