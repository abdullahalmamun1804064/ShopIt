const Order = require('../models/order');
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const order = require('../models/order');

//Create a new order => api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxtPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxtPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user:req.user._id
  });
  res.status(200).json({
    success: true,
    order
  })
})

//get a single order => api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email -_id');

  if (!order) {
    return next (new ErrorHandler("No order found with this ID",404))
  }
  else {
    res.status(200).json({
      success: true,
      order
    })
  }
})

//get loged in user order => api/v1/orders/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  if (!orders) {
    return next (new ErrorHandler("No order found with this ID",404))
  }
  else {
    res.status(200).json({
      success: true,
      orders
    })
  }
})



//Get all orders - ADMIN => api/v1/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  let totalAmount = 0.0;
  orders.forEach(order => {
    totalAmount += order.totalPrice;
  })

    res.status(200).json({
      success: true,
      totalAmount,
      orders
    });
  
})

//Update / Process orders - ADMIN => api/v1/admin/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus=== 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  order.orderItems.forEach(async item => {
    await updateStrock(item.product, item.quantity);
  })
  
  order.orderStatus = req.body.status,
    order.deliveredAt = Date.now();

  await order.save();

    res.status(200).json({
      success: true,
  
    });
})
async function updateStrock(id, quantity){
  let product = await Product.findById(id);
  product.stock  =  product.stock - quantity;

  await product.save({validateBeforeSave : false})
}


//Delete order - ADMIN => api/v1/admin/orders
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
     return next(new ErrorHandler ("Order Not Found",404))
  }

   await order.remove();

    res.status(200).json({
      success: true,
    });
  
})
