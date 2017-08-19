var React = require('react');

module.exports = React.createClass({
  submit: function (e) {
    e.preventDefault();
    var taskInput = React.findDOMNode(this.refs.task);
    var taskValue = taskInput.value.trim();
    if (taskValue !== '') {
      this.props.onSubmit({ task: taskValue });
      taskInput.value = '';
    }
  },
  
  render: function () {
    return (
        <div>
          <h1>Todos</h1>
          <form className="todo-input" id="formAddToDo" onSubmit={this.submit} >
              <input id="inputToDoList" type="text" placeholder="What needs to be done?" ref="task" />
          </form>
        </div>
    );
  }
});
