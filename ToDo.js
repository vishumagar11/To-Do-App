console.log("Hello From Javascript")
window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newTodoForm = document.querySelector("#my-todo-form");
  
    const itemName = localStorage.getItem("itemname") || "";

    nameInput.value = itemName;
    console.log(itemName);
    nameInput.addEventListener("change", (event) => {
      localStorage.setItem("itemname", event.target.value);

    });
  
    newTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(event.target.content.value);
      console.log(event.target.content1.value);
      const todo = {
        content: event.target.content.value,
        content1:event.target.content1.value,
        done: false,
        createdAt: new Date().getTime(),
      };
  
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      event.target.reset();
  
      display();
    });
    display();
  });
  
  function display() {
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const content = document.createElement("div");
      const content1=document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const delButton = document.createElement("button");
  
      input.type = "checkbox";
      input.checkbox = todo.done;
      content.classList.add("content");
      content1.classList.add("content");
      actions.classList.add("actions");
      edit.classList.add("edit");
      delButton.classList.add("delete");
  
      content.innerHTML = `<input type="text" readonly value=${todo.content}>`;
      content1.innerHTML= `<input type="text" readonly value=${todo.content1}>`;
      edit.innerText = "Edit";
      delButton.innerText = "Delete";
      label.appendChild(input);
      actions.appendChild(edit);
      actions.appendChild(delButton);
  
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(content1);
      todoItem.appendChild(actions);
  
      todoList.appendChild(todoItem);
      edit.addEventListener("click", () => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          todo.content = e.target.value;
          // todo.content1=e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          display();
        });
      });
  
      delButton.addEventListener("click", () => {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        display();
      });
    });
  }