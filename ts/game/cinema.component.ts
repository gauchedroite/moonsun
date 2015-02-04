
import React = require("react/addons");
import TypedReact = require("typed-react");
//
import CinemaStore = require("./cinema.store");


//
// Component props shape
//
interface IProps {
    store: CinemaStore
};

//
// Component state shape
//
interface IState {
    hideCinema?: boolean;
    hideWait?: boolean;
    url?: string;
};

class Spec extends TypedReact.Component<IProps, IState> {
    //
    // Component state
    //
    getInitialState(): IState {
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
        this.props.store.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        this.props.store.removeAllListeners();
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

    private _onChange() {
        this.setState({
            hideCinema: true,
            hideWait: false
        });
        //FIXME: should wait for the animation to complete instead of a fixed 250ms
        setTimeout(() => { this.setState({ url: this.props.store.url }) }, 250);
    }
}


var component = TypedReact.createClass(Spec);
export = component;
