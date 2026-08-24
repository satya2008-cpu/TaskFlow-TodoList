// TaskFlow - Advanced To-Do List Application

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCurrentDate();
        this.render();
        setInterval(() => this.updateCurrentDate(), 1000);
    }

    setupEventListeners() {
        const addBtn = document.getElementById('addBtn');
        const taskInput = document.getElementById('taskInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const navItems = document.querySelectorAll('.nav-item');
        const clearBtn = document.getElementById('clearBtn');

        // Add task listeners
        addBtn.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter button listeners (main content)
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach((b) => b.classList.remove('active'));
                e.target.classList.add('active');
                navItems.forEach((item) => item.classList.remove('active'));
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Navigation items listeners (sidebar)
        navItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navItems.forEach((i) => i.classList.remove('active'));
                item.classList.add('active');
                filterBtns.forEach((btn) => btn.classList.remove('active'));
                const filterValue = item.dataset.filter;
                filterBtns.forEach((btn) => {
                    if (btn.dataset.filter === filterValue) {
                        btn.classList.add('active');
                    }
                });
                this.currentFilter = filterValue;
                this.render();
            });
        });

        // Clear completed listener
        clearBtn.addEventListener('click', () => this.clearCompleted());
    }

    updateCurrentDate() {
        const dateEl = document.getElementById('currentDate');
        if (dateEl) {
            const options = { weekday: 'long', month: 'short', day: 'numeric' };
            const today = new Date().toLocaleDateString('en-US', options).toUpperCase();
            dateEl.textContent = today;
        }
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();

        if (!taskText) {
            this.showNotification('Please enter a task!', 'warning');
            return;
        }

        if (taskText.length > 500) {
            this.showNotification('Task is too long (max 500 characters)', 'warning');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
        };

        this.tasks.push(task);
        this.saveTasks();
        input.value = '';
        input.focus();
        this.showNotification('Task added successfully!', 'success');
        this.render();
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter((task) => task.id !== id);
            this.saveTasks();
            this.showNotification('Task deleted', 'info');
            this.render();
        }
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

        const newText = prompt('Edit your task:', task.text);
        if (newText !== null) {
            const trimmed = newText.trim();
            if (trimmed === '') {
                this.showNotification('Task cannot be empty', 'warning');
                return;
            }
            if (trimmed.length > 500) {
                this.showNotification('Task is too long (max 500 characters)', 'warning');
                return;
            }
            task.text = trimmed;
            this.saveTasks();
            this.showNotification('Task updated successfully!', 'success');
            this.render();
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter((t) => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter((t) => !t.completed);
            this.saveTasks();
            this.showNotification(`Cleared ${completedCount} task(s)`, 'info');
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
                        <button class="task-btn edit-btn" aria-label="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-btn delete-btn" aria-label="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
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

    showNotification(message, type = 'info') {
        // Simple notification - can be enhanced with a toast library
        // For now, using console log as fallback
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        try {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});