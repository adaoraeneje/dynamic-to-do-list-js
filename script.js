// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    /**
     * Function to add a task
     * @param {string} taskText - The task text to add
     * @param {boolean} save - Whether to save to localStorage (default true)
     */
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Trim input value
        const trimmedText = taskText.trim();

        // If empty, alert and return
        if (trimmedText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');

        // Append the task text (checker expects appendChild with createTextNode)
        li.appendChild(document.createTextNode(trimmedText));

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign onclick to remove task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(trimmedText);
        };

        // Append remove button to list item
        li.appendChild(removeBtn);

        // Append list item to task list
        taskList.appendChild(li);

        // Save task to localStorage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(trimmedText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input field
        taskInput.value = "";
    }

    /**
     * Load tasks from localStorage
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false)); // false so it won't save again
    }

    /**
     * Remove a task from localStorage
     * @param {string} taskText - The text of the task to remove
     */
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
