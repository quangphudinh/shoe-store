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
                user: req.user._id,
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

orderRouter.get("/", protect, asyncHandler(
    async (req, res) => {
        const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
        if(orders){
            res.status(200).json(orders);
        }else{
            res.status(404);
            throw new Error("Order Not Found");
        }
    }
));

orderRouter.get("/:id", protect, asyncHandler(
    async (req, res) => {
        const order = await Order.findById(req.params.id).populate("user", "email"); // populate user :  trong trường user chỉ lấy ra emain thôi (nếu muốn lấy thêm name thì : "name email")
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    }
));

orderRouter.put("/:id/payment", protect, asyncHandler(
    async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);

        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    })
);



module.exports = orderRouter;