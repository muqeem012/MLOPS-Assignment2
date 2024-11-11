const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./database/connection");
const userRouter = require("./routes/userRoutes");

server.use(cookieParser());
server.disable("etag");
server.use(express.json());
server.use("*", cors({
    origin : true,
    credentials : true
}))

server.use("/user",userRouter);

server.listen(5000,()=>{
    console.log("\nServer is listening on port 5000");
})
