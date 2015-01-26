
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
import Store = require("./app.store");


interface IClickerProps { store: Store };

class ClickerSpec extends TypedReact.Component<IClickerProps, any>
{
    render() {
        var cx = React.addons.classSet({
            "game-events": true,
            "my-hide": this.props.store.hideClicker
        });
        return React.createElement("div", { className: cx, onClick: this._handleOnClick });
    }

    private _handleOnClick = () => {
        ActionCreators.clicked();
    }
}


var component = TypedReact.createClass(ClickerSpec);
export = component;
