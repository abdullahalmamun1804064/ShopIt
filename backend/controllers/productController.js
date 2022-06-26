const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures =require('../utils/apiFeatures')

//Post a product => /admin/api/v1/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });

});


//Get all Product => /api/v1/products
exports.getProduct = catchAsyncError(async (req, res, next) => {

  const resPerPage = 4; 
  
  //Total product count
  const productCount = await Product.countDocuments();
  // console.dir(req.query);
  const apiFeatures = new APIFeatures(Product.find(), req.query)
                                           .search()
                                           .filter()
                                           .pagination(resPerPage)

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});
 
//Get a single Product => /api/v1/product/:id

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {

  const productr = await Product.findOne({ _id: req.params.id });
  console.log(productr);

  if (!productr) {
    return next('Product not found', 404);
  }
  else {
    res.status(200).json({
      success: true ,
      productr,
    });
  }
});

//updateProduct =>/admin/product/:id
exports.updateProduct =catchAsyncError( async (req, res, next) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return next('Product not found', 404);
  }

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {},
    );
    res.status(200).json({
      success: true,
      updateProduct,
    });
  

});

//deleteProduct =>/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
     return next(new ErrorHandler ("Product not found", 404) );
   }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product Remove successfully",
    }) 
});
