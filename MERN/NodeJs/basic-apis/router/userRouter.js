const express = require('express');
const UserModel = require('../model/userModel');
const UserController = require('../controllers/userController')

const UserRouter = express.Router();

UserRouter.post(
    "/register",
    (req, res) => {
        const result = new UserController().register(req.body);
        result
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)
UserRouter.post(
    "/login",
    async (req, res) => {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            // console.log(user);
            if (user != null) {
                if (user.password == req.body.password) {
                    res.send({
                        msg: "Login successful",
                        user,
                        stauts: 1
                    })
                } else {
                    res.send({
                        msg: "Password doesn't match",
                        stauts: 0
                    })
                }
            } else {
                res.send({
                    msg: "Email does not exists",
                    stauts: 0
                })
            }
        } catch (err) {
            res.send(
                {
                    msg: "Internal server error",
                    status: 0
                }
            )
        }
    }
)
UserRouter.get(
    "/:id?",
    async (req, res) => {
        try {
            const id = req.params.id;
            let users;
            if (id) {
                users = await UserModel.findById(id);
            } else {
                users = await UserModel.find();
            }
            res.send(
                {
                    msg: (Array.isArray(users) ? users.length : 1) + " users found",
                    users,
                    status: 1
                }
            )
        } catch (err) {
            res.send(
                {
                    msg: "Internal server error",
                    status: 0
                }
            )
        }
    }
)
UserRouter.delete(
    "/delete/:id",
    (req, res) => {
        try {
            UserModel.deleteOne({ _id: req.params.id })
                .then(
                    () => {
                        res.send({
                            msg: "User deleted",
                            status: 1
                        })
                    }
                ).catch(
                    () => {
                        res.send({
                            msg: "Unable to delete user",
                            status: 0
                        })
                    }
                )
        } catch (err) {
            res.send({
                msg: "Internal server error",
                status: 0
            })
        }
    }
)
UserRouter.patch(
    "/change-status/:id",
    async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (user) {
                UserModel.updateOne(
                    { _id: id },
                    { status: !user.status }
                ).then(
                    () => {
                        res.send({
                            msg: "Status changed",
                            status: 1
                        })
                    }
                ).catch(
                    () => {
                        res.send({
                            msg: "Unable to change the status",
                            status: 0
                        })
                    }
                )
            } else {
                res.send(
                    {
                        msg: "Unable to find user",
                        status: 0
                    }
                )
            }
        } catch (err) {
            res.send(
                {
                    msg: "Internal server error",
                    status: 0
                }
            )
        }
    }
)
UserRouter.put(
    "/update/:id",
    async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (user) {
                UserModel.updateOne(
                    { _id: id },
                    {
                        ...req.body
                        // "name":"Rajkumar",
                        //  "email":"rajkumar@wscubetech.com" 
                    }
                ).then(
                    () => {
                        res.send({
                            msg: "User data updated",
                            status: 1
                        })
                    }
                ).catch(
                    () => {
                        res.send({
                            msg: "Unable to update user",
                            status: 0
                        })
                    }
                )
            } else {
                res.send(
                    {
                        msg: "Unable to find user",
                        status: 0
                    }
                )
            }
        } catch (err) {
            res.send(
                {
                    msg: "Internal server error",
                    status: 0
                }
            )
        }
    }
)


module.exports = UserRouter;