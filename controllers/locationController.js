const express = require('express');
const router = express.Router();
const locationService = require('../services/locationService');

router.get('/', locationService.getAllLocations);
router.post('/', locationService.addLocation);
router.get('/:locationId', locationService.getLocationById);
router.put('/:locationId', locationService.updateLocation);
router.delete('/:locationId', locationService.deleteLocation);

module.exports = router;
