//const notesList = document.getElementById('notesList');
//const btnNewNote = document.getElementById('btnNewNote');
const btnAdd = document.querySelector('.btn-add');
//const noteForm = document.getElementById('noteForm');
//const noteTitleInput = document.getElementById('noteTitle');
//const noteContentInput = document.getElementById('noteContent');
//const noteTagsInput = document.getElementById('noteTags');

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes){
    notes.forEach((noteTxt) => addNote(noteTxt));
}

btnAdd.addEventListener('click', () => addNote());

function addNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note-wrapper");
    note.innerHTML = `<div class="operations">
        <button class="edit"><i class="fas fa-edit"></i>Edit Note</button>
        <button class="delete"><i class="fas fa-trash-alt"></i>Delete Note</button>
      </div>

      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>`;
   
    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const mainEL = note.querySelector(".main");
    const textAreaEL = note.querySelector("textarea");

    textAreaEL.value = text;
    mainEL.innerHTML = text;
    
    deleteBtn.addEventListener("click", () => {
        note.remove();
        updates();
    });

    editBtn.addEventListener("click", () => {
        mainEL.classList.toggle("hidden");
        text.classList.toggle("hidden");
    });

    textAreaEL.addEventListener("input", (e) => {
        const { value } = e.target;
        mainEL.innerHTML = value;
        updates();
    })

    document.body.appendChild(note);
}

/*
fetch('/notes')
    .then(response => response.json())
    .then(data => {
        renderNotes(data);
    })
    .catch(error => console.error('Error getting notes', error));

// Create
btnNewNote.addEventListener('click', () => {
    noteForm.reset(); // Clean
    noteForm.classList.add('active');
});

// Submit
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

// Notes
function renderNotes(notes) {
    notesList.innerHTML = ''; // Limpiar lista de notas
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

// Details
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
*/

function updates() {
    const noteText = document.querySelectorAll("textarea");
    const notes = [];

    noteText.forEach((note) => notes.push(note.value));
    localStorage.setItem("notes", JSON.stringify(notes));
}

/*
// Update or Delete
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

// Delete
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