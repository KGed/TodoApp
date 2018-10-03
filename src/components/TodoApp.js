import React from 'react';
import TodoList from './TodoList';

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add Task
          </button>
          <RemoveAllButton items={this.state.items} removeAll={this.handleRemoveAll}/>
        </form>

        <TodoList items={this.state.items} handleRemoval={this.handleRemoval}/>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  handleRemoval(e, id) {
    e.preventDefault();
    this.setState( state => ({
      items: state.items.filter(ele => ele.id != id),
      text: state.text
    }));
  }

  handleRemoveAll(e) {
    e.preventDefault();
    this.setState( state => ({
      items: [],
      text: state.text
    }));
  }

}

function RemoveAllButton(props) {
  if(props.items.length != 0) {
    return (<button onClick={props.removeAll}>
      Remove All Tasks
    </button>);
  }
  return <div></div>
}
