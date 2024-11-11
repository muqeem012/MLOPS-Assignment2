const mongoose = require("mongoose");

const options = {
    useUnifiedTopology : true,
    useNewUrlParser : true,
    family : 4
};

mongoose.connect(process.env.MONGO_URI,options)
.then(()=>{
    console.log("Connected to Database");
})
.catch((error)=>{
    console.log("Database not connected");
})
