const express = require("express");
const productRouter = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product.model");

productRouter.get("/", asyncHandler(
    async (req, res) => {
        const products = await Product.find({});
        res.json(products);
    }
));

productRouter.get("/:id", asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404);
            throw new Error("Product not found");
        }
    }
));



module.exports = productRouter;