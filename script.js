let selectedDate = ''; // Variável global para armazenar a data selecionada

function showTaskSection(month, days) {
    document.querySelector('.calendar-container').style.display = 'none';
    document.getElementById('task-section').style.display = 'block';
    document.getElementById('task-section-title').innerText = `Tarefas de ${month}`;
    
    const daysContainer = document.getElementById('days-container');
    daysContainer.innerHTML = ''; // Limpa os dias anteriores

    // Gera os dias do mês
    for (let i = 1; i <= days; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerText = i;
        dayDiv.onclick = () => selectDay(dayDiv, i, month);
        daysContainer.appendChild(dayDiv);
    }
}

function selectDay(dayElement, day, month) {
    const previousSelectedDay = document.querySelector('.day.selected');
    if (previousSelectedDay) {
        previousSelectedDay.classList.remove('selected');
    }
    dayElement.classList.add('selected');
    
    selectedDate = `${day} de ${month}`;
    document.getElementById('selected-date').innerText = `Data Selecionada: ${selectedDate}`;
}

function goBackToCalendar() {
    document.querySelector('.calendar-container').style.display = 'block';
    document.getElementById('task-section').style.display = 'none';
}

function addTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value.trim();
    const taskDesc = document.getElementById('task-desc').value.trim();

    if (!selectedDate) {
        alert('Por favor, selecione uma data!');
        return;
    }

    if (taskName === '' || taskDesc === '') {
        alert('Por favor, preencha todos os campos da tarefa!');
        return;
    }

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
        <div class="task-header">${taskName}</div>
        <div class="task-desc">${taskDesc}</div>
        <div class="task-footer">Data: ${selectedDate}</div>
        <button class="edit-task-btn" onclick="editTask(this)">Editar</button>
        <button class="delete-task-btn" onclick="deleteTask(this)">Excluir</button>
    `;

    // Evita que a tarefa seja marcada como concluída ao clicar em Editar ou Excluir
    taskDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-task-btn') || e.target.classList.contains('delete-task-btn')) {
            e.stopPropagation();
        } else {
            taskDiv.classList.toggle('done'); // Marca a tarefa como concluída
        }
    });

    document.getElementById('tasks-list').appendChild(taskDiv);

    document.getElementById('task-form').reset();
    document.getElementById('selected-date').innerText = `Data Selecionada: Nenhuma`;
    selectedDate = '';
}

function deleteTask(button) {
    const taskDiv = button.parentElement;
    taskDiv.remove();
}

function editTask(button) {
    const taskDiv = button.parentElement;
    const taskHeader = taskDiv.querySelector('.task-header');
    const taskDesc = taskDiv.querySelector('.task-desc');

    // Substitui o conteúdo atual por inputs para edição
    taskHeader.innerHTML = `<input type="text" value="${taskHeader.textContent}" class="edit-task-name">`;
    taskDesc.innerHTML = `<input type="text" value="${taskDesc.textContent}" class="edit-task-desc">`;

    // Troca o botão de "Editar" por "Salvar"
    button.textContent = "Salvar";
    button.onclick = () => saveTask(taskDiv, button);
}

function saveTask(taskDiv, button) {
    const editedTaskName = taskDiv.querySelector('.edit-task-name').value.trim();
    const editedTaskDesc = taskDiv.querySelector('.edit-task-desc').value.trim();

    // Verifica se os campos de edição estão preenchidos
    if (editedTaskName === '' || editedTaskDesc === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Atualiza o conteúdo da tarefa
    taskDiv.querySelector('.task-header').textContent = editedTaskName;
    taskDiv.querySelector('.task-desc').textContent = editedTaskDesc;

    // Troca o botão de "Salvar" de volta para "Editar"
    button.textContent = "Editar";
    button.onclick = () => editTask(button);
}

function completeAllTasks() {
    const tasks = document.querySelectorAll('#tasks-list .task');
    tasks.forEach(task => task.classList.add('done'));
}
