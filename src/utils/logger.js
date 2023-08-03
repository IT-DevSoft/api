const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({
      level: "error",
      filename: "logs/error.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),

    new transports.File({
      filename: "logs/server.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

module.exports = {
  requestSuccess: (req) => {
    logger.info(
      `${req.originalUrl} - ${req.method} - ${req.ip} - user:${
        req?.user?.username || "anonymous"
      }`
    );
  },
  requestFail: (req, errorMessage) => {
    logger.error(
      `${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${errorMessage} - user:${req?.user?.username || "anonymous"}`
    );
  },
  info: (message) => {
    logger.info(message);
  },
};
