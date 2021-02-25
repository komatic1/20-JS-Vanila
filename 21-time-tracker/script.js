const totalH = document.querySelector('#total-h'),
    totalM = document.querySelector('#total-m'),
    totalS = document.querySelector('#total-s'),
    addBtn = document.querySelector('#add-task'),
    modal = document.querySelector('#modal'),
    createBtn = document.querySelector('#create'),
    closeBtn = document.querySelector('#close')
    taskText = document.querySelector('#description')
    list = document.querySelector('#list'),
    clearBtn = document.querySelector('#clear');

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
    // hide control button for another tasks
    const existEl = document.querySelectorAll('i.control');
    existEl.forEach((el, i) => {
        if (i !== index) {
            el.classList.add('hide');
        }
    });
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
            //mm = mm > 60 ? mm - 60 : mm;
            s.innerHTML = pad(parseInt(currentSeconds % 60));
            m.innerHTML = pad(parseInt(currentSeconds / 60) - parseInt(currentSeconds / 3600) * 60);
            h.innerHTML = pad(parseInt(currentSeconds / 3600));
            seconds.innerHTML = currentSeconds;

            tasks[index].s = pad(parseInt(currentSeconds % 60));
            tasks[index].m = pad(parseInt(currentSeconds / 60) - parseInt(currentSeconds / 3600) * 60);
            tasks[index].h = pad(parseInt(currentSeconds / 3600));
            tasks[index].seconds = currentSeconds;

            totalS.innerHTML = pad(totalSeconds % 60);
            totalM.innerHTML = pad(parseInt(totalSeconds / 60) - parseInt(totalSeconds / 3600) * 60);
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
        // display control button
        existEl.forEach((el, i) => {
            if (i !== index) {
                el.classList.remove('hide');
            }
        });
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

clearBtn.addEventListener('click', () => {
    const activeTask = document.querySelectorAll('.fa-pause-circle');
    
    if (activeTask.length === 0) {
        localStorage.setItem('totalSeconds', 0);
        totalS.innerHTML = "00";
        totalM.innerHTML = "00";
        totalH.innerHTML = "00";
    }
})