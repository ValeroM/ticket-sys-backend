const express = require("express");

const routes = () => {
  const app = express();

  app.use("/ticket", require("./tickets-file")());

  app.use("/", (req, res, next) => {
    console.log("You have hit [GET] /api endpoint");
    let responseMessage = "Welcome to the Ticket System API";
    console.log("Sending back the following message:\n" + responseMessage);
    return res.status(200).send(responseMessage);
  });

  return app;
};

const attachRoutes = app => {
  app.use("/api", routes());
};

module.exports = attachRoutes;
