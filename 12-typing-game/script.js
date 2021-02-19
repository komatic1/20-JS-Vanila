const word = document.querySelector('#word'),
    text = document.querySelector('#text'),
    scoreEl = document.querySelector('#score'),
    timeEl = document.querySelector('#time'),
    endgameEl = document.querySelector('#end-game-container'),
    settingsBtn = document.querySelector('#settings-btn'),
    settings = document.querySelector('#settings'),
    settingsForm = document.querySelector('#settings-form'),
    difficultySelect = document.querySelector('#difficulty');

// list of words for game
const words = [
        'sigh',
        'tense',
        'airplane',
        'ball',
        'pies',
        'juice',
        'warlike',
        'bad',
        'north',
        'dependent',
        'steer',
        'silver',
        'highfalutin',
        'superficial',
        'quince',
        'eight',
        'feeble',
        'admit',
        'drag',
        'loving'
    ];
 
// init word
let randomWord;
// init score
let score = 0;
// init time
let time = 10;
// difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
// set difficulty select value
difficultySelect.value = difficulty;
// focus on text on start
text.focus();
// start counting down - start function every 1000 ms
const timeInterval = setInterval(updateTime, 1000);

// return random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// event listener
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    
    if (insertedText === randomWord) {
        updateScore();
        addWordToDOM();
        // clear
        e.target.value = '';

        switch (difficulty) {
            case 'easy':
                time += 5;
                break;
            case 'medium':
                time += 3;
                break;
            case 'hard':
                time += 2;
                break;
            default:
                time += 5;
                break;
        }
        updateTime();
    }
});

// settings button click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
// difficulty
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});