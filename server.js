const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000; // Port number
const PUBLIC = path.join(__dirname, 'public');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC));
app.use(express.json());

let notes = []; // To store in the app's system memory

app.get('/main', (req, res) => {
    console.log('Loading home...\n');
    res.sendFile(path.join(PUBLIC, 'main.html'));
});

app.get('/index', (req, res) => {
    console.log('Loading notes...');
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

// -- NOTES APP --
app.get('/notes', (req, res) => {
    res.json(notes);
})

app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id); // Note's Id
    const note = note.find(note => note.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).send('Note not found');
    }
})

// -- CRUD --
// Create
app.post('/notes', (req, res) => {
    const {title, content, tags} = req.body;
    const newNote = {
        id: Math.random().toString(36).substring(2, 9), // Random Id
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags || [],
        createdDate: new Date(),
        lastModifiedDate: new Date(),
    };

    if (!newNote.title || !newNote.content) {
        res.status(400).send('Title and contents are required');
        return;
    }

    notes.push(newNote);
    res.json(newNote);
    res.status(201).json(newNote);
});

// Update
app.put('/notas/:id', (req, res) => {
    const {title, content, tags} = req.body;
    const id = parseInt(req.params.id);
    const note = note.find(n => n.id === req.params.id);
    const updatedNote = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      lastModifiedDate: new Date(),
      tags: req.body.tags || [],
    };

    if (note) {
        note.title = title;
        note.content = content;
        note.tags = tags || [];
        note.lastModifiedDate = new Date();
        res.json(note);
    }
  
    if (!updatedNote.title || !updatedNote.content) {
      res.status(400).send('Title and content are required');
      return;
    }
  
    const noteIndex = note.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      note[noteIndex] = updatedNote;
      res.json(updatedNote);
    } else {
      res.status(404).send('Note not found');
    }
  });

// Delete
app.delete('/notas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      notas.splice(noteIndex, 1);
      res.sendStatus(200); // No answer
    } else {
      res.status(404).send('Note not found');
    }

    const index = notes.findIndex(n => n.id === req.params.id);
    if (index !== -1) {
        notas.splice(index, 1);
        res.status(204).send();
      } else {
        res.status(404).send('Note not found');
      }
  });

// Server running
app.listen(PORT, () => {
    console.info(`Server running at port ${PORT}`);
});
