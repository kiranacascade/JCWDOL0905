const db = require("../models");
const admin = db.Admin;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          isError: true,
          message: "Please complete your data",
        });
      }

      const adminExist = await admin.findOne({
        where: {
          email,
        },
      });

      if (!adminExist) {
        return res.status(400).send({
          isError: true,
          message: "Admin not found",
        });
      }

      // Compare password dengan bcrypt
      //   const isvalid = await bcrypt.compare(password, adminExist.password);

      if (password !== adminExist.password) {
        return res.status(400).send({
          isError: true,
          message: "Wrong password",
        });
      }

      const payload = {
        id: adminExist.id,
        role: adminExist.role,
        id_branch: adminExist.id_branch,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "12h",
      });

      res.status(200).send({
        isError: false,
        message: "admin login success",
        data: adminExist,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        isError: true,
        message: "Admin login failed",
      });
    }
  },
};
