var React = require('react');

module.exports = React.createClass({
  toggle: function () {
    var todo = { _id: this.props.id, task: this.props.task, done: !this.props.done }
    this.props.onToggle(todo);
  },

  removeTask: function () {
    var todo = { _id: this.props.id, task: this.props.task, done: !this.props.done }
    this.props.onRemove(todo);
  },

  render: function () {
    return (
      <li>
        <input type="checkbox" onClick={this.toggle} checked={this.props.done}/>
        <label className={this.props.done ? "done" : ""}>{this.props.task}</label>
        <a id="delete-btn" onClick={this.removeTask}>x</a>
      </li>
    );
  }
});