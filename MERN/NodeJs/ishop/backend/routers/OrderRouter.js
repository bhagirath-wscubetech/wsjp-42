const express = require('express');
const OrderController = require('../controllers/OrderController');

const OrderRouter = express.Router();


OrderRouter.post(
    "/place-order",
    OrderController.placeOrder
)

OrderRouter.post(
    "/payment-success",
    OrderController.paymentSuccess
)

OrderRouter.get(
    "/admin-order",
    OrderController.adminOrder
)

module.exports = OrderRouter;