const UserModel = require("../model/userModel");

class UserController {
    register(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (data.name == "" && data.email == "" && data.password == "") {
                        return reject(
                            {
                                msg: "Please fill all the fields",
                                status: 0
                            }
                        )
                    } else {
                        const userCount = await UserModel.countDocuments({ email: data.email });
                        if (userCount == 1) {
                            return reject({
                                msg: "User with this email already exists",
                                status: 0
                            });
                        }

                        const user = new UserModel(
                            {
                                name: data.name,
                                email: data.email,
                                contact: data.contact,
                                password: data.password
                            }
                        )
                        user.save()
                            .then(
                                () => {
                                    resolve(
                                        {
                                            msg: "Account created",
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                () => {
                                    reject(
                                        {
                                            msg: "Unable to create account",
                                            status: 0
                                        }
                                    )
                                }
                            )

                    }
                } catch (err) {
                    console.log(err.message);
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    login() {

    }
}

module.exports = UserController;