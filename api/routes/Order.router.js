const express = require("express");
const orderRouter = express.Router();
const protect = require("../middleware/Auth.middleware");
const asyncHandler = require("express-async-handler");

const Order = require("../models/Order.model");

orderRouter.post("/", protect, asyncHandler(
    async (req, res) => {
        const { orderItems, shippingAddress, paymentMethod, 
            taxPrice, shippingPrice, totalPrice, price } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items are found");
        } else {
            const order = new Order({
                orderItems,
                user : req.user._id,
                shippingAddress,
                paymentMethod,
                taxPrice,
                shippingPrice,
                totalPrice,
                price
            });
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    }
));



module.exports = orderRouter;