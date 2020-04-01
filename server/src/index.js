const Router = require('express').Router;
const InterestController = require('./controllers/interest-controller.js');
const routes = Router();

routes.post('/v1/interest', InterestController.calculateInterest);

module.exports = routes;