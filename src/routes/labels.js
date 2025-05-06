const express = require('express');
const router = express.Router();

// Mock label data
const mockLabels = new Map();

// POST /api/v1/labels
router.post('/', (req, res) => {
    const { shipmentId, format = 'pdf' } = req.body;

    if (!shipmentId) {
        return res.status(400).json({
            status: 'error',
            message: 'Shipment ID is required',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    // Generate mock label ID
    const labelId = `LB${Date.now()}`;
    
    // Create mock label
    const newLabel = {
        id: labelId,
        shipmentId,
        format,
        url: `https://mock-dpd-api.com/labels/${labelId}.${format}`,
        createdAt: new Date().toISOString()
    };

    mockLabels.set(labelId, newLabel);

    res.status(201).json(newLabel);
});

// GET /api/v1/labels/:id
router.get('/:id', (req, res) => {
    const label = mockLabels.get(req.params.id);
    
    if (!label) {
        return res.status(404).json({
            status: 'error',
            message: 'Label not found',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    res.json(label);
});

// GET /api/v1/labels/shipment/:shipmentId
router.get('/shipment/:shipmentId', (req, res) => {
    const labels = Array.from(mockLabels.values())
        .filter(label => label.shipmentId === req.params.shipmentId);
    
    res.json(labels);
});

module.exports = router; 