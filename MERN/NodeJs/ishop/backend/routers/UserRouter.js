const { Router } = require('express');
const UserController = require('../controllers/UserController');

const UserRouter = Router();

UserRouter.post(
    "/login",
    UserController.login
)

UserRouter.post(
    "/register",
    UserController.register
)

UserRouter.put(
    "/update-profile",
    UserController.updateProfile
)

UserRouter.post(
    "/move-to-cart/:user_id",
    UserController.moveToCart
)

UserRouter.post(
    "/add-to-cart",
    UserController.addToCart
)

module.exports = UserRouter;