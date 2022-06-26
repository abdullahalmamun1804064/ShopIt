const app = require('./app')
const connectDatabase=require('./config/database')

const dotenv = require('dotenv');

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

//Handel Unhandle Promise rejections
process.on('Invalid scheme', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1)
  })
}) 