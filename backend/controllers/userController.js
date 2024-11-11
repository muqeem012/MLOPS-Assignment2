const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// creating a transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MYUSER,
        pass: process.env.APPPASSWORD
    }
});

//function for user registration
const registerUser = async (req, res) => {

    if (req.body.password != req.body.cpassword)
        res.status(422).json({ status: 422, error: "Passwords don't match" });

    try {
        const preUser = await User.findOne({ email: req.body.email });

        if (preUser)
            res.status(422).json({ status: 422, error: "Email already exists" })

        else {
            const newUser = new User(req.body);
            const storedObject = await newUser.save();
            res.status(201).json({ status: 201, storedObject });
        }
    }
    catch (error) {
        res.status(422).json({ status: 422, err: "Error in either finding email or constraints violation", error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            res.status(422).json({ status: 422, message: "Invalid Credentials" });
            return;
        }

        const passMatch = await bcrypt.compare(password, foundUser.password);
        if (!passMatch) {
            res.status(422).json({ status: 422, message: "Invalid Credentials" });
            return;
        }
        //now generating the user authentication token
        const token = await foundUser.generateAuthToken();

        res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 9000000),
            http: true
        });

        res.status(200).json({ status: 200, foundUser, token });
    }
    catch (error) {
        res.status(422).json({ status: 422, message: "Technical Error", error });
    }
};

const validateUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.decoded._id });
        if (!foundUser)
            throw new Error("Unauthorized");

        res.status(200).json({ message: "authorized", foundUser });
    }
    catch (error) {
        res.status(401).json({ status: 401, message: "Unauthorized or technical errors" });
    }
};

const sendOTP = (req, res) => {
    const { email, otp } = req.body;
    const mailOptions = {
        from: {
            name: "Authentication Mern App",
            address: process.env.MYUSER
        },
        to: email,
        subject: "OTP verification code",
        text: `Your OTP code is ${otp}`,
        
    };
    const promise = transporter.sendMail(mailOptions);
    promise.then(() => {
        res.json({ message: "email sent successfully", status: 201 });
    }).catch((error) => {
        console.log(error);
        res.json({ message: "error in sending email", status: 422 });
    });

}

const changePassword = async (req, res) => {
    try{
        const {email, password, confirmpassword} = req.body;
        const foundUser = await User.findOne({email});
        foundUser.password = password;
        foundUser.cpassword = confirmpassword;
        await foundUser.save()
        res.json({message : "updated", status : 201});
    }
    catch(error){
        res.json({message : "error", status : "422"});
    }
}

module.exports = {
    registerUser,
    loginUser,
    validateUser,
    sendOTP,
    changePassword
};

