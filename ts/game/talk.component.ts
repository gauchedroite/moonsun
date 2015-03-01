
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
import game = require("../helpers/GameConstants");
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
    componentDidUpdate() {
        if (this.props.store.hideText) {
            /*
            var talk = <HTMLDivElement>this.getDOMNode();
            var text = talk.firstElementChild;
            var onFadeout = (event) => {
                text.removeEventListener(game.EVT_TRANSITION_END, onFadeout);
                ActionCreators.showMove();
            };
            text.addEventListener(game.EVT_TRANSITION_END, onFadeout);
            */
            setTimeout(() => {
                ActionCreators.showMove();
            }, 150);
        }
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
                className: (this.props.store.hideText ? "my-hide" : ""),
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
