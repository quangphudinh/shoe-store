const express = require("express");
const dotenv = require("dotenv");
const Products = require("./data/Products");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const databaseSeeder = require('./databaseSeeder');
// Database seeder router
app.use('/api/seed', databaseSeeder);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//mongodb+srv://phudepjtrai123:phu0337948102@cluster1.fn3gd.mongodb.net/shoe-store
// app.get("/api/products", (req, res) => {
//     const products = Products;
//     res.json(products);
// })

// app.get("/api/products/:id", (req, res) => {
//     const product = Products.find((p) => p._id === req.params.id);
//     res.json(product);
// })