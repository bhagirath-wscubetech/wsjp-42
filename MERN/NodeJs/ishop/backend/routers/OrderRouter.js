const express = require('express');
const OrderController = require('../controllers/OrderController');

const OrderRouter = express.Router();


OrderRouter.post(
    "/place-order",
    OrderController.placeOrder
)


module.exports = OrderRouter;