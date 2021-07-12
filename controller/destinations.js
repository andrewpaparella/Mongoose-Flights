const Flight = require('../models/flight')

module.exports = {
    create,
    delete: deleteDestination
}
function create(req,res) {
    Flight.findById(req.params.id, function (err, flight) {
        flight.destination.push(req.body);
        flight.save(function (err) {
            console.log(flight)
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

async function deleteDestination(req,res) {
    try {
        const flightDeleted = await Flight.destination.findByIdAndDelete(req.params.id);
        console.log(flightDeleted)
        flight.save();
        res.redirect(`flights/${req.params.id}}`,
        flight,
    )} catch (err) {
        res.send(err)
    }
}

    

