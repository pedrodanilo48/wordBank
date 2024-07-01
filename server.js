const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// In-memory "database"
let wordBank = [];

// Routes
app.get('/words', (req, res) => {
    res.json(wordBank);
});

app.post('/words', (req, res) => {
    const { word, definition, example } = req.body;
    wordBank.push({ word, definition, example });
    res.status(201).json({ message: 'Word added successfully' });
});

// Serve the index.html file as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
