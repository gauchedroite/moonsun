
import React = require("react/addons");
import TypedReact = require("typed-react");
import DescriptionStore = require("./description.store");


interface IDescriptionProps {
    store: DescriptionStore
};

class DescriptionSpec extends TypedReact.Component<IDescriptionProps, any> {
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
            "description": true,
            "my-hide": this.props.store.hide
        });
        return React.createElement("div", { className: cx },
            React.createElement("div", { className: "description-text-default" }, this.props.store.text)
            );
    }

    //
    // Private methods
    //
    private _onChange() {
        this.forceUpdate();
    }
}


var description = TypedReact.createClass(DescriptionSpec);
export = description;
