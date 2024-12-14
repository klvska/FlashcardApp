document.addEventListener('DOMContentLoaded', () => {
    const sets = JSON.parse(localStorage.getItem('flashcardSets')) || [];
    const currentSetIndex = localStorage.getItem('currentSetIndex');
    const setTitleElement = document.getElementById('set-title');
    const flashcardsContainer = document.getElementById('flashcards-container');
    const bigFlashcard = document.getElementById('big-flashcard');
    const bigFlashcardIndex = document.getElementById('big-flashcard-index');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');


    if (currentSetIndex !== null && sets[currentSetIndex]) {
        const set = sets[currentSetIndex];
        setTitleElement.textContent = set.name;

        if (set.cards.length > 0) {
        set.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('flashcard');
            cardElement.innerHTML = `
                <p><strong>Front:</strong> ${card.front}</p>
                <p><strong>Back:</strong> ${card.back}</p>
            `;
            flashcardsContainer.appendChild(cardElement);
        });


            bigFlashcard.innerHTML = `
            <div id="big-flashcard-inner">
                <div id="big-flashcard-front">${set.cards[0].front}</div>
                <div id="big-flashcard-back">${set.cards[0].back}</div>
            </div>
        `;

        bigFlashcardIndex.textContent = `1 / ${set.cards.length}`;

        bigFlashcard.addEventListener('click', () => {
            bigFlashcard.classList.toggle('flipped');
        });

            let currentCardIndex = 0;

            prevButton.addEventListener('click', () => {
                if (currentCardIndex > 0) {
                    currentCardIndex--;
                } else {
                    currentCardIndex = set.cards.length - 1;
                }
                bigFlashcard.querySelector('#big-flashcard-front').textContent = set.cards[currentCardIndex].front;
                bigFlashcard.querySelector('#big-flashcard-back').textContent = set.cards[currentCardIndex].back;
                bigFlashcardIndex.textContent = `${currentCardIndex + 1} / ${set.cards.length}`;
            });

            nextButton.addEventListener('click', () => {
                if (currentCardIndex < set.cards.length - 1) {
                    currentCardIndex++;
                } else {
                    currentCardIndex = 0;
                }
                bigFlashcard.querySelector('#big-flashcard-front').textContent = set.cards[currentCardIndex].front;
                bigFlashcard.querySelector('#big-flashcard-back').textContent = set.cards[currentCardIndex].back;
                bigFlashcardIndex.textContent = `${currentCardIndex + 1} / ${set.cards.length}`;
            });


        } else {
            bigFlashcard.innerHTML = '<p>No flashcards in this set yet</p>';
            prevButton.classList.add('hide');
            nextButton.classList.add('hide');
        }
    } else {
        setTitleElement.textContent = 'Set not found';

    }
});