//selectors

const inputText = document.querySelector('.todo-input');
const inputBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const select = document.querySelector('select') 

//event listener 

document.addEventListener('DOMContentLoaded', saveTodos)
inputBtn.addEventListener('click', todo)
todoList.addEventListener('click', deleteCheck)
select.addEventListener('click', selectOptions)


//functions 

function todo(event) {
    //prevents page reload
    event.preventDefault();

    //create the todo task DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-task-div');

    //create the todo task list
    const todoTask = document.createElement('li');
    todoTask.classList.add('todo-task-list');
    todoTask.innerText = inputText.value;
    todoDiv.appendChild(todoTask);

    //create the check button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn');
    checkBtn.innerHTML = '<i class="fas fa-check"> </i>';
    todoDiv.appendChild(checkBtn);

    //create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    todoDiv.appendChild(deleteBtn);

    //append to the list 
    todoList.appendChild(todoDiv);

    //ADD TO DO TO LOCAL STORAGE
    saveToLocalStorage(inputText.value)

    //clear value 
    inputText.value = "";
};

function deleteCheck(e) {
    const item = e.target;

    // Delete task
    if(item.classList.value === 'delete-btn'){
        const todo = item.parentElement;
        removeTaskFromLocalStorage(todo) 
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove()
        });
    };

    //check task off
    if (item.classList.value === 'check-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

function selectOptions(e) {
    const todos = todoList.childNodes;


    todos.forEach(function(todo){
        switch(e.target.value){
            case "all" :
                todo.style.display = 'flex'
                break;
            case "completed" :
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted" :
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }  
                break;


        }
    })

};

//save the todo to local storage
function saveToLocalStorage(todo){

    let todos;
    //we want to check if there is an existing array of tasks
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//keep/save the task after closing/refreshing the page
function saveTodos() {

    let todos;
    //we want to check if there is an existing array of tasks
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //create the todo task DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-task-div');
    
        //create the todo task list
        const todoTask = document.createElement('li');
        todoTask.classList.add('todo-task-list');
        todoTask.innerText = todo;
        todoDiv.appendChild(todoTask);
    
        //create the check button
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check-btn');
        checkBtn.innerHTML = '<i class="fas fa-check"> </i>';
        todoDiv.appendChild(checkBtn);
    
        //create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-trash"> </i>';
        todoDiv.appendChild(deleteBtn);
    
        //append to the list 
        todoList.appendChild(todoDiv);

    })    
}


//This function will remove the index of the local storage array when you delete a task
function removeTaskFromLocalStorage(todo) {
    let todos;
    //we want to check if there is an existing array of tasks
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}

