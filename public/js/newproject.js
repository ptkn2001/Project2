const addNewProjectHandler = async(event) => {
    event.preventDefault();

    const projectName = document.querySelector('#project-name').value.trim();
    const projectDescription = document.querySelector('#project-description').value.trim();
    const projectDate = document.querySelector('#project-date').value.trim();
    const eventType = document.querySelector('#event-type').value.trim();

    if (projectName && projectDescription && projectDate && eventType) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify({ projectName, projectDescription, projectDate, eventType }),
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

document
    .querySelector('.new-project-form')
    .addEventListener('submit', addNewProjectHandler);