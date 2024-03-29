const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/productsData.json');
const { connect } = require('mongoose');

//setting dotenv file
dotenv.config({path : 'backend/config/config.env'})

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products are deletes');

    await Product.insertMany(products);
    console.log('Products are added');

    process.exit();
    
  } catch (error){
    console.log(error.message);
    process.exit();
  }
}
seedProducts();