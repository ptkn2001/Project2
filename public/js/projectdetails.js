const addTaskForm = document.querySelector('.new-task-form');
const addTaskButton = document.querySelector('.add-task');
const cancelTaskButton = document.querySelector('.cancel-task');
const newTaskInput = document.querySelector('#new-task-input');
const taskListUl = document.querySelector('.task-list');
const addContributeButton = document.querySelector('.add-contribute');
const contributeInput = document.querySelector('#contribute-input');

const deleteProjectHandler = async(event) => {
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

const insertContributeHandler = async(event) => {
    event.preventDefault();

    const project_id = event.currentTarget.attributes['projectid'].value;
    const amount = contributeInput.value;
    const name = document.querySelector('#user_name').innerText.trim();

    if (project_id && name && amount) {
        const response = await fetch('/api/contributors', {
            method: 'POST',
            body: JSON.stringify({ name, project_id, amount }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert(`Thank you ${name} for your generous donation!`);
            contributeInput.value = '';
            document.location.replace(`/projectDetails/${project_id}`);
        } else {
            alert(response.statusText);
            contributeInput.value = '';
        }
    }
};

const cancelEventEl = document.querySelector('.cancel-event');

if (cancelEventEl) {
    cancelEventEl.addEventListener('click', deleteProjectHandler);
}

const addTaskEl = document.querySelector('.add-new-task');

if (addTaskEl) {
    addTaskEl.addEventListener('click', addTaskHandler);
}

const addContributeEl = document.querySelector('.add-contribute');

if (addContributeEl) {
    addContributeEl.addEventListener('click', insertContributeHandler);
}