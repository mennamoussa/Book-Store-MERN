const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require("dotenv").config();
//-----------------------------------------------------------------------


const validateToken = asyncHandler(async (req, res, next) => {
    // console.log("hi");    
    let token;
    let authHeader = req.headers.authorization;
    // console.log("authHeader:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Authorization token is missing or invalid" });
    }
    token = authHeader.split(" ")[1];
    // console.log("🚀 ~ validateToken ~ token:", token)
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "User is not authorized" });
    }
});

module.exports = validateToken;