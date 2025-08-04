document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Function to add a task (exactly as ALX expects)
    function addTask(save = true) {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign onclick to remove task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append remove button to list item
        li.appendChild(removeBtn);

        // Append list item to task list
        taskList.appendChild(li);

        // Save to localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTaskFromStorage(task));
    }

    // Function for loading tasks without re-saving them
    function addTaskFromStorage(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Remove task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Attach event listener to Add Task button
    addButton.addEventListener('click', addTask);

    // Attach event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
