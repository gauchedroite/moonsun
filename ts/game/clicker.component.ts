
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
import Store = require("./app.store");


interface IClickerProps { store: Store };

class ClickerSpec extends TypedReact.Component<IClickerProps, any>
{

    componentDidMount() {
        this.props.store.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        this.props.store.removeAllListeners();
    }

    render() {
        var cx = React.addons.classSet({
            "game-events": true,
            "my-hide": this.props.store.hideClicker
        });
        return React.createElement("div", { className: cx, onClick: this._handleOnClick, onTouchEnd: this._handleOnClick});
    }

    private _handleOnClick = () => {
        ActionCreators.clicked();
    }

    private _onChange() {
        this.forceUpdate();
    }
}


var component = TypedReact.createClass(ClickerSpec);
export = component;
