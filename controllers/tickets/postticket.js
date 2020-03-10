const db = require("../../database/models");
const dotenv = require('dotenv');
dotenv.config('../../.env');
const { Ticket } = db;
const client = require("twilio")(process.env.TWILIO_ACC_SID, process.env.TWILIO_TOKEN);

const setup = () => {

  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/ticket endpoint");
    next();
  };

  let ticketCreated = null;

  const addticket = (req, res, next) => {
    const new_ticket = req.body;
    Ticket.create(new_ticket)
      .then(ticket => {
        ticketCreated = ticket;
        next();
      })
      .catch(err => {
        res.status(400).send("Error in creating a ticket and storing it in the database")
      });
  };

  const sendTextToMyself = (req, res) => {
    client.messages.create({
      to: process.env.MY_PHONE_NUM,
      from: process.env.TWIL_NUM,
      body: `New ticket received on ${ticketCreated.createdAt}.\nRoom: ${ticketCreated.room_num}\nFloor: ${ticketCreated.floor_num}\nIssue: ${ticketCreated.issue}\nDescription:\n${ticketCreated.desc}`
    })
      .then(message => {
        // console.log(message.sid);
        res.status(200);
      })
      .catch(err => {
        res.status(400).send("Error in sending the text to Marco's phone number.");
        // res.status(400).json(err);
      });
  }

  return [logEndPoint, addticket, sendTextToMyself];
};

module.exports = setup;
