// Mengambil Elemen DOM
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskCategory = document.getElementById('task-category');
const taskDate = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');
const themeToggle = document.getElementById('theme-toggle');

// Array Penyimpanan Data Tugas
let tasks = JSON.parse(localStorage.getItem('studySyncTasks')) || [];

// Inisialisasi Tampilan Awal
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

// Event Listener Tambah Tugas
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        category: taskCategory.value,
        date: taskDate.value
    };

    tasks.push(newTask);
    saveAndRender();

    // Reset Form
    taskForm.reset();
});

// Fungsi Menampilkan Daftar Tugas ke DOM
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Belum ada tugas. Yuk, tambah tugas pertamamu!</p>';
    } else {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <div class="task-info">
                    <h4>${escapeHTML(task.title)}</h4>
                    <p>📌 ${task.category} | 📅 ${task.date}</p>
                </div>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Hapus</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Update Counter
    taskCounter.textContent = `${tasks.length} Tugas`;
}

// Fungsi Hapus Tugas
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

// Fungsi Simpan ke LocalStorage dan Refresh Tampilan
function saveAndRender() {
    localStorage.setItem('studySyncTasks', JSON.stringify(tasks));
    renderTasks();
}

// Pencegahan XSS sederhanan untuk sanitasi input teks
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Fitur Mode Gelap (Dark Mode)
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Mode Terang';
    } else {
        themeToggle.textContent = '🌙 Mode Gelap';
    }
});
