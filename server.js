const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Puerto
const PUBLIC = path.join(__dirname, 'public');
const CONFIG = path.join(_dirname, 'config', 'app.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC));
app.use(express.json());

let notas = []; // Para almacenar en memoria

app.get('/index', (req, res) => {
    console.log('Loading home...\n');
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.get('/notes', (req, res) => {
    console.log('Loading notes...');
    res.sendFile(path.join(PUBLIC, 'notes.html'));
});

app.post('/notes', (req, res) => {
    console.info('Notes has been called...\n');
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;

    console.log('Form data\n');
    console.log('Name: ' + name);
    console.log('Email: ' + email);
    console.log('Subject: ' + subject);

    res.redirect('/');
});

app.listen(PORT, () => {
    console.info(`Server running at port ${PORT}`);
});
