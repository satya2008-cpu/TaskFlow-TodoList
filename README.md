# TaskFlow - Professional To-Do List Website

## Overview
TaskFlow is a modern, attractive, and professional to-do list web application designed to help you organize your tasks efficiently. Built with vanilla HTML, CSS, and JavaScript, it provides a clean and intuitive user interface with powerful functionality.

## Features

✨ **Core Features:**
- ✅ Add new tasks with timestamps
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✔️ Mark tasks as complete/incomplete
- 📊 Real-time statistics (Total, Completed, Pending)
- 🔍 Filter tasks (All, Active, Completed)
- 🧹 Clear all completed tasks at once
- 💾 Persistent data storage using localStorage
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Professional UI with smooth animations
- ♿ Accessibility-friendly (ARIA labels)

## Design Features

🎯 **Formal & Attractive Design:**
- Professional color scheme with blue and purple gradients
- Clean, modern typography using Segoe UI
- Smooth hover effects and animations
- Responsive grid layout
- Shadow effects for depth
- Organized sections with clear visual hierarchy

## File Structure

```
TaskFlow-TodoList/
├── index.html       # HTML structure
├── styles.css       # Styling and responsive design
├── script.js        # Functionality and logic
└── README.md        # Documentation
```

## Installation

### Method 1: Clone from GitHub
```bash
git clone https://github.com/satya2008-cpu/TaskFlow-TodoList.git
cd TaskFlow-TodoList
```

### Method 2: Download ZIP
1. Click the "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the files to your desired location

## Usage

1. Open `index.html` in your web browser
2. Type a task in the input field
3. Press Enter or click "Add Task" button
4. Manage your tasks:
   - Click checkbox to mark as complete
   - Click "Edit" to modify a task
   - Click "Delete" to remove a task
5. Use filter buttons to view different task lists
6. Click "Clear Completed" to remove all finished tasks

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and Grid/Flexbox
- **JavaScript (ES6+)** - Class-based architecture for clean code
- **LocalStorage API** - Client-side data persistence

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Key JavaScript Features

**TaskManager Class:**
- Handles all task operations (CRUD - Create, Read, Update, Delete)
- Manages UI rendering and updates
- Implements localStorage persistence
- Provides filtering and statistics
- Includes HTML escaping for security

### Main Methods:
- `addTask()` - Add new task
- `deleteTask(id)` - Remove a task
- `toggleTask(id)` - Mark complete/incomplete
- `editTask(id)` - Modify task text
- `clearCompleted()` - Remove all completed tasks
- `render()` - Update UI
- `saveTasks()` - Save to localStorage
- `loadTasks()` - Load from localStorage

## Color Scheme

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Blue | #3498db | Primary actions, stats |
| Dark | #2c3e50 | Text, headers |
| Success Green | #27ae60 | Completed tasks |
| Danger Red | #e74c3c | Delete actions |
| Warning Orange | #f39c12 | Edit actions |
| Light Background | #ecf0f1 | Backgrounds |

## Responsive Breakpoints

- **Desktop:** Full layout with side-by-side elements
- **Tablet:** Optimized grid layout
- **Mobile (< 600px):** Stack layout, optimized touch targets
  - Input field spans full width
  - Single column statistics
  - Full-width action buttons

## Data Persistence

All tasks are automatically saved to the browser's localStorage whenever you:
- Add a new task
- Edit a task
- Delete a task
- Mark a task complete

Data persists across browser sessions until manually cleared through browser settings.

## Security Features

- HTML escaping to prevent XSS attacks
- Input validation
- Safe DOM manipulation

## Keyboard Shortcuts

- **Enter** - Add task (when focused on input field)
- **Tab** - Navigate through elements
- **Space/Enter** - Toggle checkbox or activate buttons

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    /* Change these values */
}
```

### Change Font
Update the font-family in `body` selector:
```css
body {
    font-family: 'Your Font Here', sans-serif;
}
```

### Adjust Layout
Modify max-width in `.container`:
```css
.container {
    max-width: 1000px; /* Change width */
}
```

## Future Enhancement Ideas

- 🌙 Dark mode toggle
- 📅 Due date picker
- 🏷️ Task categories/tags
- ⭐ Priority levels
- 🔔 Notifications
- 📦 Export tasks as JSON/CSV
- ☁️ Cloud synchronization
- 🎨 Customizable themes
- 🔄 Undo/Redo functionality
- 📈 Task statistics and charts

## Performance

- Lightweight (~50KB total)
- No external dependencies
- Fast loading and interaction
- Optimized animations
- Efficient DOM manipulation

## Accessibility

- ARIA labels for screen readers
- Semantic HTML structure
- Keyboard navigation support
- High contrast colors
- Focus indicators on interactive elements

## Browser DevTools Tips

1. Open DevTools (F12 or Ctrl+Shift+I)
2. View localStorage: Application → LocalStorage → Your Domain
3. All tasks are stored under the key: `tasks`

## Troubleshooting

### Tasks not saving?
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check browser console for errors

### Styles not loading?
- Ensure `styles.css` is in the same folder as `index.html`
- Clear browser cache (Ctrl+Shift+Delete)
- Check file names are correct

### JavaScript not working?
- Ensure `script.js` is in the same folder
- Check browser console for errors (F12)
- Make sure JavaScript is enabled

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Author

Created by satya2008-cpu

## Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section

## Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch
- Submit a pull request

## Changelog

### Version 1.0.0 (Initial Release)
- ✅ Complete task management system
- ✅ Professional UI design
- ✅ Responsive layout
- ✅ LocalStorage persistence
- ✅ Filter functionality
- ✅ Statistics dashboard

---

**Made with ❤️ for productivity**

Last Updated: 2026