import React, { Component } from 'react';
import './AddFolder.css';

export default function AddFolder() {
  return (
    <div className='addFolder'>
      <h1>Add a Folder</h1>
      <form action='' className='newFolder'>
        <h2 className='folderName'>New Folder Name:</h2>
        <input type='text' placeholder='My New Folder' />
        <button type='submit'>Add!</button>
      </form>
    </div>
  );
}
