const express = require('express');
const ProductController = require('../controllers/ProductController');
const fileUpload = require('express-fileupload');
const adminAuth = require('../middleware/adminAuth');


const ProductRouter = express.Router();

// ProductRouter.use(adminAuth);

ProductRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ProductController().read(req.params.id, req.query);
        result.then(
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

ProductRouter.post(
    "/create",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const result = new ProductController().create(req.body, req.files.main_image);
        result.then(
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

ProductRouter.post(
    "/add-multiple-images/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const result = new ProductController()
            .addMultipleImage(req.files.other_images, req.params.id);
        result.then(
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


ProductRouter.patch(
    "/change-status",
    (req, res) => {
        const result = new ProductController().changeStatus(
            req.body.id, req.body.new_status, req.body.flag
        );
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
module.exports = ProductRouter;