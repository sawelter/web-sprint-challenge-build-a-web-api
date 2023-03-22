const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const actionsRouter = require('./actions/actions-router.js')
const projectsRouter = require('./projects/projects-router.js')

server.use(express.json());
server.use(actionsRouter);
server.use(projectsRouter);

module.exports = server;
