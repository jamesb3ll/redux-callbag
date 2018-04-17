import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  state = { text: 'Todo' }
  onAdd = (event) => {
    this.props.dispatch({ 
      type: 'ADD_TODO',
      text: this.state.text,
    })
  }
  onAddAsync = (event) => {
    this.props.dispatch({
      type: 'ASYNC_TODO',
      text: this.state.text,
    })
  }
  fetchTodo = (event) => {
    this.props.dispatch({
      type: 'AJAX_TODO',
    })
  }
  onTextChange = (event) => {
    this.setState({
      text: event.target.value,
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <input onChange={this.onTextChange} value={this.state.text} />
          <button onClick={this.onAdd}>Add</button>
          <button onClick={this.onAddAsync}>Add (async)</button>
          <button onClick={this.fetchTodo}>Fetch Todo</button>
          <ul>
            {this.props.todos.map((todo, i) =>
              <li key={i}>{todo}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(state => ({todos: state}))(App);
