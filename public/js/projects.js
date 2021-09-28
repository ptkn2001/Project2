const elements = document.querySelectorAll('.project-details');

const viewProjectDetailsHandler = async(event) => {
    event.preventDefault();
    const projectId = event.currentTarget.attributes['projectid'].value;

    console.log(projectId);
    document.location.replace(`projectDetails/${projectId}`);
};

Array.from(elements).forEach((element) => {
    element.addEventListener('click', viewProjectDetailsHandler);
});