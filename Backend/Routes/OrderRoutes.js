const express = require("express");
const userController=require('../Controller/UserController');
const OrderRouter=express.Router();


OrderRouter.get('/orders',userController.getOrders);

OrderRouter.post('/filter-orders',userController.filterOrders);

module.exports=OrderRouter;