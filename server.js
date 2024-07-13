const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Puerto
const PUBLIC = path.join(__dirname, 'public');
const CONFIG = path.join(_dirname, 'config', 'notes.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC));
app.use(express.json());

let notas = []; // Para almacenar en memoria

app.get('/main', (req, res) => {
    console.log('Loading home...\n');
    res.sendFile(path.join(PUBLIC, 'main.html'));
});

app.get('/index', (req, res) => {
    console.log('Loading notes...');
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.post('/notes', (req, res) => {
    console.info('Notes has been called...\n');
});

app.listen(PORT, () => {
    console.info(`Server running at port ${PORT}`);
});
