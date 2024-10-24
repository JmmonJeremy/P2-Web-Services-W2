const routes = require('express').Router();
const profiles = require('../controllers/profile.js');

routes.get('/', profiles.findAll);
routes.get('/:username', profiles.findOne);
routes.post('/', profiles.create);
routes.put('/:username', profiles.update);
routes.delete('/:username', profiles.delete);

module.exports = routes;
