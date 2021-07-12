const Flight = require("../models/flight");
const ticket = require("../models/ticket");
const Ticket = require("../models/ticket");

module.exports = {
  new: newTicket,
  create,
};

function newTicket(req, res) {
  res.render(`tickets/new`, {
    title: "Add Ticket",
    flight: req.params.id,
  });
}

// async function create(req, res) {
//     console.log(req.body)
//     const flight = req.params.id
//     try {
//         const ticketNew = await Ticket.create(req.body)
//         res.redirect('/flights/' + flight._id, {
//             flight
//         })
//     } catch (err) {
//         res.send(err)
//     }
// }

// function create(req, res) {
//     Ticket.create(req.body, function (err, ticket) {
//         ticket
//         res.redirect(`flights/${flight._id}`, {
//             ticket,
//             flight: req.params.id
//         })
//     })
// }

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  const ticketNew = req.body;
  ticketNew.flight = flight;
  const ticket = await Ticket.create(ticketNew);
  ticket.save(function (err) {
    if (err) return res.render(`/flights/${flight._id}`);
    console.log(ticket);
    res.redirect(`/flights/${flight._id}`);
  });
}
