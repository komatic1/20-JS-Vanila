const totalH = document.querySelector('#total-h'),
    totalM = document.querySelector('#total-m'),
    totalS = document.querySelector('#total-s'),
    addBtn = document.querySelector('#add-task'),
    modal = document.querySelector('#modal'),
    createBtn = document.querySelector('#create'),
    closeBtn = document.querySelector('#close')
    taskText = document.querySelector('#description')
    list = document.querySelector('#list');

let tasks = []; 
let totalSeconds = localStorage.getItem('totalSeconds') ?? 0;
let currentSeconds = 0;
let counter = 0;

// init
function initList() {
    const saved = JSON.parse(localStorage.getItem('tasks'));
    tasks = [...saved];
    updateDOM(tasks);
}

// init
initList();

// udpate DOM
function updateDOM(elements) {
    list.innerHTML = '';
    elements.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(`element_${index}`);
        li.innerHTML = `${task.text}
        <i class="far fa-times-circle" onclick="removeTask(${index});"></i>
        <i class="far fa-play-circle control" onclick="countTime(${index});">
        <span class="seconds">${task.seconds}</span>
            <span class="h">${task.h}</span>
            <span class="m">${task.m}</span>
            <span class="s">${task.s}</span>
        </i>
        `;

        list.appendChild(li);
    });    
}

// remove task
function removeTask(index) {
   tasks.splice(index, 1);
   localStorage.setItem('tasks', JSON.stringify(tasks));
   updateDOM(tasks);
}

// add task DOM
function addNewTask() {
    if (taskText.value.trim() === '') {
        alert('Task can not be an empty!');
    }

    tasks.push({"text": taskText.value, "h": "00", "m": "00", "s": "00", "seconds": "0"});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskText.value = '';
    updateDOM(tasks);
    modal.classList.remove('show');
}

// count time
function countTime(index) {
    let h = document.querySelector('li.element_' + index + ' span.h');
    let m = document.querySelector('li.element_' + index + ' span.m');
    let s = document.querySelector('li.element_' + index + ' span.s');
    let seconds = document.querySelector('li.element_' + index + ' span.seconds');
    const icon = document.querySelector('li.element_' + index + ' i.control');
    // init currentSeconds
    currentSeconds = +seconds.innerHTML;

    if (icon.classList.contains('fa-play-circle')) {
        // count
        icon.classList.remove('fa-play-circle');
        icon.classList.add('fa-pause-circle');
        
        counter = setInterval(() => {
            ++totalSeconds;
            ++currentSeconds;

            let mm = parseInt(currentSeconds / 60);
            mm = mm > 60 ? mm - 60 : mm;
            s.innerHTML = pad(parseInt(currentSeconds % 60));
            m.innerHTML = pad(mm);
            h.innerHTML = pad(parseInt(currentSeconds / 3600));
            seconds.innerHTML = currentSeconds;

            tasks[index].s = pad(parseInt(currentSeconds % 60));
            tasks[index].m = pad(mm);
            tasks[index].h = pad(parseInt(currentSeconds / 3600));
            tasks[index].seconds = currentSeconds;

            // total day time
            let tm = parseInt(totalSeconds / 60);
            tm = tm > 60 ? tm - 60 : tm;
            totalS.innerHTML = pad(totalSeconds % 60);
            totalM.innerHTML = pad(tm);
            totalH.innerHTML = pad(parseInt(totalSeconds / 3600));
        }, 1000);
    } else {
        // stop
        icon.classList.remove('fa-pause-circle');
        icon.classList.add('fa-play-circle');
        clearInterval(counter);
        currentSeconds = 0;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('totalSeconds', totalSeconds);
    }
    
}

// check 1 or 2 symbols 
function pad(val) {
    let str = val + "";
    if (str.length < 2) {
        return "0" + str;
    } else {
        return str;
    }
}

// events
addBtn.addEventListener('click', () => modal.classList.add('show'));
closeBtn.addEventListener('click', () => modal.classList.remove('show'));

createBtn.addEventListener('click', addNewTask);
