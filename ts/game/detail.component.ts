
import React = require("react/addons");
import TypedReact = require("typed-react");
import DescriptionStore = require("./description.store");


interface IDetailProps {
    store: DescriptionStore
};

class DetailSpec extends TypedReact.Component<IDetailProps, any> {
    componentDidMount() {
        this.props.store.addChangeListener(this._onChange, this);
    }
    componentWillUnmount() {
        this.props.store.removeAllListeners(this);
    }

    //
    // render
    //
    render() {
        var cx = React.addons.classSet({
            "detail": true,
            "ofTalk": this.props.store.hide
        });
        return React.createElement("div", { className: cx });
    }

    //
    // Private methods
    //
    private _onChange() {
        this.forceUpdate();
    }
}

export = DetailSpec;
