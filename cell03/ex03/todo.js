    document.addEventListener('DOMContentLoaded', () => {
        const newTodoButton = document.getElementById('newTodoButton');
        const todoList = document.getElementById('ft_list');

    loadTasks();

    newTodoButton.addEventListener('click', () => {
        const task = prompt('Enter a new TO DO:');
        if (task) {
            addTask(task);
            saveTasks();
        }
    });

    function addTask(task) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.textContent = task;
        todoDiv.addEventListener('click', () => {
            if (confirm('Do you want to delete this TO DO?')) {
                todoDiv.remove();
                saveTasks();
            }
        });
        todoList.insertBefore(todoDiv, todoList.firstChild);
    }

    function saveTasks() {
        const todos = Array.from(todoList.children).map(todo => todo.textContent);
        document.cookie = `tasks=${JSON.stringify(todos)};path=/`;
    }

    function loadTasks() {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});

        const tasks = cookies.tasks ? JSON.parse(cookies.tasks) : [];
        tasks.forEach(task => addTask(task));
    }
});