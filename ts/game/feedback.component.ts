
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
import game = require("../helpers/GameConstants");
//
import Store = require("./app.store");


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
        if (this.props.store.showFeedback) {
            var fb = <HTMLDivElement>this.getDOMNode();

            var top = ((this.props.store.feedbackY - game.DISPLAY_TOP) / game.DISPLAY_SCALE) - 10; // 10 = feedback.height/2
            var left = ((this.props.store.feedbackX - game.DISPLAY_LEFT) / game.DISPLAY_SCALE) - 10; // 10 = feedback.width/2

            fb.style.top = top.toString() + "px";
            fb.style.left = left.toString() + "px";

            var onfbFadeout = (event) => {
                fb.removeEventListener(game.EVT_TRANSITION_END, onfbFadeout);
                fb.removeAttribute("style");
                ActionCreators.hideFeedback();
            };
            fb.style[game.TRANSITION] = "opacity 0.4s, " + game.STRANSFORM + " 0.4s";
            fb.style.opacity = "0";
            fb.style[game.TRANSFORM] = "scale(5)";
            fb.addEventListener(game.EVT_TRANSITION_END, onfbFadeout);
        }
    }

    render() {
        var cx = React.addons.classSet({
            "feedback": true,
            "my-hide": !this.props.store.showFeedback
        });
        return React.createElement("div", { className: cx });
    }

    private _onChange() {
        this.forceUpdate();
    }
}


var description = TypedReact.createClass(Spec);
export = description;
