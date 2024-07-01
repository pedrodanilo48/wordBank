document.getElementById('wordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;
    const example = document.getElementById('example').value;
    
    fetch('/words', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word, definition, example })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        loadWords();
    });
});

function loadWords() {
    fetch('/words')
        .then(response => response.json())
        .then(data => {
            const wordList = document.getElementById('wordList');
            wordList.innerHTML = '';
            data.forEach(wordItem => {
                const li = document.createElement('li');
                li.textContent = `${wordItem.word}: ${wordItem.definition} - ${wordItem.example}`;
                wordList.appendChild(li);
            });
        });
}

loadWords();
