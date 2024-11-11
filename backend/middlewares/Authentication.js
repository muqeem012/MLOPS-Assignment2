const jwt = require("jsonwebtoken");
const secretKey = "MuhammadMuqeemuddinRawalpindi012";

const authenticate = async (req,res,next)=>{
    try{
            const token = req.body.authorization;
            if (!token)
                throw new Error("Unauthorized");
            
            else{
                const decoded = jwt.verify(token,secretKey);
                req.decoded = decoded;
                next();
            }
            
    }
    catch(error){
            res.status(401).json({status : 401, message : "Unauthorized or token expired"});
    }
};

const logoutAuthentication = async (req,res,next)=>{
    try{
        const token = req.body.authorization;
        if (!token)
            throw new Error("Unauthorized");
        
        else{
            const decoded = jwt.verify(token,secretKey);
            req.decoded = decoded;
            next();
        }
        
    }
    catch(error){
        res.status(401).json({status : 401, message : "Unauthorized or token expired"});
    }
};

module.exports = authenticate;
