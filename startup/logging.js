const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.exceptions.handle(
    new winston.transports.Console({colorixe:true, prettyPrint: true}),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
};
