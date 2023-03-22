// add middlewares here related to projects
const express = require('express');
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
    } else {
        next();
    }
}

module.exports = {
    checkProjectId,
    checkNewProject,
}