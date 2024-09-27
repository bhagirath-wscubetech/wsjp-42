const { generateImageName } = require("../helper");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const { unlinkSync, existsSync } = require('fs');


class CategoryController {
    create(data, category_image) {
        return new Promise(
            (res, rej) => {
                try {
                    if (!data.name || !data.slug || !category_image) {
                        return rej({
                            msg: "Please enter all required fields",
                            status: 0
                        })
                    }
                    const image_name = generateImageName(category_image.name);
                    const destination = "./public/images/category/" + image_name;

                    category_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej(
                                    {
                                        msg: "Unable to upload image",
                                        status: 0
                                    }
                                )
                            } else {
                                const category = new CategoryModel({
                                    name: data.name,
                                    slug: data.slug,
                                    image_name: image_name
                                });
                                category.save()
                                    .then(
                                        () => {
                                            res(
                                                {
                                                    msg: "Category created",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            rej(
                                                {
                                                    msg: "Unable to create category",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                            }
                        }
                    )


                } catch (err) {
                    rej(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    read(id) {
        return new Promise(
            async (res, rej) => {

                try {
                    let categoryData = null;
                    if (id) {
                        categoryData = await CategoryModel.findById(id);
                        res(
                            {
                                msg: "Category Found",
                                status: 1,
                                categoryData
                            }
                        )
                    } else {
                        categoryData = await CategoryModel.find();
                        const data = [];
                        const allPromises = categoryData.map(
                            async (cd) => {
                                const productCount = await ProductModel
                                    .find({ category_id: cd._id })
                                    .countDocuments();
                                data.push({
                                    ...cd.toJSON(),
                                    productCount
                                })
                            }
                        )

                        await Promise.all(allPromises);

                        res(
                            {
                                msg: "Category Found",
                                status: 1,
                                categoryData: data
                            }
                        )
                    }
                } catch (err) {
                    console.log(err.message);
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    delete(id) {
        return new Promise(
            (res, rej) => {
                try {
                    CategoryModel.deleteOne({ _id: id })
                        .then(
                            () => {
                                res(
                                    {
                                        msg: "Data deleted",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                rej(
                                    {
                                        msg: "Unable to delete data",
                                        status: 0
                                    }
                                )
                            }
                        )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    changeStatus(id, new_status) {
        return new Promise(
            (res, rej) => {
                try {
                    CategoryModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                status: new_status
                            }
                        }
                    ).then(
                        () => {
                            res(
                                {
                                    msg: "Status changed",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        () => {
                            rej(
                                {
                                    msg: "Unable to change status",
                                    status: 0
                                }
                            )
                        }
                    )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    edit(id, data, file) {
        return new Promise(
            async (res, rej) => {
                try {
                    const category = await CategoryModel.findById(id);
                    if (file != null) {
                        const image_name = generateImageName(file.name);
                        const desti = "./public/images/category/" + image_name;
                        file.mv(
                            desti,
                            (err) => {
                                if (err) {
                                    rej(
                                        {
                                            msg: "Unable to update data",
                                            status: 0
                                        }
                                    )
                                } else {
                                    if (existsSync("./public/images/category/" + category.image_name)) {
                                        unlinkSync("./public/images/category/" + category.image_name)
                                    }
                                    CategoryModel.updateOne(
                                        {
                                            _id: id
                                        },
                                        {
                                            $set: {
                                                name: data.name,
                                                slug: data.slug,
                                                image_name: image_name
                                            }
                                        }
                                    ).then(
                                        () => {
                                            res(
                                                {
                                                    msg: "Data updated",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            rej(
                                                {
                                                    msg: "Unable to update data",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                }
                            }
                        )
                    } else {
                        CategoryModel.updateOne(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    name: data.name,
                                    slug: data.slug
                                }
                            }
                        ).then(
                            () => {
                                res(
                                    {
                                        msg: "Data updated",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                rej(
                                    {
                                        msg: "Unable to update data",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}


module.exports = CategoryController;