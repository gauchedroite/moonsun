﻿
import React = require("react/addons");
import TypedReact = require("typed-react");
import CinemaStore = require("./cinema.store");


//
// Component props shape
//
interface ICinemaProps {
    store: CinemaStore
};


interface ITitleState {
    hide?: boolean;
    text?: string;
};

class TitleSpec extends TypedReact.Component<ICinemaProps, ITitleState> {
    getInitialState() {
        return {
            hide: false,
            text: null
        }
    }

    componentDidMount() {
        this.props.store.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        this.props.store.removeAllListeners();
    }

    render() {
        return React.createElement("div", { className: "title" },
            React.createElement("div", { className: (this.state.hide ? "my-hide" : "") }, this.state.text)
            );
    }


    private _onChange() {
        this.setState({
            hide: true
        });
        //FIXME: should wait for the animation to complete instead of a fixed 250ms
        setTimeout(() => { this.setState({ hide: false, text: this.props.store.text }) }, 250);
    }
}


var component = TypedReact.createClass(TitleSpec);
export = component;
