const draggable_list = document.querySelector('#draggable-list'),
    checkBtn = document.querySelector('#check');

const richetsPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];
// store the listitems
const listItems = [];
// 
let dragStartIndex;

createList();

// insert listitems into DOM
function createList() {
    [...richetsPeople]
    .map(a => ({ value: a, sort: Math.random() })) // random sort and return new array
    .sort((a, b) => a.sort - b.sort) // sort by Math.random() value from upper line
    .map(a => a.value) // each object has property VALUE
    .forEach((person, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').dataset.index;
}
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}
function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.dataset.index;
    // swap
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}
function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}
function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    // it will give us whole DOM elements <div class="draggable" draggable="true">...</div>
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim();
        if (personName !== richetsPeople[index]) {
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItem  = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItem.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

checkBtn.addEventListener('click', checkOder);