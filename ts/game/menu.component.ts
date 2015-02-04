
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
//
import Store = require("./menu.store");

var rce = React.createElement;


/***************************************************************/
class DivSpec extends TypedReact.Component<any, any> {
    render() {
        return rce("div", {
            className: this.props.className,
            onClick: this._onClick,
            onTouchEnd: this._onTouchEnd
        },
            rce("div", { dangerouslySetInnerHTML: { __html: this.props.name } })
        );
    }

    private _onClick(ev: React.MouseEvent) {
        this.props.onClick(this.props.actionKey, this.props.actionIndex, ev.clientX, ev.clientY);
    }
    private _onTouchEnd(ev: React.TouchEvent) {
        if (ev.changedTouches.length > 0) {
            var touch = ev.changedTouches[0];
            this.props.onClick(this.props.actionKey, this.props.actionIndex, touch.clientX, touch.clientY);
        }
    }
}
var liComponent = TypedReact.createClass(DivSpec);



/***************************************************************/
interface IProps {
    store: Store
};

interface IState {
    hideBackground: boolean;
};

class Spec extends TypedReact.Component<IProps, any> {
    getInitialState(): IState {
        return {
            hideBackground: true
        }
    }

    componentDidMount() {
        this.props.store.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        this.props.store.removeAllListeners();
    }

    render() {
        var cx = React.addons.classSet({
            "menu": true,
            "my-hide": this.props.store.hide
        });
        var cx2 = React.addons.classSet({
            "menu-bg": true,
            "my-hide": this.props.store.hide
        });

        var lise = this.props.store.list.map((action, index) => {
            var className = "menu-circle menu-item-" + action.key;
            if (action.selected) className += " selected";
            if (this.props.store.hide && !action.selected) className += " my-hide";

            return rce(liComponent, {
                className: className,
                key: index,
                actionKey: action.key,
                actionIndex: index,
                name: action.name,
                onClick: this._onClick
            });
        });

        return rce("div", { className: cx },
            rce("div", { className: cx2, style: { display: (this.state.hideBackground ? "none" : "") } }),
            rce("div", { className: "menu-items" },
                lise
                )
            );
    }

    private _onChange() {
        if (this.props.store.hide) {
            setTimeout(() => { this.setState({ hideBackground: true }) }, 250);
            this.forceUpdate();
        }
        else {
            this.setState({ hideBackground: false });
        }
    }

    private _onClick(key: string, keyIndex: number, clientX: number, clientY: number) {
        ActionCreators.selectMenu(key, keyIndex);
        ActionCreators.showFeedback(clientX, clientY);
    }
}


var description = TypedReact.createClass(Spec);
export = description;
