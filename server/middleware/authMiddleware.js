const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    console.log("========== AUTH MIDDLEWARE ==========");

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No Token Found");

      return res.status(401).json({
        message: "Access Denied. No Token Provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token Received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);

    req.user = decoded;

    console.log("Authentication Successful");
    console.log("====================================");

    next();
  } catch (error) {
    console.log("========== AUTH ERROR ==========");
    console.log(error);
    console.log("================================");

    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = protect;
