const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const fileUpload = require('express-fileupload');
const adminAuth = require('../middleware/adminAuth');

const CategoryRouter = express.Router();


CategoryRouter.post(
    "/create",
    [
        fileUpload(
            {
                createParentPath: true
            }
        ),
        adminAuth
    ],
    (req, res) => {
        const result = new CategoryController()
            .create(req.body, req.files.category_image ?? undefined);
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

CategoryRouter.get(
    "/:id?",
    (req, res) => {
        const result = new CategoryController().read(req.params.id);
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
CategoryRouter.patch(
    "/change-status",
    (req, res) => {
        const result = new CategoryController().changeStatus(
            req.body.id, req.body.new_status
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

CategoryRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new CategoryController().delete(req.params.id);
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

CategoryRouter.put(
    "/edit/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const result = new CategoryController().edit(
            req.params.id, req.body, req.files?.category_image ?? null);
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
module.exports = CategoryRouter;