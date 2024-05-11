const Location = require('../models/locationModel');

const getAllLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        next(err);
    }
};

const addLocation = async (req, res, next) => {
    try {
        const { name, latitude, longitude } = req.body;
        const location = new Location({
            name,
            latitude,
            longitude
        });
        await location.save();
        res.status(201).json(location);
    } catch (err) {
        next(err);
    }
};

const getLocationById = async (req, res, next) => {
    try {
        const location = await Location.findById(req.params.locationId);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.json(location);
    } catch (err) {
        next(err);
    }
};

const updateLocation = async (req, res, next) => {
    try {
        const { name, latitude, longitude } = req.body;
        const location = await Location.findByIdAndUpdate(req.params.locationId, {
            name,
            latitude,
            longitude
        }, { new: true });
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.json(location);
    } catch (err) {
        next(err);
    }
};

const deleteLocation = async (req, res, next) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.locationId);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.json({ message: "Location deleted successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllLocations,
    addLocation,
    getLocationById,
    updateLocation,
    deleteLocation
};
