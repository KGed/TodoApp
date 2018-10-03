import React from 'react';


export default class TodoList extends React.Component {

  handleComplete(event, id) {
    event.preventDefault();
    let p = document.getElementById(id);
    if(!p.innerHTML.startsWith('<strike>')){
      p.innerHTML = '<strike>' + p.innerHTML + '</strike>';
      this.setState(this.state);
    }

  }

  render() {
    return (
      <ul className="list-group">
        {this.props.items.map(item => (
          <li className="list-group-item" key={item.id}>
            <p id={item.id}>{item.text}</p>
            <button className="btn btn-success btn-sm" onClick={event => {this.handleComplete(event, item.id)}}>complete</button>
            <button className="btn btn-danger btn-sm" onClick={event => {this.props.handleRemoval(event, item.id)}}>remove</button>
          </li>
        ))}
      </ul>
    );
  }
}
