const express = require("express");
const userController=require('../Controller/UserController');
const ProductRouter=express.Router();

ProductRouter.get('/products',userController.getProducts);

module.exports=ProductRouter;