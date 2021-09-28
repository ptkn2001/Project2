const addTaskForm = document.querySelector('.new-task-form');
const addTaskButton = document.querySelector('.add-task');
const cancelTaskButton = document.querySelector('.cancel-task');
const newTaskInput = document.querySelector('#new-task-input');
const taskListUl = document.querySelector('.task-list');

const signupFormHandler = async(event) => {
    event.preventDefault();

    const projectId = event.currentTarget.attributes['projectid'].value;

    if (projectId) {
        const requestUrl = `/api/projects/${projectId}`;
        // Send a POST request to the API endpoint
        const response = await fetch(requestUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/myprojects');
        } else {
            alert(response.statusText);
        }
    }
};

const addTaskHandler = async(event) => {
    event.preventDefault();

    addTaskForm.style.display = 'flex';

    addTaskButton.addEventListener('click', insertTaskHandler);

    cancelTaskButton.addEventListener('click', () => {
        addTaskForm.style.display = 'none';
        newTaskInput.value = '';
    });
};

const insertTaskHandler = async(event) => {
    event.preventDefault();

    const project_id = event.currentTarget.attributes['projectid'].value;
    const name = newTaskInput.value;

    if (project_id && name) {

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ name, project_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const liChildEl = document.createElement('li');
            liChildEl.innerHTML = newTaskInput.value;
            taskListUl.appendChild(liChildEl);
        } else {
            alert(response.statusText);
        }
    }

    newTaskInput.value = '';
    addTaskForm.style.display = 'none';
};

document
    .querySelector('.cancel-event')
    .addEventListener('click', signupFormHandler);

document
    .querySelector('.add-new-task')
    .addEventListener('click', addTaskHandler);