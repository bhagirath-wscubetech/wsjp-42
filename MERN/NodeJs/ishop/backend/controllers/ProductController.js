const ProductModel = require("../models/ProductModel");
const CategoryModel = require("../models/CategoryModel");
const { generateImageName } = require('../helper');

class ProductController {

    changeStatus(id, new_status, flag) {
        return new Promise(
            (res, rej) => {
                try {
                    console.log(flag, "flag");
                    const changeObj = {};
                    if (flag == 1) {
                        changeObj.stock = new_status;
                    } else if (flag == 2) {
                        changeObj.top_selling = new_status;
                    } else if (flag == 3) {
                        changeObj.status = new_status;
                    }
                    ProductModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: changeObj
                        }
                    ).then(
                        (success) => {
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

    read(id, query) {
        return new Promise(
            async (res, rej) => {

                try {
                    const filterQuery = {};
                    if (query.category_slug != null) {
                        const category = await CategoryModel.findOne({ slug: query.category_slug });
                        if (category) {
                            filterQuery['category_id'] = category._id;
                        }
                    }
                    if (query.product_color != "null" && query.product_color != undefined) {
                        filterQuery['colors'] = query.product_color;
                    }
                    if (query.start != undefined && query.end != undefined) {
                        filterQuery['final_price'] = {
                            "$gte": query.start,
                            "$lte": query.end
                        }
                    }


                    let productData = null;
                    if (id) {
                        productData = await ProductModel.findById(id).populate(['category_id', 'colors']);
                    } else {
                        productData = await ProductModel.find(filterQuery).populate(['category_id', 'colors']).limit(query.limit);
                    }
                    res(
                        {
                            msg: "Product Found",
                            status: 1,
                            productData
                        }
                    )
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    create(data, main_image) {
        return new Promise(
            (res, rej) => {
                try {
                    const image_name = generateImageName(main_image.name);
                    const destination = "./public/images/product/" + image_name;
                    main_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej({
                                    msg: "Unable to add product",
                                    status: 0
                                })
                            } else {
                                const product = new ProductModel({
                                    name: data.name,
                                    slug: data.slug,
                                    category_id: data.category,
                                    original_price: data.original_price,
                                    discount_percentage: data.discount_percent,
                                    final_price: data.final_price,
                                    colors: JSON.parse(data.colors),
                                    short_description: data.short_description,
                                    long_description: data.long_description,
                                    main_image: image_name
                                    // array to json
                                })
                                product.save()
                                    .then(
                                        (success) => {
                                            res({
                                                msg: "Product added",
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        (error) => {
                                            rej({
                                                msg: "Unable to add product",
                                                status: 0
                                            })
                                        }
                                    )
                            }
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

    addMultipleImage(other_images, id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const product = await ProductModel.findById(id);
                    if (product) {
                        const otherImagesNames = product.other_images ?? [];
                        const uploadPromises = [];
                        if (Array.isArray(other_images)) {
                            for (let image of other_images) {
                                const name = generateImageName(image.name);
                                const desti = "./public/images/product/" + name;
                                otherImagesNames.push(name);
                                uploadPromises.push(image.mv(desti));
                            }
                        } else {
                            const name = generateImageName(other_images.name);
                            const desti = "./public/images/product/" + name;
                            otherImagesNames.push(name);
                            uploadPromises.push(other_images.mv(desti));
                        }
                        await Promise.all(uploadPromises);
                        ProductModel.updateOne(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    other_images: otherImagesNames
                                }
                            }
                        ).then(
                            () => {
                                res({
                                    msg: "Images uploaded",
                                    status: 1,
                                    otherImagesNames
                                })
                            }
                        ).catch(
                            () => {
                                rej({
                                    msg: "Unable to upload image",
                                    status: 0
                                })
                            }
                        )
                    } else {
                        rej({
                            msg: "Wrong product id",
                            status: 0
                        })
                    }
                } catch (err) {
                    console.log(err.message);
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = ProductController;