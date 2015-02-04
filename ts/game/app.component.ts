
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
//
import AppStore = require("./app.store");
import CinemaStore = require("./cinema.store");
import DescriptionStore = require("./description.store");
import PopStore = require("./pop.store");
import HeadStore = require("./head.store");
import TalkStore = require("./talk.store");
import QuestStore = require("./quest.store");
import MenuStore = require("./menu.store");
//
import cinema = require("./cinema.component");
import title = require("./title.component");
import description = require("./description.component");
import pop = require("./pop.component");
import detail = require("./detail.component");
import head = require("./head.component");
import talk = require("./talk.component");
import quest = require("./quest.component");
import clicker = require("./clicker.component");
import feedback = require("./feedback.component");
import menu = require("./menu.component");



//
// Component state shape
//
interface IAppState {
    app: AppStore;
    cinema: CinemaStore;
    description: DescriptionStore;
    pop: PopStore;
    head: HeadStore;
    talk: TalkStore;
    quest: QuestStore;
    menu: MenuStore;
};

var getStateFromStores = (): IAppState => {
    return {
        app: AppStore.getApp(),
        cinema: AppStore.getCinema(),
        description: AppStore.getDescription(),
        pop: AppStore.getPop(),
        head: AppStore.getHead(),
        talk: AppStore.getTalk(),
        quest: AppStore.getQuest(),
        menu: AppStore.getMenu()
    };
};

class AppSpec extends TypedReact.Component<any, IAppState> {
    //
    // Component state
    //
    getInitialState(): IAppState {
        return getStateFromStores();
    }

    render() {
        return React.createElement("div", { className: "game layer", tabIndex: "1", style: { zIndex: "1" } },
            React.createElement(cinema, { store: this.state.cinema }),
            React.createElement(description, { store: this.state.description }),
            React.createElement(pop, { store: this.state.pop }),
            React.createElement("div", { className: "main" },
                React.createElement(title, { store: this.state.cinema }),
                React.createElement(detail, { talk: this.state.talk, quest: this.state.quest },
                    React.createElement(head, { store: this.state.head }),
                    React.createElement(talk, { store: this.state.talk }),
                    React.createElement(quest, { store: this.state.quest })
                    )
                ),
            React.createElement(clicker, { store: this.state.app }),
            React.createElement(menu, { store: this.state.menu }),
            React.createElement(feedback, { store: this.state.app }),
            React.createElement("svg", { className: "svg", onClick: this._handleOnMenu, onTouchEnd: this._handleOnMenu },
                React.createElement("g", { transform: "translate(40,0)" },
                    React.createElement("circle", { r: "40", fill: "#23b0ff" }),
                    React.createElement("path", { d: "M-25,-10 A25,25 0 0,0 -25,10", stroke: "white", strokeWidth: "5", fill: "none", transform: "rotate(-45)" })
                    )
                )
            );
    }

    private _handleOnMenu = () => {
        ActionCreators.showMenu();
    }
}


var component = TypedReact.createClass(AppSpec);
export = component;
