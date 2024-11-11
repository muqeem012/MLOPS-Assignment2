const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "MuhammadMuqeemuddinRawalpindi012";
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 6
    },
    email : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if (!validator.isEmail(value))
                throw new Error ("Invalid Email");
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        trim : true
    },
    cpassword : {
        type : String,
        required : true,
        minlength : 8,
        trim : true
    },
    tokens : [
        {
            token : String
        }
    ]
})

userSchema.pre("save",async function(next){
        try{
            if (this.isModified("password")){
            this.password = await bcrypt.hash(this.password,12);
            this.cpassword = await bcrypt.hash(this.cpassword,12);
            next();
           }
        }
        catch(error){
            error.dsc = "Error during hashing";
            return error;
        }
});

userSchema.methods.generateAuthToken = async function(){
    try{
            const token = jwt.sign({_id : this._id},secretKey, {expiresIn : "30m"});
            this.tokens = this.tokens.concat({token : token});
            await this.save();
            return token;
    }
    catch (error){
        return error;
    }
}

const User = new mongoose.model("User", userSchema);
module.exports = User;