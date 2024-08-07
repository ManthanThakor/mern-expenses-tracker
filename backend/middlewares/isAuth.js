const jwt = require("jsonwebtoken");

// Middleware to verify JWT token

const isAuthenticated = async (req, res, next) => {
  //! Get the token from the header
  const headerObj = req.headers;
  const token = headerObj["authorization"]?.authorization?.split(" ")[1];

  // VERIFY THE TOKEN
  const verifyToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decoded;
    }
  );

  if (verifyToken) {
    //! save the user req obj
    req.user = verifyToken.id;
    next();
  } else {
    return res.status(401).json({ message: "token expire" });
  }
};

module.exports = isAuthenticated;
