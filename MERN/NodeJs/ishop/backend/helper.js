const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.PASS_KEY);
var jwt = require('jsonwebtoken');


const generateToken = (user) => {
    return jwt.sign(user, process.env.PASS_KEY, {
        expiresIn: "1d"
    });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.PASS_KEY);
}

const generateImageName = (image_name) => {
    return Math.floor(Math.random() * 1000000) + new Date().getTime() + image_name;
}

const encryptPassword = (value) => {
    return cryptr.encrypt(value);
}

const decryptPassword = (value) => {
    return cryptr.decrypt(value);
}
module.exports = { generateToken, verifyToken, generateImageName, encryptPassword, decryptPassword };