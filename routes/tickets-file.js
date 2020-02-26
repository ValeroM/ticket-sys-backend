const express = require("express");
const { tickets } = require("../controllers");

const setup = () => {

  const controller = tickets(); // imports the controllers (i.e, whatever logic we want to perform)
  const router = express.Router();

  router.post("/", controller.addTicket);

  return router;
};

module.exports = setup;
