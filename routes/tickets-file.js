const express = require("express");
const cors = require("cors");
const { tickets } = require("../controllers");

const setup = () => {

  const controller = tickets(); // imports the controllers (i.e, whatever logic we want to perform)
  const router = express.Router();

  router.options("/", cors());

  router.post("/", cors(), controller.addTicket);

  return router;
};

module.exports = setup;
