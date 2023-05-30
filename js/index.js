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

    const div = document.createElement('div');

    li.appendChild(div);

    const btnCheck = criaBtn();
    btnCheck.innerHTML = '<img src="img/verificar.svg">'
    btnCheck.setAttribute('class', 'checked');
    div.appendChild(btnCheck);
    
    const btnDel = criaBtn();
    btnDel.innerHTML = '<img src="img/cruz.svg">';
    btnDel.setAttribute('class', 'delete');
    div.appendChild(btnDel);
    
    btnCheck.addEventListener('click', function() {
        li.classList.toggle('check');
        saveStyle();
        saveTask();
    });

    btnDel.addEventListener('click', function() {
        div.parentElement.remove();
        saveTask();
        saveStyle();
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

function saveStyle() {
    const tasks = ul.querySelectorAll('li');
    const styList = [];

    for(let task of tasks) {
        let sty = task.classList.contains('check');
        styList.push(sty);
    }

    
    const styJSON = JSON.stringify(styList);
    localStorage.setItem('styleSave', styJSON);
}

function addStyleSave() {
    const tasks = ul.querySelectorAll('li');
    const sty = localStorage.getItem('styleSave');
    const styList = JSON.parse(sty);
    const listCheck = [];
    
    for (let i = 0; i < styList.length; i++) {
        if (styList[i] === true) {
          listCheck.push(i);
        }
    }

    for (let checkId of listCheck) {
        let liCheck = tasks[checkId]
        liCheck.classList.add('check');
    }

}


function addTaskSave() {
    const tasks = localStorage.getItem('tasksSave');
    const taskList = JSON.parse(tasks);
    for(let task of taskList) {
        creatTask(task);
    }
}

addTaskSave();
addStyleSave();