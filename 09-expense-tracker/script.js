const balance = document.querySelector('#balance'),
    money_plus = document.querySelector('#money-plus'),
    money_minus = document.querySelector('#money-minus'),
    list = document.querySelector('#list'),
    form = document.querySelector('#form'),
    title = document.querySelector('#title'),
    amount = document.querySelector('#amount');

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20},
    { id: 2, text: 'Salary', amount: 300},
    { id: 3, text: 'Book', amount: -10},
    { id: 4, text: 'Prize', amount: 50},
    { id: 5, text: 'Laptop', amount: -70}
];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions: []; //dummyTransactions;

// add transaction
function addTransaction(e) {
    e.preventDefault();

    if (title.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: title.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        title.value = '';
        amount.value = '';
    }
}

// generate random id
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// add transactions to DOM list
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    
    const item = document.createElement('li');
    // add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
    ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$ ${total}`;
    money_plus.innerText = `$ ${income}`;
    money_minus.innerText = `$ ${expense}`;
}

// remove transactin by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);