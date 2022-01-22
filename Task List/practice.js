
let tasks = [];

let tasksList = document.getElementById('taskList');


function addNewCheckbox(data) {

    let li = document.createElement('li');
    let liText = document.createTextNode(data.name);
    li.appendChild(liText);

    let checkbox = createCheckbox(tasks.length, data)
    li.appendChild(checkbox);
    addEvent(checkbox);

    let span = createCloseBtn();
    li.appendChild(span);

    tasksList.appendChild(li);

    tasks.push(data);
}

document.getElementById('myForm').addEventListener('submit', function (e){
    e.preventDefault();

    let addNewTaskInput = document.querySelector('#myForm input[name="newTask"]');
    console.log(addNewTaskInput);
    let tempValue = addNewTaskInput.value;
    addNewCheckbox({"name": tempValue, "checked": false});
});

function createCheckbox(key, data) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = data.name;
    checkbox.checked = data.checked;
    checkbox.value = key;

    return checkbox;
}

function createCloseBtn() {

    let span = document.createElement('span');
    let spanText = document.createTextNode('x');
    span.appendChild(spanText);

    span.addEventListener('click', function () {
        let taskIndex = this.previousElementSibling.value;
        this.parentElement.remove();
        tasks.splice(taskIndex, 1);
        sessionStorage['tasksList'] = JSON.stringify(tasks);
    });

    return span;
}

function buildCheckboxes(tasks) {
    for (let key in tasks) {

        let li = document.createElement('li');
        let liText = document.createTextNode(tasks[key].name);
        li.appendChild(liText);

        let checkbox = createCheckbox(key, tasks[key]);
        addEvent(checkbox);

        li.appendChild(checkbox);

        let span = createCloseBtn();
        li.appendChild(span);

        tasksList.appendChild(li);

    }

}

window.onload = function () {
    if (sessionStorage['tasksList'] != null){
        tasks = JSON.parse(sessionStorage['tasksList']);
        buildCheckboxes(tasks);
    }else {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status === 200){
                let data = xhr.responseText;
                tasks = JSON.parse(data);
                buildCheckboxes(tasks);
            }
        }
        xhr.open('GET', './tasks.json');
        xhr.send();
    }
}


function addEvent(inp) {
    inp.addEventListener('change', updateJson);
    console.log(inp)
}

function updateJson(e) {
    let key = e.target.value;
    console.log(tasks[key].name, e.target.checked);
    tasks[key].checked = e.target.checked;

    sessionStorage['tasksList'] = JSON.stringify(tasks);
}