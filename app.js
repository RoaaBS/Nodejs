 const express = require("express");
 const logger = require("./middleware/logger");
 require("dotenv").config();
 const {notFound,errorHandler}=require("./middleware/error");
 const connectToDB =require("./config/db");


//connection to DB
connectToDB();
 //init App
  const app = express();
  //Apply Middlewares
 app.use(express.json());
 app.use(logger);


//Routes
 app.use("/api/books",require("./routes/book"));
 app.use("/api/authors",require("./routes/authors"));
 app.use("/api/auth",require("./routes/auth"));
 app.use("/api/users",require("./routes/users"));

 // Error Handler Midleware
 app.use(notFound);
 app.use(errorHandler);
//Runnig server
 const PORT= process.env.PORT ||5000;
 app.listen(PORT,() => console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`)
 ); 
 