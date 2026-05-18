const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  items:Array,

  shippingAddress:Object,

  courier:String,

  subtotal:Number,

  shippingCost:Number,

  total:Number,

  paymentStatus:{
    type:String,
    default:"pending"
  },

  orderStatus:{
    type:String,
    default:"pending"
  }

},{
  timestamps:true
});

module.exports = mongoose.model("Order", orderSchema);
