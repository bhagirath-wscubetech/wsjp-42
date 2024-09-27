const OrderModel = require("../models/OrderModel");
const CartModel = require("../models/CartModel");
const { model } = require("mongoose");

const OrderController = {
    async placeOrder(req, res) {
        try {
            const { user_id, order_total, address, payment_mode } = req.body;
            const cartData = await CartModel.find({ user_id: user_id }).populate(
                'product_id', '_id final_price'
            );
            const product_details = cartData.map(
                (cd) => {
                    return {
                        product_id: cd.product_id._id,
                        quantity: cd.quantity,
                        price: cd.product_id.final_price,
                        total: (cd.product_id.final_price * cd.quantity),
                    }
                }
            )
            const order = new OrderModel({
                user_id: user_id,
                product_details: product_details,
                shipping_details: address,
                payment_mode: payment_mode,
                order_total: order_total
            })
            order.save()
                .then(
                    async () => {
                        await CartModel.deleteMany({ user_id: user_id });

                        if (payment_mode == 0) {
                            // COD
                            res.send({
                                msg: "Order placed",
                                status: 1,
                                order_id: order._id
                            })
                        } else {
                            // OrderController.initPaymentGateway()
                            // PREPAID -> init payment gate code
                        }
                    }
                ).catch(
                    (err) => {
                        console.log(err.message);
                        res.send({
                            msg: "Unable to place order",
                            status: 0
                        })
                    }
                )


        } catch (error) {
            res.send({
                msg: "Internal server errorr",
                status: 0
            })
        }
    },

    initPaymentGateway() {

    },

    paymentSuccess() {

    },
    paymentFailed() {

    },
    updateStatus() {

    }
}

module.exports = OrderController;