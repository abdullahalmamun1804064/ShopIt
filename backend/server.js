const app = require('./app')
const connectDatabase=require('./config/database')

const dotenv = require('dotenv');
const cloudinary = require("cloudinary");
  

//handel uncaught excptions
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down due to uncaught expection');
  process.exit(1);
})

//Setting up config file 
dotenv.config({ path: 'backend/config/config.env' })

//Connecting to database
connectDatabase(); 

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT : ${process.env.PORT} on ${process.env.NODE_ENV} mode`)
})

 
//setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


//Handel Unhandle Promise rejections
process.on('Invalid scheme', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1)
  })
}) 