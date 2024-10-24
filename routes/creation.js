const routes = require('express').Router();
const creations = require('../controllers/creation.js');

routes.get('/', creations.findAll);
routes.get('/:creationNumber', creations.findOne);
routes.post('/', creations.create);
routes.put('/:creationNumber', creations.update);
routes.delete('/:creationNumber', creations.delete);

module.exports = routes;