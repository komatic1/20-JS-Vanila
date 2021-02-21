const cardsContainer = document.querySelector('#cards-container'),
    prevBtn = document.querySelector('#prev'),
    nextBtn = document.querySelector('#next'),
    currentEl = document.querySelector('#current'),
    showBtn = document.querySelector('#show'),
    hideBtn = document.querySelector('#hide'),
    questionEl = document.querySelector('#question'),
    answerEl = document.querySelector('#answer'),
    addCardBtn = document.querySelector('#add-card'),
    clearBtn = document.querySelector('#clear'),
    addContainer = document.querySelector('#add-container');

// keep track of current card
let currentActiveCard = 0;

// store DOM cards
const cardsEl = [];
// store card data
const cardsData = getCardsData();
/*
const cardsData = [
    {
        question: 'What must a variable begin with?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'What is the PHP?',
        answer: 'A programming language'
    },
    {
        question: 'Example of Case Sensitive Variable',
        answer: 'thisIsAVariable'
    }
];*/

// create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// create card in the DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // add to DOM card
    cardsEl.push(card);
    cardsContainer.appendChild(card);

    updateCurrentText();
}

// update text - page number
function updateCurrentText() {
    currentEl.innerText = `${ currentActiveCard + 1}/${cardsEl.length}`;
}

// get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));

    return cards === null ? [] : cards;
}

// add cards to the localStorage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    // reload page to show in DOM
    window.location.reload();
}

createCards();

// event listeners
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    // get new card index
    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});
// previous button
prevBtn.addEventListener('click', () => {
   cardsEl[currentActiveCard].className = 'card right';
    // get new card index
    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText(); 
});
// show button
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// hide button
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = {
            question: question, 
            answer: answer
        };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');
        // save to array
        cardsData.push(newCard);
        // put to the localStorage
        setCardsData(cardsData);
    }
});

// clear cards
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});