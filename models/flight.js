const mongoose = require('mongoose');
const flights = require('../controller/flights');


const Schema = mongoose.Schema;

function addYear(){
    let today = new Date();
    let todaySeconds = Date.parse(today);
    let secondsInYear = 365 * 24 * 60 * 60 * 1000;
    let nextYearSeconds = secondsInYear + todaySeconds;
    let nextYear = new Date(nextYearSeconds);
    return nextYear
}



const destinationSchema = new Schema (
    {
        airport: {
            type: String,
            enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        },
        arrival: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)


const flightSchema = new Schema (
    {
        airline: {
            type: String,
            enum: ['American', 'Southwest', 'United']
        },
        airport: {
            type: String,
            enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
            default: 'DEN'
        },
        flightNo: {
            type: Number,
            min: 10,
            max: 9999
        },
        departs: {
            type: Date,
            default: new Date(+new Date()+ 365 * 24 *60 *60 *1000)
        },
        destination: [destinationSchema],
        // ticket: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Ticket"
        // }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Flight', flightSchema)