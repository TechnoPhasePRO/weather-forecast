const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');

router.get('/:locationId', weatherService.getWeatherForecast);

module.exports = router;
