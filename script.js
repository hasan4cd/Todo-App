let input = document.getElementById("inputField");
let list = document.getElementById("todoList");
let edit = null;

function addTodo() {
  if (input.value === "") return;

  if (edit) {
    edit.firstChild.textContent = input.value;
    edit = null;
    input.value = "";
    return;
  }

  let li = document.createElement("li");
  let span = document.createElement("span");
  span.textContent = input.value;

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.onclick = () => {
    input.value = span.textContent;
    edit = li;
  };

  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  list.appendChild(li);

  input.value = "";
}  