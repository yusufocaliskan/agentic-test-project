// Simple task management app
document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');
  loadTasks();
});

// Load tasks from JSON file
async function loadTasks() {
  try {
    const response = await fetch('data/tasks.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    renderTasks(data.tasks);
  } catch (error) {
    console.error('Görevler yüklenirken hata oluştu:', error);
    displayError('Görevler yüklenemedi. Lütfen daha sonra tekrar deneyin.');
  }
}

// Render tasks to the DOM
function renderTasks(tasks) {
  const taskList = document.getElementById('task-list');

  if (!tasks || tasks.length === 0) {
    taskList.innerHTML = '<p class="no-tasks">Henüz görev bulunmuyor.</p>';
    return;
  }

  taskList.innerHTML = tasks.map(task => createTaskCard(task)).join('');
}

// Create individual task card HTML
function createTaskCard(task) {
  const statusLabels = {
    'pending': 'Bekliyor',
    'in-progress': 'Devam Ediyor',
    'completed': 'Tamamlandı'
  };

  const priorityLabels = {
    'low': 'Düşük',
    'medium': 'Orta',
    'high': 'Yüksek'
  };

  return `
    <div class="task-card" data-id="${task.id}">
      <div class="task-header">
        <h3>${task.title}</h3>
        <span class="priority priority-${task.priority}">${priorityLabels[task.priority]}</span>
      </div>
      <div class="task-body">
        <p><strong>Sorumlu:</strong> ${task.assignee}</p>
        <span class="status status-${task.status}">${statusLabels[task.status]}</span>
      </div>
    </div>
  `;
}

// Display error message
function displayError(message) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = `<p class="error-message">${message}</p>`;
}
