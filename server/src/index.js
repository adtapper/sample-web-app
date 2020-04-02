const Router = require('express').Router;
const PaymentController = require('./controllers/payment-controller.js');
const routes = Router();

routes.post('/payment', PaymentController.calculatePayment);

module.exports = routes;