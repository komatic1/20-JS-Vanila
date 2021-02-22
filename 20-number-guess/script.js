const msgEl = document.querySelector('#msg');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start
recognition.start();

// capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    
    writeMessage(msg);
    checkNumber(msg);
}

// write message DOM
function writeMessage(message) {
    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${message}</span>
    `;
}

// check number
function checkNumber(message) {
    const num = +message;
    // is valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>'
        //msgEl.innerHTML = '<div>That is not a valid number</div>';
        return;
    }
    // is in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }
    // check
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Congrats! You have guessed the number!!<br><br>
        It was ${num}
        </h2>
        <button class="play-again" id="play-again">Play again</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>Go lower</div>';
    } else {
        msgEl.innerHTML += '<div>Go higher</div>'
    }
}

// generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// speak result
recognition.addEventListener('result', onSpeak);

// play again
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if (e.target.id === 'play-again') {
        window.location.reload();
    }
});