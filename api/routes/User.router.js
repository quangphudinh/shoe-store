const express = require("express");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");

const User = require("../models/User.model");
const { token } = require("morgan");

userRouter.post('/login', asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: null,
                createdAt: user.createdAt
            })
        }
        else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    }
));

userRouter.post('/register', asyncHandler(
    async (req, res) => {
        const { name , email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        else {
            const user = await User.create({
                name,
                email,
                password
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt
                });
            }
            else {
                res.status(400);
                throw new Error("Invalid user data");
            }
        }
    }
));

module.exports = userRouter;