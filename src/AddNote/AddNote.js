import React, { Component } from 'react';
import './AddNote.css';

export default function AddNote() {
  return (
    <div className='AddNote'>
      <h1>Add a Note</h1>
      <form action='' className='newFolder'>
        <h2 className='folderName'>New Note Name:</h2>
        <textarea type='text' placeholder='My New Note' />
        <button type='submit'>Add!</button>
      </form>
    </div>
  );
}
