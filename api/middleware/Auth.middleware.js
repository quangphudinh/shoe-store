const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // cái token này mã hóa 3 trường : id , iat , exp 
            req.user = await User.findById(decodedToken.id).select("-password");
            next();
        }
        catch (error) {
            console.log(error);
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

module.exports = protect ;