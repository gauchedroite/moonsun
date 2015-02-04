
import React = require("react/addons");
import TypedReact = require("typed-react");
//
import Store = require("./pop.store");


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

    render() {
        var cx = React.addons.classSet({
            "pop": true,
            "my-hide": this.props.store.hide
        });
        return React.createElement("div", { className: cx },
            React.createElement("div", {
                dangerouslySetInnerHTML: { __html: this.props.store.text }
            })
            );
    }

    private _onChange() {
        this.forceUpdate();
    }
}


var description = TypedReact.createClass(Spec);
export = description;
