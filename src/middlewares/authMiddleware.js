const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const accessTokenSecret = process.env?.ACCESS_TOKEN || "test_token";

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          logger.requestFail(req, 403);
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      logger.requestFail(req, 401);
      res.sendStatus(401);
    }
  } catch (ex) {
    logger.requestFail(req, ex.message);
  }
};

module.exports = authenticateJWT;
