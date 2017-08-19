var React = require('react');
var $ = jQuery = require('jquery');
var Task = require('./task.jsx');
var Form = require('./form.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      data: []
    }
  },

  // Function to get task.
  get: function () {
    $.ajax({
      context: this,
      url: '/todos',
      dataType: 'JSON',
      success: function (data) {
        this.setState({data: data})
      }
    });
  },

  // Function to add a new task.
  add: function (todo) {
    var todos = this.state.data;
    todos.push(todo)
    this.setState({data: todos}, function () {
      $.ajax({
        context: this,
        url: '/todos',
        dataType: 'JSON',
        type: 'POST',
        data: todo,
        success: function () {
          this.setState({data: todos});
        }
      });
    });
  },

  // Function to update a task.
  change: function (todo) {
    var todos = this.state.data;
    var index = todos.map((item) => {
      return item._id
    }).indexOf(todo._id);
    todos[index] = todo;

    $.ajax({
      context: this,
      url: '/todos/' + todo._id,
      type: 'PATCH',
      dateType: 'JSON',
      data: {done: todo.done},
      success: function () {
        this.setState({data: todos});
      }
    });
  },
  
   // Function to remove a task.
  remove: function (todo) {
    var todos = this.state.data;
    var index = todos.map((item) => {
      return item._id
    }).indexOf(todo._id);
    todos[index] = todo;

    $.ajax({
      context: this,
      url: '/todos/' + todo._id,
      type: 'DELETE',
      success: function () {
        this.state.data.splice(index, 1);
        this.setState({data: this.state.data});
      }
    });
  },

  // Function on toggle all.
  toggleAll: function () {
    var toggleSate = $('#toggle-all').is(":checked");
    this.state.data.map((obj) => {
        toggleSate ? obj.done = true : obj.done = false;
        this.change(obj);
    });
    this.setState({data: this.state.data});
  },

   // Function to clear items completed
  clearCompleted: function () {
    this.state.data.map((obj, index) => { 
        if(obj.done){
          delete this.state.data[index];
        }
    });
    this.setState({data: this.state.data});
  },

  componentDidMount: function () {
    this.get();
  },

  render: function () {
    return (
      <div id="todoapp">
        <Form onSubmit={this.add} onToggleAll={this.toggleAll} />

        <section id="main"></section>
          <input id="toggle-all" type="checkbox" ref="_check" value={this.state.checkboxValue} onChange={this.toggleAll} />
          <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">

          {this.state.data.map((todo, i) => {
            var boundToggle = this.change;
            var removeItem = this.remove;
            return (
              <Task
                key={todo._id}
                id={todo._id}
                task={todo.task}
                done={todo.done}
                onToggle={boundToggle}
                onRemove={removeItem}
               />
            );
          }, this)}
        </ul>

        <div>
          {(function(items) {
            if (items.length > 0) {
              var itemsDone = [];              
              items.map((obj) => { if(obj.done) {itemsDone.push(obj);} });
              return (
                <footer>
                  <a id="clear-completed" onClick={this.clearCompleted}>{itemsDone.length} completed item(s)</a>
                  <div><b>{items.length}</b> item left</div>
                </footer>
              );
            }
          })(this.state.data)}
        </div>
      </div>
    );
  }
});
