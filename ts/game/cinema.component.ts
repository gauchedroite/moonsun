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

//
// Component state shape
//
interface ICinemaState {
    hideCinema?: boolean;
    hideWait?: boolean;
    url?: string;
};

class CinemaSpec extends TypedReact.Component<ICinemaProps, ICinemaState> {
    //
    // Component state
    //
    getInitialState() {
        return {
            hideCinema: true,
            hideWait: true,
            url: null
        }
    }

    //
    // Listen to change events from the store
    //
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
        var cxCinema = React.addons.classSet({
            "cinema": true,
            "my-hide": this.state.hideCinema
        });
        var cxWait = React.addons.classSet({
            "cinema-wait": true,
            "my-hide": this.state.hideWait
        });
        return React.createElement("div", null,
            React.createElement("div", { className: cxCinema },
                React.createElement("img", { width: "960", height: "540", src: this.state.url, onLoad: this._onLoad })
                ),
            React.createElement("div", { className: cxWait },
                React.createElement("div", null, this.props.store.wait)
                )
            );
    }

    //
    // Private methods
    //
    private _onLoad = () => {
        this.setState({
            hideCinema: false,
            hideWait: true
        });
    }

    private _onChange(model, options) {
        this.setState({
            hideCinema: true,
            hideWait: false
        });
        //FIXME: should wait for the animation to complete instead of a fixed 250ms
        setTimeout(() => { this.setState({ url: model.url }) }, 250);
    }
}


var component = TypedReact.createClass(CinemaSpec);
export = component;