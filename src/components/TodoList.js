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
          <TodoItem key={item.id} item={item} handleRemoval={this.props.handleRemoval} handleEdit={this.props.handleEdit}/>
        ))}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {complete: false, isEditing: false, text: props.item.text};
    this.handleComplete = this.handleComplete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  }

  render() {
    // This is when you haven't clicked the edit button.
    if(!this.state.isEditing){
      return (
        <li className="list-group-item">
          <p className="todoItem" id={this.props.item.id} data-complete={this.state.complete}>{this.props.item.text}</p>

          <CompleteButton complete={this.state.complete} handleComplete={() => this.handleComplete()} />

          <div className="divider"></div>

        <EditButton complete={this.state.complete} isEditing={this.state.isEditing} onClick={event => this.handleEditing(event)}/>

          <div className="divider"></div>

          <button
            className="btn btn-danger btn-sm"
            onClick={event => {this.props.handleRemoval(event, this.props.item.id)}}>
            remove
          </button>
        </li>
      );
    }else {
      // This is after you click the edit button.
      return (
        <li className="list-group-item">
          <div>
            <form onSubmit={this.handleEditing}>
              <input
                type="text"
                className="todoText"
                id={this.props.item.id}
                data-complete={this.state.complete}
                value={this.props.item.text}
                onChange={(e) => this.handleChange(e, this.props.item.id)}
              />
            </form>
            <div className="divider"></div>
          </div>

          <EditButton complete={this.state.complete} isEditing={this.state.isEditing} onClick={this.handleEditing} />

          <div className="divider"></div>

          <button
            className="btn btn-danger btn-sm"
            onClick={event => {this.props.handleRemoval(event, this.props.item.id)}}>
            remove
          </button>

        </li>
      );
    }
  }

  handleComplete() {
    this.setState(state => ({complete: true}));
  }

  handleEditing(event) {
    if(!this.state.isEditing) {
      this.setState({complete: this.state.complete, isEditing: true, text: this.state.text});
    }else {
      this.setState(state => ({complete: state.complete, isEditing: false, text: state.text}));
    }
  }

  handleChange(e, id) {
    this.setState({complete: this.state.complete, isEditing: this.state.isEditing, text: e.target.value});
    this.props.handleEdit(e, id);
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
    return null;
  }
}

function EditButton(props) {
  if(!props.complete) {
    if(props.isEditing) {
      return (
        <button className="btn btn-info btn-sm" onClick={props.onClick}>save</button>
      );
    }else {
      return (
        <button className="btn btn-info btn-sm" onClick={props.onClick}>edit</button>
      );
    }

  }else {
      return null;
  }

}
