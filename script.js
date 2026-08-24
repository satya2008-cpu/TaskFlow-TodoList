// TaskFlow - To-Do List Application

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const addBtn = document.getElementById('addBtn');
        const taskInput = document.getElementById('taskInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearBtn = document.getElementById('clearBtn');

        addBtn.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach((b) => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        clearBtn.addEventListener('click', () => this.clearCompleted());
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();

        if (!taskText) {
            alert('Please enter a task!');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString(),
        };

        this.tasks.push(task);
        this.saveTasks();
        input.value = '';
        input.focus();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    editTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) return;

        const newText = prompt('Edit task:', task.text);
        if (newText && newText.trim()) {
            task.text = newText.trim();
            this.saveTasks();
            this.render();
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter((t) => t.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter((t) => !t.completed);
            this.saveTasks();
            this.render();
        }
    }

    getFilteredTasks() {
        if (this.currentFilter === 'completed') {
            return this.tasks.filter((t) => t.completed);
        }
        if (this.currentFilter === 'active') {
            return this.tasks.filter((t) => !t.completed);
        }
        return this.tasks;
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter((t) => t.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
    }

    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        taskList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.classList.add('show');
        } else {
            emptyState.classList.remove('show');
            filteredTasks.forEach((task) => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        ${task.completed ? 'checked' : ''} 
                        aria-label="Toggle task completion"
                    >
                    <div class="task-content">
                        <span class="task-text">${this.escapeHtml(task.text)}</span>
                        <span class="task-time">${task.createdAt}</span>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn edit-btn" aria-label="Edit task">Edit</button>
                        <button class="task-btn delete-btn" aria-label="Delete task">Delete</button>
                    </div>
                `;

                const checkbox = li.querySelector('.task-checkbox');
                const editBtn = li.querySelector('.edit-btn');
                const deleteBtn = li.querySelector('.delete-btn');

                checkbox.addEventListener('change', () => this.toggleTask(task.id));
                editBtn.addEventListener('click', () => this.editTask(task.id));
                deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

                taskList.appendChild(li);
            });
        }

        this.updateStats();
        this.updateClearButtonState();
    }

    updateClearButtonState() {
        const clearBtn = document.getElementById('clearBtn');
        const hasCompleted = this.tasks.some((t) => t.completed);
        clearBtn.disabled = !hasCompleted;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});