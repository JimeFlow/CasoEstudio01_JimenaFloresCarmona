import ("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js");
// import { v4 as uuidv4 } from 'uuid'; //UUID library to generate uniques IDs

// GUIDED BY A TUTORIAL 
// Guided by a tutorial where there is no commented code
"use strict";

/*
const notesList = document.querySelector('.notes-list');
const searchInput = document.querySelector('.search-input');
const addNoteBtn = document.querySelector('.add-note');
const noteForm = document.getElementById('noteForm');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const noteTagsInput = document.getElementById('noteTags');
const errorContainer = document.querySelector('.error-container');

class Note {
  constructor(id, title, content, tags, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

let notes = JSON.parse(localStorage.getItem('notes')) || [];
*/

const addBtn = document.querySelector('.add-note');

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes){
    notes.forEach((noteTxt) => addNewNote(noteTxt));
}

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note-wrapper");
    note.innerHTML = `<div class="functions">
        <button class="edit-note"><i class="bi bi-pencil-square"></i>Edit Note</button>
        <button class="delete-note"><i class="bi bi-trash-fill"></i>Delete Note</button>
      </div>

      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>`;
   
    const editBtn = note.querySelector(".edit-note");
    const deleteBtn = note.querySelector(".delete-note");
    const mainElement = note.querySelector(".main");
    const textAreaElement = note.querySelector("textarea");

    textAreaElement.value = text;
    mainElement.innerHTML = text;
    
    deleteBtn.addEventListener("click", () => {
        note.remove();
        updates();
    });

    editBtn.addEventListener("click", () => {
        mainElement.classList.toggle("hidden");
        text.classList.toggle("hidden");
    });

    textAreaElement.addEventListener("input", (e) => {
        const { value } = e.target;
        mainElement.innerHTML = value;
        updates();
    })

    document.body.appendChild(note);
}

function updates() {
    const noteText = document.querySelectorAll("textarea");
    const notes = [];

    noteText.forEach((note) => notes.push(note.value));
    localStorage.setItem("notes", JSON.stringify(notes));
}

/*
// *** ---------- *** OLD NOTES CODE (ATTEMPTS) *** ----------- *** //
fetch('/notes')
    .then(response => response.json())
    .then(data => {
        renderNotes(data);
    })
    .catch(error => console.error('Error getting notes', error));

// ---------- CREATE -----------
-- OLD CREATE NOTES
addNoteBtn.addEventListener('click', () => {
    noteForm.reset(); // Clean
    noteForm.classList.add('active');
});

-- NEW CREATE NOTES
function createNote() {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  const tags = noteTagsInput.value.trim().split(',').map(tag => tag.trim());

  if (title && content) {
    const newNote = new Note(
      uuidv4(), // Unique ID generator with UUID
      title,
      content,
      tags,
      new Date().toISOString(),
      new Date().toISOString()
    );

    notes.push(newNote);
    renderNotes();
    saveNotes();
    clearNoteForm();
    showSuccessMessage('Note created successfully');
  } else {
    showErrorMessage('Title and content required to create');
  }
}

// ---------- SUBMIT -----------
-- OLD SUBMIT NOTES
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newNote = {
        title: noteTitleInput.value,
        content: noteContentInput.value,
        tags: noteTagsInput.value.split(',').map(tag => tag.trim()),
    };

    fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
    })
        .then(response => response.json())
        .then(data => {
            renderNotes(data);
            noteForm.classList.remove('active');
            noteTitleInput.value = '';
            noteContentInput.value = '';
            noteTagsInput.value = '';
        })
        .catch(error => console.error('Error creating notes:', error));
});

// ---------- RENDER NOTES FUNCTION -----------
-- OLD RENDER NOTES
function renderNotes(notes) {
    notesList.innerHTML = ''; // Clean notes list
    notes.forEach(note => {
        const noteItem = document.createElement('li');
        noteItem.innerHTML = `
      <h3><span class="math-inline">\{note\.title\}</h3\>
<p\></span>{note.content.substring(0, 50)}...</p>
      <a href="#" data-id="${note.id}">Ver más</a>
    `;
        noteItem.addEventListener('click', () => {
            showNoteDetails(note.id);
        });
        notesList.appendChild(noteItem);
    });
}

-- NEW RENDER NOTES
function renderNotes() {
  notesList.innerHTML = ''; // Clean notes list

  notes.forEach(note => {
    const noteItem = document.createElement('li');
    noteItem.classList.add('note-item');
    noteItem.innerHTML = `
      <h3><span class="math-inline">\{note\.title\}</h3\>
<p class\="note\-content"\></span>{note.content.substring(0, 50)}...</p>
      <div class="note-actions">
        <button class="btn-view" data-id="<span class="math-inline">\{note\.id\}"\>Ver</button\>
<button class\="btn\-edit" data\-id\="</span>{note.id}">Editar</button>
        <button class="btn-delete" data-id="${note.id}">Eliminar</button>
      </div>
    `;

    notesList.appendChild(noteItem);

    // Agregar eventos a los botones de acción
    const viewBtn = noteItem.querySelector('.btn-view');
    const editBtn = noteItem.querySelector('.btn-edit');
    const deleteBtn = noteItem.querySelector('.btn-delete');

    viewBtn.addEventListener('click', () => showNote(note.id));
    editBtn.addEventListener('click', () => editNote(note.id));
    deleteBtn.addEventListener('click', () => deleteNote(note.id));
  });
}

// ---------- SHOW NOTE AND DETAILS -----------
-- NEW SHOW NOTES
function showNote(noteId) {
  const note = notes.find(note => note.id === noteId);

  if (note) {
    noteTitleInput.value = note.title;
    noteContentInput.value = note.content;
    noteTagsInput.value = note.tags.join(', ');

    noteForm.classList.add('edit-mode');
    noteForm.setAttribute('data-id', note.id);

    showNoteForm();
  } else {
    showErrorMessage('Note not found');
  }
}

-- OLD SHOW NOTES DETAILS
function showNoteDetails(id) {
    fetch(`/notes/${id}`)
        .then(response => response.json())
        .then(data => {
            noteTitleInput.value = data.title;
            noteContentInput.value = data.content;
            noteTagsInput.value = data.tags.join(', ');
            noteForm.classList.add('active');
            noteForm.setAttribute('data-id', id);
        })
        .catch(error => console.error('Error getting notes', error));
}

// ---------- UPDATE (AND DELETE) -----------
-- NEW EDIT AND UPDATE NOTES
function editNote(noteId) {
  showNote(noteId);
}

function updateNote() {
  const noteId = noteForm.getAttribute('data-id');
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  const tags = noteTagsInput.value.trim().split(',').map(tag => tag.trim());

  if (title && content) {
    const existingNoteIndex = notes.findIndex(note => note.id === noteId);

    if (existingNoteIndex !== -1) {
      const updatedNote = new Note(
        noteId,
        title,
        content,
        tags,
        notes[existingNoteIndex].createdAt, // Preserve creation date
        new Date().toISOString() // Update modification date
      );

      notes[existingNoteIndex] = updatedNote;
      renderNotes();
      saveNotes();
      clearNoteForm();
      showSuccessMessage('Nota actualizada exitosamente!');

      noteForm.classList.remove('edit-mode');
      noteForm.removeAttribute('data-id');
    } else {
      showErrorMessage('Note not found to be update');
    }
  } else {
    showErrorMessage('Title and content required to update note');
  }
}

-- OLD UPDATE
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = noteForm.getAttribute('data-id');
    const updatedNote = {
        id: id,
        title: noteTitleInput.value,
        content: noteContentInput.value,
        tags: noteTagsInput.value.split(',').map(tag => tag.trim()),
    };

    fetch(`/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedNote)
    })
        .then(response => response.json())
        .then(data => {
            renderNote(data);
            noteForm.classList.remove('active');
            noteForm.removeAttribute('data-id');
            noteTitleInput.value = '';
            noteContentInput.value = '';
            noteTagsInput.value = '';
        })
        .catch(error => console.error('Error updating note', error));
});

// ---------- DELETE -----------
-- NEW DELETE NOTES
function deleteNote(noteId) {
  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1); // Remove note from array
    renderNotes();
    saveNotes();
    showSuccessMessage('Nota eliminada exitosamente!');
  } else {
    showErrorMessage('Nota no encontrada para eliminar.');
  }
}

-- OLD DELETE NOTES
function deleteNote(id) {
    fetch(`/notes/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                notes = notes.filter(note => note.id !== id);
                renderNotes(notes);

            }
        })
}        
*/