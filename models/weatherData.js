const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    temperature: {
        type: Number
    },
    humidity: {
        type: Number
    },
    windSpeed: {
        type: Number
    },
    cloudiness: {
        type: Number
    },
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherData;
