const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },

  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({ filename: "./logger/errors.log" }),
  ],

  exceptionHandlers: [
    new winston.transports.File({ filename: "./logger/errors.log" }),
  ],
});

module.exports = logger;
