/// <reference path="typings/tsd.d.ts" />

import React = require("react");
import TypedReact = require("typed-react");
import Backbone = require("backbone");
import Flux = require("flux");



// DISPATCHER stuff.
var ADD_TODO = "ADD_TODO";
var TOGGLE_TODO = "TOGGLE_TODO";
var CLEAR_TODO = "CLEAR_TODO";

interface IPayload {
  actionType: string;
  text?: any;
  todoItem?: TodoItem;
};



// STORE - ITEM MODEL
class TodoItem extends Backbone.Model {
  defaults() {
    return { text: "", complete: false }
  }
  toggle = () => {
    this.save("complete", !this.get("complete"));
  };
};


// STORE - ITEM COLLECTION
class TodoStore extends Backbone.Collection<TodoItem> {
  model = TodoItem;
  url = "/";
  dispatchToken: string;
  initialize(models, options) {
    this.dispatchToken = dispatcher.register((payload: IPayload) => {
      switch (payload.actionType) {
        case ADD_TODO:
          this.create({ text: payload.text });
          break;
        case TOGGLE_TODO:
          payload.todoItem.toggle();
          break;
        case CLEAR_TODO:
          var completed = this.filter(todo => todo.get("complete"));
          completed.forEach(todo => todo.destroy());
          break;
      };
    });
  }
}



// VIEW - TODO FORM
class TodoFormSpec extends TypedReact.Component<any, any> {
  handleAddTodo(event) {
    event.preventDefault();
    var text = this.refs["text"].getDOMNode<HTMLInputElement>();
    if (text.value.length > 0)
      dispatcher.dispatch({ actionType: ADD_TODO, text: text.value });
  }
  handleClearTodos = () => {
    dispatcher.dispatch({ actionType: CLEAR_TODO });
  }
  render() {
    return React.createElement("div", null,
      React.createElement("form", { onSubmit: this.handleAddTodo },
        React.createElement("input", { ref: "text", type: "text", placeholder: "New Todo", autofocus: "true" }),
        React.createElement("input", { type: "submit", value: "Add Todo" })
        ),
      React.createElement("button", { onClick: this.handleClearTodos }, "Clear Completed")
      );
  }
}
var TodoFormComponent = TypedReact.createClass(TodoFormSpec);


// VIEW - TODO LIST
interface ITodoStoreProps { store: TodoStore };
class TodoListSpec extends TypedReact.Component<ITodoStoreProps, any> {
  componentDidMount() {
    this.props.store.on("add remove reset", () => { this.forceUpdate(); }, this);
  }
  componentWillUnmount() {
    this.props.store.off(null, null, this);
  }
  render() {
    var items = this.props.store.map(todoItem =>
      React.createElement("li", { key: todoItem.cid },
        React.createElement(TodoItemComponent, { todoItem: todoItem })
        )
      );
    return React.createElement("ul", null, items);
  }
}
var TodoListComponent = TypedReact.createClass(TodoListSpec);


// VIEW - TODO ITEM
interface ITodoItemProps { todoItem: TodoItem };
class TodoItemSpec extends TypedReact.Component<ITodoItemProps, any> {
  componentDidMount() {
    this.props.todoItem.on("change", () => { this.forceUpdate(); }, this);
  }
  componentWillUnmount() {
    this.props.todoItem.off(null, null, this);
  }
  handleToggleTodo = () => {
    dispatcher.dispatch({ actionType: TOGGLE_TODO, todoItem: this.props.todoItem });
  }
  render() {
    var complete = this.props.todoItem.get('complete');
    var style = { cursor: 'pointer', textDecoration: complete ? 'line-through' : '' };
    return (
      React.createElement("span", { style: style, onClick: this.handleToggleTodo },
        this.props.todoItem.get('text')
        )
      );
  }
}
var TodoItemComponent = TypedReact.createClass(TodoItemSpec);



// APP.
var dispatcher = new Flux.Dispatcher<IPayload>();
var todoStore = new TodoStore(new Array<TodoItem>());

window.onload = function () {
  var app = React.createElement("div", null,
    React.createElement("h3", null, "Todos"),
    React.createElement(TodoFormComponent, null),
    React.createElement(TodoListComponent, { store: todoStore }),
    React.createElement("div", null, "Want a second fully synchronized list?"),
    React.createElement("div", null, "Just declare another list component: no code required, no events to wire up!"),
    React.createElement(TodoListComponent, { store: todoStore })
    );
  //React.render(app, document.body);
};
 