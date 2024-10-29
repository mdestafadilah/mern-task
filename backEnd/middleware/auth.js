const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req,res,next) {
    const token = req.header("x-auth-token");
    // check token dulu
    if(!token){
        return res.status(401).json({msg:"Not authorized!"})
    }
    // validasi token
    try {
        const decoded = jwt.verify(token, config.get("jwtsecret"));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: "Invalid Token"});
    }
}