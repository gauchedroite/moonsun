
import React = require("react/addons");
import TypedReact = require("typed-react");
import TalkStore = require("./talk.store");
import QuestStore = require("./quest.store");


interface IDetailProps {
    talk: TalkStore;
    quest: QuestStore;
    children: any;
};

class Spec extends TypedReact.Component<IDetailProps, any> {
    componentDidMount() {
        this.props.talk.addChangeListener(this._onChange);
        this.props.quest.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        this.props.talk.removeAllListeners();
        this.props.quest.removeAllListeners();
    }

    //
    // render
    //
    render() {
        var cx = React.addons.classSet({
            "detail": true,
            "ofTalk": (this.props.talk.hide == false),
            "ofQuest": (this.props.quest.hide == false)
        });
        return React.createElement("div", { className: cx },
            this.props.children
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
