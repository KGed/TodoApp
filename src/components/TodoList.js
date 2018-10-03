import React from 'react';


export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let r = React.createRef();
    return (
      <ul className="list-group">
        {this.props.items.map(item => (
          <TodoItem  key={item.id} item={item} handleRemoval={this.props.handleRemoval} />
        ))}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.handleComplete = this.handleComplete.bind(this);
  }

  render() {
    return (
      <li className="list-group-item">
        <p id={this.props.item.id} complete={this.state.complete.toString()}>{this.props.item.text}</p>
        <CompleteButton complete={this.state.complete} handleComplete={this.handleComplete} />
        <button
          className="btn btn-danger btn-sm"
          onClick={event => {this.props.handleRemoval(event, this.props.item.id)}}>
          remove
        </button>
      </li>
    );
  }

  handleComplete(e) {
    e.preventDefault();
    this.setState(state => ({complete: true}));
  }


}

function CompleteButton(props) {
  if(!props.complete) {
    return (
      <button
        className="btn btn-success btn-sm"
        onClick={event => {props.handleComplete(event)}}
        >
        complete
      </button>
    );
  }else {
    return <div></div>;
  }
}
