require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs')

const dataProd = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
const dataOrd = JSON.parse(fs.readFileSync('./orders.json', 'utf-8'))

const Product = require("./Model/Product.js");
const Order = require("./Model/Order.js");
const importData = async () => {
  try {
    await Product.create(dataProd)
    console.log('data successfully imported')
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
}
const importDataOrd = async () => {
  try {
    await Order.create(dataOrd)
    console.log('data successfully imported')
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
}

const OrderRouter = require("./Routes/OrderRoutes");
const ProductRouter = require("./Routes/ProductRoutes");

const dbPath = process.env.ATLAS_URI;

mongoose
  .connect(dbPath)
  .then((result) => console.log("connected to DB"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", OrderRouter);
app.use("/", ProductRouter);


app.listen(8000);
console.log("Listening on port 8000");