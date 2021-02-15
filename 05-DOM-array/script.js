const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calcBtn = document.querySelector('#calculate-wealth');

let data = [];

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// double money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2 };
    });

    updateDOM();
}

// sort user by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// filter only millioners
function showMillioners() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// calculate wealth
function calcWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// add new object to array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

getRandomUser();
getRandomUser();
getRandomUser();

// update DOM
function updateDOM(providedData = data) {
    // clear div#main
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    });
}

// format number as money https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$ ' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillBtn.addEventListener('click', showMillioners);
calcBtn.addEventListener('click', calcWealth);