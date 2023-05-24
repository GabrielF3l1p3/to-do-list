const inputTask = document.querySelector('.input-task');
const btnSubmit = document.querySelector('.button-submit');
const ul = document.querySelector('.tasks');

const criaLi = () => {
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputTask.value) return;
        creatTask(inputTask.value);
    }
});

const criaBtn = () => {
    const btn = document.createElement('button');
    return btn;
}


function creatTask(textInput) {
    const li = criaLi();
    li.innerHTML = textInput;
    ul.appendChild(li);
    createBtns(li);
    clearInput();
    saveTask();
}

function createBtns(li) {
    li.innerText += ' ';

    const btnCheck = criaBtn();
    btnCheck.innerHTML = '<img src="img/verificar.svg">'
    btnCheck.setAttribute('class', 'checked');
    li.appendChild(btnCheck);
    
    const btnDel = criaBtn();
    btnDel.innerHTML = '<img src="img/cruz.svg">';
    btnDel.setAttribute('class', 'delete');
    li.appendChild(btnDel);
    
    btnCheck.addEventListener('click', function() {
        li.classList.toggle('check');
        saveTask();

    });

    btnDel.addEventListener('click', function() {
        btnDel.parentElement.remove();
        saveTask();
    })
}

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}


btnSubmit.addEventListener('click', function() {
    if(!inputTask.value) return;
    creatTask(inputTask.value);
});

function saveTask() {
    const tasks = ul.querySelectorAll('li');
    const taskList = [];

    for(let task of tasks) {
        let taskText = task.innerText;
        taskText = taskText.trim();
        taskList.push(taskText);
    }


    const taskJSON = JSON.stringify(taskList);
    localStorage.setItem('tasksSave', taskJSON);
}

function addTaskSave() {
    const tasks = localStorage.getItem('tasksSave');
    const taskList = JSON.parse(tasks);
    for(let task of taskList) {
        creatTask(task);
    }
}

addTaskSave()