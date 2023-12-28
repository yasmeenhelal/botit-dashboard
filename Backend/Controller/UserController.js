const Product = require("../Model/Product");
const Order = require("../Model/Order");
const User = require("../Model/User");
const authUtils = require("../auth");

    // Routes
    const getOrders = async (req, res) => {
    try {
      // Retrieve all orders
        const orders = await Order.find().populate('productIDs');

      const dashboardData = orders.map((order) => ({
        refNumber: order._id,
        customerName: order.customerName,
        orderDate: order.orderDate,
        totalAmount: order.productIDs.reduce((total, product) => total + product.price, 0),
        products: order.productIDs.map((product) => ({
          name: product.name,
          category: product.category,
          price: product.price,
        })),
      }));
  
      res.json(dashboardData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const getProducts = async (req, res) => {
    try {
      // Retrieve all products
      const products = await Product.find();
  
      const productData = products.map((product) => ({
        productID: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
      }));
  
      res.json(productData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const filterOrders = async (req, res) => {
    try {
      const { startDate, endDate, minPrice, maxPrice } = req.body;
  
      // Input validation
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Invalid input parameters' });
      }
  
      const filteredOrders = await Order.aggregate([
        {
          $match: {
            orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productIDs',
            foreignField: '_id',
            as: 'products',
          },
        },
        {
          $addFields: {
            totalAmount: {
              $reduce: {
                input: '$products',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.price'] },
              },
            },
          },
        },
        {
          $match: {
            totalAmount: { $gte: minPrice, $lte: maxPrice },
          },
        },
        {
          $project: {
            refNumber: '$_id', // Include the refNumber in the projection
            customerName: 1,
            orderDate: 1,
            totalAmount: 1,
            products: 1,
          },
        },
      ]);
  
      console.log(filteredOrders);
      res.json(filteredOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const createUser = async (req, res) => {
    const user = req.body.user;
    user.password = await authUtils.hashPass(user.password);
    await User.create(user)
      .then((result) => {
        res.header("Content-Type", "application/json");
        res.send(JSON.stringify(result, null, 4));
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  };

  const findUser = (req, res) => {
    User.findOne({ email: req.params.email }).then((result) => {
      console.log(result);
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(result, null, 4));
    });
  };

  const findUserEmail = async (req, res, next) => {
    try {
      const user = req.body.user;
      const { email } = user;
      const userFound = await User.findOne({ email });
      if (userFound) {
        req.user = userFound;
        next();
      } else {
        const error = new Error("User Not Found");
        next(error);
      }
    } catch (err) {
      next(err);
    }
  };

  const authenticateUser = async (req, res, next) => {
    const passIsValid = await authUtils.comparePass(
      req.body.user.password,
      req.user.password
    );
    if (passIsValid) {
      next();
    } else {
      const err = new Error("Invalid email or password");
      next(err);
    }
  };
  
  const generateJWT = async (req, res, next) => {
    try {
      const user = req.user;
      const token = authUtils.generateToken(user);
      if (token) {
        req.token = token;
        next();
      } else {
        const error = new Error("Cannot generate token");
        next(error);
      }
    } catch (err) {
      next(err);
    }
  };

  const hashPassword = async (req, res, next) => {
    try {
      const { newPassword } = req.body;
      const hashedPassword = await authUtils.hashPass(newPassword);
      req.user.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  };

  const checkAdmin = async (req, res, next) => {
    try {
      const user = req.user;
      if (user.admin) {
        req.typeOfUser = "admin";
      } else {
        req.typeOfUser = "user";
      }
      next();
    } catch (err) {
      next(err);
    }
  };

  const loginPipeline = [
    findUserEmail,
    checkAdmin,
    authenticateUser,
    generateJWT,
  ];
  
module.exports = {
  getOrders,
  getProducts,
  filterOrders,
  findUser,
  createUser,
  loginPipeline,
};
