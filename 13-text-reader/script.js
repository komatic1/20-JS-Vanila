const main = document.querySelector('main'),
    voicesSelect = document.querySelector('#voices'),
    textarea = document.querySelector('#text'),
    readBtn = document.querySelector('#read'),
    toggleBtn = document.querySelector('#toggle'),
    closeBtn = document.querySelector('#close');
const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
      },
      {
        image: './img/food.jpg',
        text: "I'm Hungry"
      },
      {
        image: './img/tired.jpg',
        text: "I'm Tired"
      },
      {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
      },
      {
        image: './img/happy.jpg',
        text: "I'm Happy"
      },
      {
        image: './img/angry.jpg',
        text: "I'm Angry"
      },
      {
        image: './img/sad.jpg',
        text: "I'm Sad"
      },
      {
        image: './img/scared.jpg',
        text: "I'm Scared"
      },
      {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
      },
      {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
      },
      {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
      },
      {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
      }
];

data.forEach(createBox);

// create speech boxes - parameters for function is the same like for callback in the forEach; because it is the same
// like we call just callback but not a separate function (so we can use item, index, array)
function createBox(item) {
    const box = document.createElement('div');
    // desctructuring
    const { image, text } = item;
    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}">
    <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
      setTextMessage(text);
      speakText();

      // add active effect
      box.classList.add('active');
      setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak text 
function speakText() {
  speechSynthesis.speak(message);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

//  store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// toggle text box
toggleBtn.addEventListener('click', () => document.querySelector('#text-box').classList.toggle('show'));

// close text box
closeBtn.addEventListener('click', () => document.querySelector('#text-box').classList.remove('show'));

// change voice
voicesSelect.addEventListener('change', setVoice);

// read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

// init
getVoices();