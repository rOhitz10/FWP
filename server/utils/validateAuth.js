const jwt = require('jsonwebtoken');

const validateAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(403).json({ msg: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        req.user = decoded; // Attach decoded token data to request
        next();
    });
};

module.exports = validateAuth;