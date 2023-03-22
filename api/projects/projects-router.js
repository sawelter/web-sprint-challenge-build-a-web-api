const express = require('express');
const router = express.Router();

const Projects = require('./projects-model.js');
const mid = require('./projects-middleware.js');



router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
})


router.get('/:id', mid.checkProjectId, (req, res, next) => {
    res.status(200).json(req.project);
})



router.post('/', [mid.checkNewProject, mid.completed], (req, res, next) => {
    const { name, description, completed } = req.body;

    console.log(req.method);

    Projects.insert({name, description, completed})
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
})


router.put('/:id', [mid.checkProjectId, mid.checkNewProject], (req, res, next) => {
    const { name, description, completed } = req.body;
    const { id } = req.params;
    Projects.update(id, {name, description, completed})
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
})

router.delete('/:id', mid.checkProjectId, (req, res, next) => {
    const { id } = req.params;

    Projects.remove(id)
        .then(() => {
            res.status(200);
        })
        .catch(next);
})


router.get('/:id/actions', mid.checkProjectId, (req, res, next) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})


module.exports = router;