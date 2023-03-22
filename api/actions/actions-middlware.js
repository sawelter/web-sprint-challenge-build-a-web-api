// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

async function checkActionId(req, res, next) {
    const { id } = req.params;
    const action = await Actions.get(id);
    if(!action) {
        res.status(404).json(`Action id not found`)
    } else {
        req.action = action;
        next();
    }
}

async function checkNewAction(req, res, next) {
    const { 
        project_id, 
        description,
        notes,
        completed } = req.body;
    if(!project_id || !description || !notes) {
        res.status(400).json(`Missing required field`);
    } 

    let newCompleted = false;
    if(completed) {
        newCompleted = true;
    }

    const newAction = {
        project_id: Number(project_id),
        description: description,
        notes: notes,
        completed: newCompleted
    }
    req.action = newAction;
    next();
}


async function checkProjectId(req, res, next) {
    const { project_id } = req.body;
    const project = await Projects.get(project_id);
    if(!project) {
        res.status(400).json(`project ${project_id} does not exist`)
    } else {
        next();
    }
}


module.exports = {
    checkActionId,
    checkNewAction,
    checkProjectId
}