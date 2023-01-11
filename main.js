//haal onze elementen op
const todoInput = document.getElementById("todoInput");
const todoButton = document.getElementById("todoButton");
const todoList = document.getElementById("todoList");

var todos = [];
var savedTodos = localStorage.getItem("todos");
if(savedTodos){
    todos = JSON.parse(savedTodos);
    showTodos();
}
/*
1. Check of op de knop gedrukt is
2. Lees de input
3. voeg de input toe aan lijst
4. clear input
5. laat de lijst zien
(6. deleteknop)
(7. voeg lijst toe aan localstorage)
*/

todoButton.addEventListener("click", addTodoItem);

function addTodoItem() {
    var id = Math.random();
    var todo = {id: id, text: todoInput.value}

    todos.push(todo);
    todoInput.value = "";
    storeTodos();
    showTodos();
}

function showTodos() {
    todoList.replaceChildren();
    todos.forEach((todo) => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(todo.text));

        var deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        li.appendChild(deleteBtn);
        li.setAttribute("data-id", todo.id)

        todoList.appendChild(li);
        deleteBtn.addEventListener("click", deleteTodo);
        li.addEventListener("click", checkedTodo)
    })
}

function deleteTodo(){
    const target = this.parentElement.getAttribute("data-id");
    todos = todos.filter((todo) => todo.id != target);
    storeTodos();

    this.parentElement.remove();
}

function storeTodos(){
    var jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todos", jsonTodos);

}

function checkedTodo() {
    this.style.textDecoration = "line-through";
}