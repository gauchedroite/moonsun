
import React = require("react/addons");
import TypedReact = require("typed-react");
//
import AppStore = require("./app.store");
import CinemaStore = require("./cinema.store");
import DescriptionStore = require("./description.store");
//
import cinema = require("./cinema.component");
import title = require("./title.component");
import description = require("./description.component");
import clicker = require("./clicker.component");



//
// Component state shape
//
interface IAppState {
    app: AppStore;
    cinema: CinemaStore;
    description: DescriptionStore;
};

var getStateFromStores = (): IAppState => {
    return {
        app: AppStore.getApp(),
        cinema: AppStore.getCinema(),
        description: AppStore.getDescription()
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
            React.createElement("div", { className: "main" },
                React.createElement(title, { store: this.state.cinema })
                ),
            React.createElement(clicker, { store: this.state.app })
            );
    }
}


var component = TypedReact.createClass(AppSpec);
export = component;
