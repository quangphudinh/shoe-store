const router = require("express").Router();
const asyncHandler = require("express-async-handler"); // Xử lý xung đột dữ liệu ở các thuộc tính required

const User = require("./models/User.model");
const users = require("./data/User");
const Product = require("./models/Product.model");
const products = require("./data/Products");

router.post("/users", asyncHandler(
    async (req, res) => {
        await User.deleteMany({});
        const UserSeeder = await User.insertMany(users);
        res.send({UserSeeder});
    }
));

router.post("/products", asyncHandler(
    async (req, res) => {
        await Product.deleteMany({});
        const ProductSeeder = await Product.insertMany(products);
        res.send({ProductSeeder});
    }
));


module.exports = router;