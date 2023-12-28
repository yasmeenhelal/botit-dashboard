const express = require("express");
const userController=require('../Controller/UserController');
const UserRouter=express.Router();

UserRouter.post('/create',userController.createUser);

UserRouter.post("/login", userController.loginPipeline, async (req, res) => {
    res.status(200).json({
      message: "Logged in successfully",
      typeOfUser: req.typeOfUser,
      token: req.token,
      user: req.user,
    });
  });

module.exports=UserRouter;