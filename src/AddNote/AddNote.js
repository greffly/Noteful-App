import React, { Component } from 'react';
import uuid from 'uuid';
import './AddNote.css';

export default class AddNote extends Component {
  state = {
    noteName: '',
    noteContent: ''
  };
  submitForm = e => {
    e.preventDefault();
    this.props.addNote({
      id: uuid(),
      name: this.state.noteName,
      content: this.state.noteContent
    });
  };
  render() {
    return (
      <div className='AddNote'>
        <h1>Add a Note</h1>
        <form action='' className='newNote' onSumbit={this.submitForm}>
          <input
            type='text'
            placeholder='My New Note'
            value={this.state.noteName}
            onChange={e => this.setState({ noteName: e.target.value })}
          />
          <textarea
            type='text'
            placeholder='My New Note'
            value={this.state.noteContent}
            onChange={e => this.setState({ noteContent: e.target.value })}
          />
          <input type='text' placeholder='Which Folder?' />
          <button type='submit'>Add!</button>
        </form>
      </div>
    );
  }
}
