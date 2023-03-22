// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const mid = require('./actions-middlware.js')
const router = express.Router();


router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})


//  [GET] /api/actions/:id
// Returns an action with the given id as the body of the response.
// If there is no action with the given id it responds with a status code 404.
router.get('/:id', mid.checkActionId, (req, res) => {
    res.status(200).json(req.action);
})



//  [POST] /api/actions
// Returns the newly created action as the body of the response.
// If the request body is missing any of the required fields it responds with a status code 400.
// When adding an action make sure the project_id provided belongs to an existing project.
router.post('/', [mid.checkProjectId, mid.checkNewAction], (req, res, next) => {
    Actions.insert(req.action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(next)
})


//  [PUT] /api/actions/:id
// Returns the updated action as the body of the response.
// If there is no action with the given id it responds with a status code 404.
// If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id', [mid.checkActionId, mid.checkNewAction, mid.checkProjectId], (req, res, next) => {
    const { id } = req.params;
})

//  [DELETE] /api/actions/:id
// Returns no response body.
// If there is no action with the given id it responds with a status code 404.
router.delete('/:id', [mid.checkActionId], (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(`Action successfully deleted.`)
        })
        .catch(next);
})

module.exports = router;