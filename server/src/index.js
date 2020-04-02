const Router = require('express').Router;
const InterestController = require('./controllers/interest-controller.js');
const routes = Router();

routes.post('/interest', InterestController.calculateInterest);

module.exports = routes;