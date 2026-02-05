let input = document.getElementById("inputField");
let list = document.getElementById("todoList");
let editId = null;


function addTodo() {
  if (input.value === "") return;
  
  if (editId) {
    db.ref("todos/" + editId).update({
      text: input.value
    });
    editId = null;
    input.value = "";
    return;
  }

  db.ref("todos").push({
    text: input.value
  });

  input.value = "";
}

db.ref("todos").on("value", function(snapshot) {
  list.innerHTML = "";
  snapshot.forEach(function(childSnapshot) {
    let id = childSnapshot.key;
    let data = childSnapshot.val();

    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = data.text;

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = function () {
      input.value = data.text;
      editId = id;
    };

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.onclick = function () {
      db.ref("todos/" + id).remove();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
});