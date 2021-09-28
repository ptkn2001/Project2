const elements = document.querySelectorAll('.project-details');

const viewProjectDetailsHandler = async(event) => {
    event.preventDefault();
    const projectId = event.currentTarget.attributes['projectid'].value;

    document.location.replace(`projectDetails/${projectId}`);
};

Array.from(elements).forEach((element) => {
    element.addEventListener('click', viewProjectDetailsHandler);
});