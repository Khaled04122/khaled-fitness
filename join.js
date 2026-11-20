const form = document.getElementById("joinForm");
const table = document.getElementById("requestsTable");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const goalInput = document.getElementById("joinGoal");
const saveButton = form.querySelector('button[type="submit"]');

let requests = JSON.parse(localStorage.getItem("requests") || "[]");
let editIndex = -1;

function resetForm() {
  form.reset();
  editIndex = -1;
  saveButton.textContent = "Add Request";
}

function saveRequests() {
  localStorage.setItem("requests", JSON.stringify(requests));
  displayRequests();
}

function displayRequests() {
  table.textContent = "";

  requests.forEach(function (request, index) {
    const row = table.insertRow();

    row.insertCell().textContent = request.name;
    row.insertCell().textContent = request.email;
    row.insertCell().textContent = request.goal;

    const actions = row.insertCell();

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    editButton.onclick = function () {
      nameInput.value = request.name;
      emailInput.value = request.email;
      goalInput.value = request.goal;

      editIndex = index;
      saveButton.textContent = "Update Request";
    };

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function () {
      requests.splice(index, 1);
      resetForm();
      saveRequests();
    };

    actions.append(editButton, deleteButton);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const request = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    goal: goalInput.value
  };

  if (editIndex === -1) {
    requests.push(request);
  } else {
    requests[editIndex] = request;
  }

  resetForm();
  saveRequests();
});

displayRequests();