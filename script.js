document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Create new list item
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = 'remove-btn';

            // Remove task when button clicked
            removeBtn.onclick = function () {
                taskList.removeChild(li);
            };

            // Append button to li
            li.appendChild(removeBtn);

            // Append li to task list
            taskList.appendChild(li);

            // Clear input
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Button click → add task
    addButton.addEventListener('click', addTask);

    // Enter key → add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
