const express = require('express');
const ColorController = require('../controllers/ColorController.js');
const ColorRouter = express.Router();

ColorRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ColorController().read(req.params.id ?? null);
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


module.exports = ColorRouter;