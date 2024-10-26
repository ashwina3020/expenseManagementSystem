 const express = require("express");
 const cors = require("cors");
 const colors = require("colors");
 const dotenv = require("dotenv");
 const morgan = require("morgan");
 const path = require('path');
 const connectDB = require("./config/connectDB"); 

 //config dotenv file
 dotenv.config();

//database call
connectDB();

 //rest object
 const app = express();

 //middlewares
 app.use(express.json());
 app.use(morgan('dev'));
 app.use(cors());

 //routes
// Corrected route for user
app.use('/api/v1/users', require('./routes/userRoutes'));


//transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));


//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function(req,res) {
   res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

 //port
 const PORT = process.env.PORT || 8080;

 //listen server
 app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.bgBlue.black);
 });

