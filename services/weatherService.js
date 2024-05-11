const axios = require('axios');
const moment = require('moment');
const cache = require('../middlewares/cache');
const Location = require('../models/locationModel'); 
const WeatherData = require('../models/weatherData'); 
const fetchWeatherForecast = async (latitude, longitude) => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
        const cachedData = cache.get(apiUrl);
        if (cachedData) {
            console.log('Using cached weather data');
            return cachedData;
        }
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        cache.set(apiUrl, weatherData, 60 * 60); 
        await saveWeatherData(weatherData);

        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw new Error('Failed to fetch weather data');
    }
};

const saveWeatherData = async (weatherData) => {
    try {
        const newWeatherData = new WeatherData({
            timestamp: new Date(),
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
        });
        await newWeatherData.save();
    } catch (error) {
        console.error('Error saving weather data:', error.message);
        throw new Error('Failed to save weather data');
    }
};

const formatWeatherForecast = (weatherData) => {
    const { main, wind, clouds } = weatherData;

    const formattedForecast = {
        temperature: main.temp,
        humidity: main.humidity,
        windSpeed: wind.speed,
        cloudiness: clouds.all
    };

    return formattedForecast;
};

const getWeatherForecast = async (req, res, next) => {
    try {
        const { locationId } = req.params;
        const location = await Location.findById(locationId);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        const weatherData = await fetchWeatherForecast(location.latitude, location.longitude);
        const formattedForecast = formatWeatherForecast(weatherData);
        res.json(formattedForecast);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWeatherForecast
};
