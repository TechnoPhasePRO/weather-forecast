const express = require('express');
const router = express.Router();
const WeatherData = require('../models/weatherData');
const moment = require('moment');

router.get('/', async (req, res, next) => {
    try {
        const history = await WeatherData.find({});
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
});

router.get('/last7days', async (req, res, next) => {
    try {
        const startDate = moment().subtract(7, 'days').startOf('day');
        
        const history = await WeatherData.find({ timestamp: { $gte: startDate } });
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
});
router.get('/last15days', async (req, res, next) => {
    try {
        const startDate = moment().subtract(15, 'days').startOf('day');
        
        const history = await WeatherData.find({ timestamp: { $gte: startDate } });
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
});

router.get('/last30days', async (req, res, next) => {
    try {
        const startDate = moment().subtract(30, 'days').startOf('day');
        const history = await WeatherData.find({ timestamp: { $gte: startDate } });
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
