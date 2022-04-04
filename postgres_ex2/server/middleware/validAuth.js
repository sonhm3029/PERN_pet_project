const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
    // Get token from header
    const token = req.header("Authorization");
    if(!token) {
        return res.status(403).json({message: "Authorization denied"});
    }

    // Verify token
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verify.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }

    next();
}