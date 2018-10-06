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
    this.handleEdit = this.handleEdit.bind(this);
  }

  render() {
    return (
    <div>
      <h2 className="h2">TODO:</h2>
      <h5 className="h5">What needs to be done?</h5>
      <div className="todoInputForm">
        <form  onSubmit={this.handleSubmit}>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <div className="divider"></div>
          <button>
            Add Task
          </button>
          <div className="divider"></div>

        </form>
      </div>


      <TodoList items={this.state.items} handleRemoval={this.handleRemoval} handleEdit={this.handleEdit}/>
    
      <div className="removeButton">
        <RemoveAllButton items={this.state.items} removeAll={this.handleRemoveAll}/>
      </div>

    </div>
    );
  }

  handleEdit(e, id) {
    let tasks = this.state.items;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks[i].text = e.target.value;
        break;
      }
    }
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
  if(props.items.length >= 2) {
    return (<button onClick={props.removeAll}>
      Remove All Tasks
    </button>);
  }
  return <div></div>
}
