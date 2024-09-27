const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        slug: {
            type: String,
            unique: true
        },
        image_name: {
            type: String,
            default: null
        },
        status: {
            type: Boolean,
            default: 1
        }
    },
    {
        timestamps: true
    }
)

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;