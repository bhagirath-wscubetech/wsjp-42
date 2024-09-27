const { encryptPassword, generateToken, decryptPassword } = require("../helper");
const UserModel = require("../models/UserModel");
const CartModel = require('../models/CartModel');

const UserController = {
    async register(req, res) {
        try {
            const data = req.body;

            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (regex.test(data.password) == false) {
                return res.send({
                    msg: "Password must be of 8+ chars, a lowercase, uppercase, number, and special character."
                })
            }

            if (data.password != data.confirm_password) {
                return res.send({
                    msg: "Password must match"
                })
            }
            if (data.email == "") {
                return res.send({
                    msg: "Email cannot be empty"
                })
            }
            if (data.name == "") {
                return res.send({
                    msg: "Name cannot be empty"
                })
            }
            if (data.passoword == "") {
                return res.send({
                    msg: "Password cannot be empty"
                })
            }
            const userExist = await UserModel.findOne({ email: data.email });

            if (userExist) {
                res.send({
                    msg: "Email already exists",
                    status: 0
                })
            } else {
                const user = new UserModel({
                    name: data.name,
                    email: data.email,
                    password: encryptPassword(data.password)
                })
                user.save()
                    .then(
                        () => {
                            const token = generateToken(user.toJSON());
                            res.send(
                                {
                                    msg: "Account created succesfully",
                                    status: 1,
                                    token,
                                    user: {
                                        ...user.toJSON(),
                                        password: null
                                    }
                                }
                            )

                        }
                    ).catch(
                        (err) => {
                            console.log(err.message);
                            res.send({
                                msg: "Unable to create account 😟",
                                status: 0
                            })
                        }
                    )
            }
        } catch (err) {
            res.send({
                msg: "Internal server error",
                status: 0
            })
        }
    },
    async login(req, res) {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                if (req.body.password == decryptPassword(user.password)) {
                    res.send({
                        msg: "Login successfull",
                        user: {
                            ...user.toJSON(),
                            password: null
                        },
                        token: generateToken(user.toJSON()),
                        status: 1
                    })
                } else {
                    res.send({
                        msg: "Invalid password",
                        status: 0
                    })
                }
            } else {
                res.send({
                    msg: "Invalid email",
                    status: 0
                })
            }
        } catch (err) {

        }
    },
    updateProfile(req, res) {

    },
    async moveToCart(req, res) {
        try {
            const user_id = req.params.user_id;
            const cartData = req.body.cartData ? JSON.parse(req.body.cartData) : null;
            if (cartData != null) {
                const allPromises = cartData.map(
                    async (cd) => {
                        const d = await CartModel.findOne({ user_id: user_id, product_id: cd.product_id });
                        if (d) { //qty update
                            await CartModel.updateOne(
                                {
                                    _id: d._id
                                },
                                {
                                    $inc: {
                                        quantity: Number(cd.quantity)
                                    }
                                }
                            )
                        } else { // insert
                            await new CartModel({
                                user_id,
                                product_id: cd.product_id,
                                quantity: cd.quantity
                            }).save()
                        }
                    }
                )
                await Promise.all(allPromises);
                const latestCart = await CartModel.find({ user_id: user_id }).populate('product_id', '_id original_price final_price');
                res.send({
                    latestCart,
                    status: 1,
                    msg: "Moved to DB Cart"
                })
            } else {
                const latestCart = await CartModel.find({ user_id: user_id }).populate('product_id', '_id original_price final_price');
                res.send({
                    latestCart,
                    status: 1
                })
            }
        } catch (error) {
            res.send({
                msg: "Internal server error",
                status: 0
            })
        }
    },
    async addToCart(req, res) {
        try {
            const cartExists = await CartModel.findOne({ user_id: req.body.user_id, product_id: req.body.product_id });
            if (cartExists) {
                await CartModel.updateOne(
                    {
                        _id: cartExists._id
                    },
                    {
                        $inc: {
                            quantity: 1
                        }
                    }
                )
                res.send({
                    msg: "Cart updated",
                    status: 1
                })
            } else {
                const cart = new CartModel({
                    user_id: req.body.user_id,
                    product_id: req.body.product_id,
                    quantity: 1
                })
                await cart.save();
                res.send({
                    msg: "Added to cart",
                    status: 1
                })
            }
        } catch (error) {
            res.send({
                msg: "Internal server error",
                status: 0
            })
        }
    }

}

module.exports = UserController;