const express = require('express');
const router = express.Router();

// Mock shipment data
const mockShipments = new Map();

// POST /api/v1/shipment
router.post('/', (req, res) => {
    const shipment = req.body;
    
    // Validate required fields
    if (!shipment.sender || !shipment.receiver || !shipment.parcels) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    // Generate mock shipment ID
    const shipmentId = `SH${Date.now()}`;
    
    // Create mock shipment
    const newShipment = {
        id: shipmentId,
        status: 'created',
        createdAt: new Date().toISOString(),
        ...shipment
    };

    mockShipments.set(shipmentId, newShipment);

    res.status(201).json(newShipment);
});

// GET /api/v1/shipment/:id
router.get('/:id', (req, res) => {
    const shipment = mockShipments.get(req.params.id);
    
    if (!shipment) {
        return res.status(404).json({
            status: 'error',
            message: 'Shipment not found',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    res.json(shipment);
});

// GET /api/v1/shipment
router.get('/', (req, res) => {
    const shipments = Array.from(mockShipments.values());
    res.json(shipments);
});

// PATCH /api/v1/shipment/:id/status
router.patch('/:id/status', (req, res) => {
    const shipment = mockShipments.get(req.params.id);
    
    if (!shipment) {
        return res.status(404).json({
            status: 'error',
            message: 'Shipment not found',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    const { status } = req.body;
    if (!status) {
        return res.status(400).json({
            status: 'error',
            message: 'Status is required',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    shipment.status = status;
    mockShipments.set(req.params.id, shipment);

    res.json(shipment);
});

module.exports = router; 