document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(taskText => addTask(taskText, false));
        // 'false' indicates not to save again to local storage
    }

    function addTask(taskText = taskInput.value.trim(), save = true) {
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', function () {
            taskList.removeChild(listItem);
            removeFromLocalStorage(taskText);

        });
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        taskInput.value = '';

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    function removeFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    document.addEventListener('DOMContentLoaded', () => addTask());
    document.addEventListener('DOMContentLoaded', () => loadTasks());

});

