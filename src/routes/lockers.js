const express = require('express');
const router = express.Router();

// Mock locker data
const mockLockers = [
    {
        id: 'LK001',
        name: 'Central Station Locker',
        address: {
            street: 'Main Street 1',
            city: 'Vilnius',
            postalCode: '01234',
            country: 'LT'
        },
        coordinates: {
            latitude: 54.6872,
            longitude: 25.2797
        },
        status: 'active',
        availableBoxes: 5,
        totalBoxes: 10
    },
    {
        id: 'LK002',
        name: 'Shopping Mall Locker',
        address: {
            street: 'Shopping Street 2',
            city: 'Vilnius',
            postalCode: '01235',
            country: 'LT'
        },
        coordinates: {
            latitude: 54.6892,
            longitude: 25.2799
        },
        status: 'active',
        availableBoxes: 3,
        totalBoxes: 8
    }
];

// GET /api/v1/lockers
router.get('/', (req, res) => {
    const { city, status } = req.query;
    
    let filteredLockers = [...mockLockers];
    
    if (city) {
        filteredLockers = filteredLockers.filter(
            locker => locker.address.city.toLowerCase() === city.toLowerCase()
        );
    }
    
    if (status) {
        filteredLockers = filteredLockers.filter(
            locker => locker.status === status
        );
    }
    
    res.json(filteredLockers);
});

// GET /api/v1/lockers/:id
router.get('/:id', (req, res) => {
    const locker = mockLockers.find(l => l.id === req.params.id);
    
    if (!locker) {
        return res.status(404).json({
            status: 'error',
            message: 'Locker not found',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }
    
    res.json(locker);
});

// GET /api/v1/lockers/nearby
router.get('/nearby', (req, res) => {
    const { latitude, longitude, radius = 5 } = req.query;
    
    if (!latitude || !longitude) {
        return res.status(400).json({
            status: 'error',
            message: 'Latitude and longitude are required',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }
    
    // Mock nearby lockers calculation
    const nearbyLockers = mockLockers.filter(locker => {
        // Simple distance calculation (not accurate, just for mock)
        const latDiff = Math.abs(locker.coordinates.latitude - parseFloat(latitude));
        const lonDiff = Math.abs(locker.coordinates.longitude - parseFloat(longitude));
        return (latDiff + lonDiff) < parseFloat(radius);
    });
    
    res.json(nearbyLockers);
});

module.exports = router; 