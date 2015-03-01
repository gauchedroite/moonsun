
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
import game = require("../helpers/GameConstants");
//
import Store = require("./description.store");


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
    componentDidUpdate() {
        if (this.props.store.hide) {
            var desc = <HTMLDivElement>this.getDOMNode();
            var onFadeout = (event) => {
                desc.removeEventListener(game.EVT_TRANSITION_END, onFadeout);
                ActionCreators.showMove();
            };
            desc.addEventListener(game.EVT_TRANSITION_END, onFadeout);
        }
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


var description = TypedReact.createClass(Spec);
export = description;
