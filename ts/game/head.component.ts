
import React = require("react/addons");
import TypedReact = require("typed-react");
//
import Store = require("./head.store");


interface IProps {
    store: Store
};

interface IState {
    hide: boolean;
    url?: string;
};

var img = new Image();

class Spec extends TypedReact.Component<IProps, IState> {
    getInitialState(): IState {
        return {
            hide: true,
            url: null
        }
    }

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
        var divStyle = {
            backgroundImage: 'url(' + this.props.store.url + ')'
        };
        var cx = React.addons.classSet({
            "head": true,
            "my-hide": this.state.hide
        });
        return React.createElement("div", { className: cx, style: divStyle },
            React.createElement("div", null,
                React.createElement("div", null, this.props.store.talker)
                )
            );
    }

    //
    // Private methods
    //
    private _onChange() {
        if (this.state.url !== this.props.store.url) {
            this.setState({
                hide: true
            });

            img.onload = (ev) => {
                this.setState({
                    hide: false,
                    url: this.props.store.url
                });
            };
            img.src = this.props.store.url;
        }
    }
}


var component = TypedReact.createClass(Spec);
export = component;
