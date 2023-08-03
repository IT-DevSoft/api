const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const accessTokenSecret = process.env?.ACCESS_TOKEN || "test_token";
const db = require("../../models");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const { username, phone } = req.user;

      const user = await db.users.findOne({
        attributes: ["email", "phone", "login"],
        where: {
          login: username,
          phone,
        },
      });

      if (user) {
        res.json(user);
        logger.requestSuccess(req);
        return;
      }

      res.status(401).send("Invalid token");
      logger.requestFail(req, "Invalid token");
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },

  signUp: (req, res) => {
    res.send("signUp");
  },

  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      req.user = { username: username };

      const user = await db.users.findOne({
        where: {
          login: username,
          password,
        },
      });

      if (user) {
        const token = jwt.sign(
          { username: user.login, phone: user.phone, role: "subscriber" },
          accessTokenSecret
        );

        res.json({
          user: username,
          token: token,
        });
        logger.requestSuccess(req);
        return;
      }

      res.status(401).send("Invalid user or password");
      logger.requestFail(req, "Invalid user or password");
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },
};
