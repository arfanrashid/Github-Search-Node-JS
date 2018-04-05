const Router = require('koa-router');

const projectController = require('../controllers/projects');

const api = new Router();

api.prefix('/api');
api.get('/projects/', projectController.all);
api.post('/projects/', projectController.search);


module.exports = api;
