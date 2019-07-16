import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import dummyStore from '../dummy-store';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
  }

  addFolder = folderName => {
    // update the state's folders array by adding foldername to it.
    this.setState({
      folders: [...this.state.folders, folderName]
    });
  };
  addNote = noteName => {
    // update the state's notes array by adding foldername to it.
    this.setState({
      notes: [...this.state.notes, noteName]
    });
  };

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId', '/add-folder', '/add-note'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
        <Route
          path='/add-folder'
          render={routeProps => (
            <AddFolder addFolder={this.addFolder} {...routeProps} />
          )}
        />
        <Route
          path='/add-note'
          render={routeProps => (
            <AddNote addNote={this.addNote} {...routeProps} />
          )}
        />
      </>
    );
  }

  render() {
    return (
      <div className='App'>
        <nav className='App__nav'>{this.renderNavRoutes()}</nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <main className='App__main'>{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
