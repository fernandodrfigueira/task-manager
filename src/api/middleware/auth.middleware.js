const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if(!token){
          return res.status(403).send("Access Denied");
        }
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user);

        next();
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const isAdmin = async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findById(id);
    console.log(id);
    console.log(user.role);
    if (user.role !== "Admin"){
        return res.status(403).send("Not enough permissions");
    }
    next();
}


module.exports = { verifyToken, isAdmin }