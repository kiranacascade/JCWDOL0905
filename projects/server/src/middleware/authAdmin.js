const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.headers.authorization;
    // console.log("middleware", token);
    if (!token) return res.status(401).send("Access Denied / Unauthorized Request");

    try {
      token = token.split(" ")[1];
      // console.log("split", token);
      if (token == "null" || !token) {
        return res.status(401).send("Access Denied");
      }

      let verifiedAdmin = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!verifiedAdmin) {
        return res.status(401).send("Access Denied");
      }

      // console.log("verifiedAdmin", verifiedAdmin)

      req.admin = verifiedAdmin;
      // console.log(req.admin);
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid Token");
    }
  },
};
