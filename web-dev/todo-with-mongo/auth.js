const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ message: "Invalid or Missing token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { jwt, authMiddleware };
