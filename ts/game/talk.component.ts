
import React = require("react/addons");
import TypedReact = require("typed-react");
//
import Store = require("./talk.store");


interface IProps {
    store: Store
};

class Spec extends TypedReact.Component<IProps, any> {
    componentDidMount() {
        this.props.store.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        this.props.store.removeAllListeners();
    }

    //
    // render
    //
    render() {
        var divStyle = {
            display: (this.props.store.collapse ? "none" : "")
        };
        var cx = React.addons.classSet({
            "talk": true,
            "my-hide": this.props.store.hide
        });
        return React.createElement("div", { className: cx, style: divStyle },
            React.createElement("div", {
                className: (this.props.store.hide ? "my-hide" : ""),
                dangerouslySetInnerHTML: { __html: this.props.store.text }
            })
            );
    }

    //
    // Private methods
    //
    private _onChange() {
        this.forceUpdate();
    }
}


var component = TypedReact.createClass(Spec);
export = component;
