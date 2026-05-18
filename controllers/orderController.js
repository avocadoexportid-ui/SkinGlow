const midtransClient = require("midtrans-client");
const Order = require("../models/Order");

const snap = new midtransClient.Snap({
  isProduction:false,
  serverKey:process.env.MIDTRANS_SERVER_KEY
});

exports.createOrder = async (req, res) => {

  try {

    const {
      items,
      shippingAddress,
      courier,
      subtotal,
      shippingCost,
      total
    } = req.body;

    const order = await Order.create({
      items,
      shippingAddress,
      courier,
      subtotal,
      shippingCost,
      total
    });

    const parameter = {
      transaction_details:{
        order_id:order._id.toString(),
        gross_amount:total
      }
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({
      token:transaction.token,
      redirect_url:transaction.redirect_url
    });

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }
};
