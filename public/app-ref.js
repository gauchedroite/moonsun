var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react");
var TypedReact = require("typed-react");
var Backbone = require("backbone");
var Flux = require("flux");
var ADD_TODO = "ADD_TODO";
var TOGGLE_TODO = "TOGGLE_TODO";
var CLEAR_TODO = "CLEAR_TODO";
;
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        var _this = this;
        _super.apply(this, arguments);
        this.toggle = function () {
            _this.save("complete", !_this.get("complete"));
        };
    }
    TodoItem.prototype.defaults = function () {
        return { text: "", complete: false };
    };
    return TodoItem;
})(Backbone.Model);
;
var TodoStore = (function (_super) {
    __extends(TodoStore, _super);
    function TodoStore() {
        _super.apply(this, arguments);
        this.model = TodoItem;
        this.url = "/";
    }
    TodoStore.prototype.initialize = function (models, options) {
        var _this = this;
        this.dispatchToken = dispatcher.register(function (payload) {
            switch (payload.actionType) {
                case ADD_TODO:
                    _this.create({ text: payload.text });
                    break;
                case TOGGLE_TODO:
                    payload.todoItem.toggle();
                    break;
                case CLEAR_TODO:
                    var completed = _this.filter(function (todo) { return todo.get("complete"); });
                    completed.forEach(function (todo) { return todo.destroy(); });
                    break;
            }
            ;
        });
    };
    return TodoStore;
})(Backbone.Collection);
var TodoFormSpec = (function (_super) {
    __extends(TodoFormSpec, _super);
    function TodoFormSpec() {
        _super.apply(this, arguments);
        this.handleClearTodos = function () {
            dispatcher.dispatch({ actionType: CLEAR_TODO });
        };
    }
    TodoFormSpec.prototype.handleAddTodo = function (event) {
        event.preventDefault();
        var text = this.refs["text"].getDOMNode();
        if (text.value.length > 0)
            dispatcher.dispatch({ actionType: ADD_TODO, text: text.value });
    };
    TodoFormSpec.prototype.render = function () {
        return React.createElement("div", null, React.createElement("form", { onSubmit: this.handleAddTodo }, React.createElement("input", { ref: "text", type: "text", placeholder: "New Todo", autofocus: "true" }), React.createElement("input", { type: "submit", value: "Add Todo" })), React.createElement("button", { onClick: this.handleClearTodos }, "Clear Completed"));
    };
    return TodoFormSpec;
})(TypedReact.Component);
var TodoFormComponent = TypedReact.createClass(TodoFormSpec);
;
var TodoListSpec = (function (_super) {
    __extends(TodoListSpec, _super);
    function TodoListSpec() {
        _super.apply(this, arguments);
    }
    TodoListSpec.prototype.componentDidMount = function () {
        var _this = this;
        this.props.store.on("add remove reset", function () {
            _this.forceUpdate();
        }, this);
    };
    TodoListSpec.prototype.componentWillUnmount = function () {
        this.props.store.off(null, null, this);
    };
    TodoListSpec.prototype.render = function () {
        var items = this.props.store.map(function (todoItem) { return React.createElement("li", { key: todoItem.cid }, React.createElement(TodoItemComponent, { todoItem: todoItem })); });
        return React.createElement("ul", null, items);
    };
    return TodoListSpec;
})(TypedReact.Component);
var TodoListComponent = TypedReact.createClass(TodoListSpec);
;
var TodoItemSpec = (function (_super) {
    __extends(TodoItemSpec, _super);
    function TodoItemSpec() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleToggleTodo = function () {
            dispatcher.dispatch({ actionType: TOGGLE_TODO, todoItem: _this.props.todoItem });
        };
    }
    TodoItemSpec.prototype.componentDidMount = function () {
        var _this = this;
        this.props.todoItem.on("change", function () {
            _this.forceUpdate();
        }, this);
    };
    TodoItemSpec.prototype.componentWillUnmount = function () {
        this.props.todoItem.off(null, null, this);
    };
    TodoItemSpec.prototype.render = function () {
        var complete = this.props.todoItem.get('complete');
        var style = { cursor: 'pointer', textDecoration: complete ? 'line-through' : '' };
        return (React.createElement("span", { style: style, onClick: this.handleToggleTodo }, this.props.todoItem.get('text')));
    };
    return TodoItemSpec;
})(TypedReact.Component);
var TodoItemComponent = TypedReact.createClass(TodoItemSpec);
var dispatcher = new Flux.Dispatcher();
var todoStore = new TodoStore(new Array());
window.onload = function () {
    var app = React.createElement("div", null, React.createElement("h3", null, "Todos"), React.createElement(TodoFormComponent, null), React.createElement(TodoListComponent, { store: todoStore }), React.createElement("div", null, "Want a second fully synchronized list?"), React.createElement("div", null, "Just declare another list component: no code required, no events to wire up!"), React.createElement(TodoListComponent, { store: todoStore }));
};
