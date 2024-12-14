let sets = JSON.parse(localStorage.getItem('flashcardSets')) || [];
const main = document.querySelector('main');
const flashcardContainer = document.getElementById('sets-container');
const addSetForm = document.getElementById('add-set-container');
const addSetButton = document.getElementById('add-set');
const saveSetButton = document.getElementById('save-set-btn');
const closeSetButton = document.getElementById('close-set-btn');
const addFlashcardForm = document.getElementById('add-flashcard-container');
const saveFlashcardButton = document.getElementById('save-flashcard-btn');
const closeFlashcardButton = document.getElementById('close-flashcard-btn');
let currentSetIndex = null;

addSetButton.addEventListener('click', () => {
    main.classList.add('hide');
    addSetForm.classList.remove('hide');
});

closeSetButton.addEventListener('click', () => {
    main.classList.remove('hide');
    addSetForm.classList.add('hide');
});

closeFlashcardButton.addEventListener('click', () => {
    main.classList.remove('hide');
    addFlashcardForm.classList.add('hide');
});

document.addEventListener('DOMContentLoaded', loadFlashcardSets);

saveSetButton.addEventListener('click', () => {
    if(!document.getElementById('set-title-input').value) {
        alert('Please enter a name for the set');
        return;
    }
    const setTitle = document.getElementById('set-title-input').value;
    const set = {
        name: setTitle,
        cards: []
    };
    sets.push(set);

    localStorage.setItem('flashcardSets', JSON.stringify(sets));

    loadFlashcardSets();

    main.classList.remove('hide');
    addSetForm.classList.add('hide');
});

saveFlashcardButton.addEventListener('click', () => {
    const frontInput = document.getElementById('flashcard-front-input');
    const backInput = document.getElementById('flashcard-back-input');

    if (!frontInput.value || !backInput.value) {
        alert('Please enter both front and back of the flashcard');
        return;
    }

    const flashcard = {
        front: frontInput.value,
        back: backInput.value
    };
    sets[currentSetIndex].cards.push(flashcard);

    localStorage.setItem('flashcardSets', JSON.stringify(sets));

    loadFlashcardSets();

    main.classList.remove('hide');
    addFlashcardForm.classList.add('hide');

    frontInput.value = '';
    backInput.value = '';
});

function loadFlashcardSets() {
    if (sets.length > 0) {
        flashcardContainer.innerHTML = '';
        sets.forEach((set, index) => {
            const setElement = document.createElement('div');
            setElement.classList.add('set');
            setElement.innerHTML = `
                <h3 class="flashcard-link">${set.name}</h3>
                <p>${set.cards.length} Flashcards</p>
                <button onclick="openAddFlashcardForm(${index})">Add Flashcard</button>
            `;
            const flashcardLink = setElement.querySelector('.flashcard-link');
            flashcardLink.addEventListener('click', () => {
                localStorage.setItem('currentSetIndex', index);
                window.location.href = 'pages/set.html';
            });
            flashcardContainer.appendChild(setElement);
        });
    }
}

function openAddFlashcardForm(index) {
    currentSetIndex = index;
    main.classList.add('hide');
    addFlashcardForm.classList.remove('hide');
}