const mongoose = require('mongoose');

// model code
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 100
        },
        email: {
            type: String,
            maxLength: 100,
            unique: true
        },
        contact: {
            type: String,
            default: null,
        },
        password: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
            // true: active, false: inactive
        }
    },
    {
        timestamps: true
    }
)
// createdAt // updatedAt 

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;