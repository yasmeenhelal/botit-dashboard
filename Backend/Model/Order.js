const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  productIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  orderDate: {
    type: Date,
    required: true,  
  },
});

const order = mongoose.model("Order", orderSchema);
module.exports = order;