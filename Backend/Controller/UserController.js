const Product = require("../Model/Product");
const Order = require("../Model/Order");

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
            from: 'products', // Assuming your product model is named 'Product'
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
      ]);
  
      res.json(filteredOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports = {
  getOrders,
  getProducts,
  filterOrders,
};
