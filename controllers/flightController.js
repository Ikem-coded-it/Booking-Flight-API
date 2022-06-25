const {Flights} = require('../models/Flight');
const {v4: uuid} = require('uuid');

// Get all flights
exports.getAllFlights = async (req, res) => {
    try {
        const flights = Flights;
        res.status(200).json({
            message: "All flights",
            flights: flights
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// Get single flight
exports.getSingleFlight = async (req, res) => {
    try {
        let id = req.params.id;
        const flight = await Flights.find((flight) => flight.id === id);
        res.status(200).json({
            message: "Flight found",
            flight,
        });
    } catch (error) {
        res.status(404).json({
            message: err.message
        })
    }
};

// Book flight
exports.bookFlight = async (req, res) => {
    try {
        const {title, time, price, date} = await req.body;
        const newFlight = {
            id: uuid(),
            title,
            time: new Date().toLocalTimeString(),
            price,
            date: new Date().toLocalDateString(),
        }

        Flights.push(newFlight);
        
        res.status(201).json({
            message: "Flight booked",
            newFlight,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update flights
exports.updateFlight = async (req, res) => {
    try {
        let id = req.params.id;
        const flight = Flights.find((flight) => flight.id === id);
        const { title, time, price, date } = await req.body;
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
        res.status(200).json({
            message: "Flight updated",
            flight,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete flight
exports.deleteFlight = (req, res) => {
    try {
        let id = req.params.id;
        const flight = Flights.find((flight) => flight.id === id);
        Flights.splice(Flights.indexOf(flight), 1);
        res.status(200).json({
            message: "Flight deleted",
            flight,
        });

    } catch (error) {
        res.status(500).json({ message: err.message });        
    }
};