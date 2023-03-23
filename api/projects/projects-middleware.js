// add middlewares here related to projects
const Projects = require('./projects-model.js')


async function checkProjectId(req, res, next) {
    const { id } = req.params;
    const project = await Projects.get(id);
    if(project) {
        req.project = project;
        next();
    } else {
        res.status(404).json(`No projects with the given id`)
    }
}

async function checkNewProject(req, res, next) {
    const { name, description, completed } = req.body;

    if(!name || !description) {
        res.status(400).json(`Missing required text field`);  
    } else if(req.method === "PUT" && (completed === null || completed === undefined)) {
        res.status(400).json(`Completed status missing`);
    } 


    let newCompleted = false;
    if(completed) {
        newCompleted = true;
    }

    const newProject = {
        name: name,
        description: description,
        completed: newCompleted
    }

    req.project = newProject;
    next();
}

async function completed(req, res, next) {
    const { completed } = req.body;
    if(!completed) {
        req.body.completed = false;
    } else {
        req.body.completed = true;
    }
    next();
}

module.exports = {
    checkProjectId,
    checkNewProject,
    completed
}