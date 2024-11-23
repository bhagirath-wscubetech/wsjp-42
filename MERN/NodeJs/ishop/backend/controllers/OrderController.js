const OrderModel = require("../models/OrderModel");
const CartModel = require("../models/CartModel");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const UserModel = require("../models/UserModel");

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gurvindersingh80957@gmail.com', // Your Gmail account
        pass: 'nmwzeqleageswjwx' // Your password or app-specific password
    },
});


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const OrderController = {

    async adminOrder(req, res) {
        try {
            let filterQuery = {};
            if (req.query.start_price && req.query.end_price) {
                filterQuery['order_total'] = {
                    $gte: req.query.start_price,
                    $lte: req.query.end_price
                }
            }
            if (req.query.user_email) {
                const user = await UserModel.findOne({ email: req.query.user_email });
                if (user) {
                    filterQuery['user_id'] = user._id;
                }
            }
            if (req.query.order_id) {
                filterQuery['_id'] = req.query.order_id;
            }

            if (req.query.postal_code) {
                filterQuery['shipping_details.postalCode'] = req.query.postal_code;
            }

            if (req.query.shipping_contact) {
                filterQuery['shipping_details.contact'] = req.query.shipping_contact;
            }

            if (req.query.order_status) {
                filterQuery['order_status'] = Number(req.query.order_status);
            }

            console.log("filterQuery", filterQuery);
            const orders = await OrderModel.find(filterQuery).populate('user_id', 'name email');
            res.send({
                msg: "Order found: " + orders.length,
                orders,
                status: 1
            })
        } catch (error) {
            console.log(error.message);
            res.send({
                msg: "Server error",
                status: 0
            })
        }
    },

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
                        if (payment_mode == 0) {
                            await CartModel.deleteMany({ user_id: user_id });
                            // COD
                            res.send({
                                msg: "Order placed",
                                status: 1,
                                order_id: order._id
                            })
                        } else {
                            OrderController.initPaymentGateway(
                                res, order._id, order_total, user_id
                            );
                        }
                    }
                ).catch(
                    (err) => {
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

    async initPaymentGateway(res, order_id, order_total) {
        try {
            const options = {
                amount: order_total * 100,  // amount in the smallest currency unit
                currency: "INR",
                receipt: order_id
            };
            razorpayInstance.orders.create(options, async function (err, razorpay_order) {
                if (err) {
                    res.send({
                        msg: "Unable to place order",
                        status: 0
                    })
                } else {
                    await OrderModel.updateOne(
                        { _id: order_id },
                        {
                            razorpay_order_id: razorpay_order.id
                        }
                    )
                    res.send({
                        razorpay_order_id: razorpay_order.id,
                        order_id,
                        msg: "Initiated payment",
                        status: 1
                    });
                }
            });
        } catch (err) {

        }
    },

    async paymentSuccess(req, res) {
        try {
            const { order_id, user_id, razorpay_response } = req.body;

            // Create the data string to hash
            const data = `${razorpay_response.razorpay_order_id}|${razorpay_response.razorpay_payment_id}`;

            // Generate the HMAC-SHA256 signature using the secret key
            const generatedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(data)
                .digest('hex');

            // Compare the generated signature with the Razorpay signature
            if (generatedSignature === razorpay_response.razorpay_signature) {
                await CartModel.deleteMany({ user_id: user_id });
                await OrderModel.updateOne(
                    {
                        _id: order_id
                    },
                    {
                        razorpay_payment_id: razorpay_response.razorpay_payment_id,
                        order_status: 1
                    }
                )

                const info = await emailTransporter.sendMail({
                    from: '"WsCube Tech" <jaipur@wscubetech.com>', // sender address
                    to: "bhagirath@wscubetech.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: `<!DOCTYPE html> 
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #dddddd;
    }
    .header h1 {
      color: #4CAF50;
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      font-size: 24px;
      color: #333333;
    }
    .content p {
      font-size: 16px;
      color: #555555;
      line-height: 1.5;
    }
    .button {
      text-align: center;
      margin: 20px 0;
    }
    .button a {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      padding: 10px 0;
      color: #888888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Thank You for Your Order!</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Order Confirmed</h2>
      <p>Hi Bhagirath</p>
      <p>Thank you for placing your order with us! We are excited to let you know that your order has been successfully placed.</p>
      <p>You will receive another email once your order has been shipped. If you have any questions, feel free to reach out to our customer service team.</p>
      <p>Order Id : ${order_id}</p>
    </div>

    <!-- Button -->
    <div class="button">
      <a href="http://localhost:5000" target="_blank">Go to Website</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`, // html body
                });
                res.json({ status: 1, msg: 'Order placed' });
            } else {
                res.status(400).json({ status: false, msg: 'Payment verification failed' });
            }
        } catch (error) {
            res.json({ status: 0, msg: 'Internal server error' });
        }
    },
    paymentFailed() {

    },
    updateStatus() {

    }
}

module.exports = OrderController;