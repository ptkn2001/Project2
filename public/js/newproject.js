const projectDateEl = document.querySelector("#project-date");

const isAmountValid = (amount) => {
    if (!parseInt(amount)) {
        alert('Please Enter Correct Amount. For example: 25 or 100');
        return false;
    } else {
        return true;
    }
}

const addNewProjectHandler = async(event) => {
    event.preventDefault();

    const projectName = document.querySelector('#project-name').value.trim();
    const projectDescription = document.querySelector('#project-description').value.trim();
    const projectDate = document.querySelector('#project-date').value.trim();
    const eventFund = document.querySelector('#project-fund-goal').value.trim();
    const eventType = document.querySelector('#event-type').value.trim();
    const eventLocation = document.querySelector('#project-location').value.trim();

    if (!isAmountValid(eventFund)) return;

    if (projectName && projectDescription && projectDate && eventType) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify({ projectName, projectDescription, projectDate, eventLocation, eventFund, eventType }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/myprojects');
        } else {
            alert(response.statusText);
        }
    } else {
        alert('One or more fields are missing or empty. Please correct and try again.');
        return;
    }
};

projectDateEl.addEventListener('click', () => {
    $("#project-date").datepicker();
    $("#project-date").datepicker("show");
});

document
    .querySelector('.new-project-form')
    .addEventListener('submit', addNewProjectHandler);