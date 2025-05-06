const express = require('express');
const router = express.Router();

// Mock services data
const mockServices = [
    {
        id: 'S001',
        name: 'DPD Classic',
        alias: 'CLASSIC',
        type: 'Business',
        description: 'Standard delivery service',
        price: 5.99,
        currency: 'EUR',
        estimatedDeliveryTime: '2-3 business days',
        availableSizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 'S002',
        name: 'DPD Express',
        alias: 'EXPRESS',
        type: 'Business',
        description: 'Express delivery service',
        price: 12.99,
        currency: 'EUR',
        estimatedDeliveryTime: '1 business day',
        availableSizes: ['XS', 'S', 'M', 'L']
    },
    {
        id: 'S003',
        name: 'DPD Pudo',
        alias: 'PUDO',
        type: 'Pudo',
        description: 'Delivery to parcel locker',
        price: 3.99,
        currency: 'EUR',
        estimatedDeliveryTime: '2-4 business days',
        availableSizes: ['XS', 'S', 'M']
    }
];

// GET /api/v1/services
router.get('/', (req, res) => {
    const {
        countryFrom,
        countryTo,
        postalCodeFrom,
        postalCodeTo,
        serviceType,
        mainServiceName,
        mainServiceAlias,
        packageSize,
        payerCode,
        affiliateLinkedId
    } = req.query;

    // Validate required parameters
    if (!countryFrom || !countryTo) {
        return res.status(422).json({
            status: 'error',
            message: 'countryFrom and countryTo are required',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    // Filter services based on query parameters
    let filteredServices = [...mockServices];

    if (serviceType) {
        filteredServices = filteredServices.filter(
            service => service.type === serviceType
        );
    }

    if (mainServiceName) {
        filteredServices = filteredServices.filter(
            service => service.name.toLowerCase().includes(mainServiceName.toLowerCase())
        );
    }

    if (mainServiceAlias) {
        filteredServices = filteredServices.filter(
            service => service.alias === mainServiceAlias
        );
    }

    if (packageSize) {
        filteredServices = filteredServices.filter(
            service => service.availableSizes.includes(packageSize)
        );
    }

    // Mock price adjustment based on distance
    const adjustedServices = filteredServices.map(service => {
        const basePrice = service.price;
        let adjustedPrice = basePrice;

        // Adjust price based on countries
        if (countryFrom !== countryTo) {
            adjustedPrice *= 1.5; // 50% increase for international shipping
        }

        // Adjust price based on package size
        if (packageSize) {
            const sizeMultiplier = {
                'XS': 1,
                'S': 1.2,
                'M': 1.5,
                'L': 2,
                'XL': 2.5
            };
            adjustedPrice *= sizeMultiplier[packageSize];
        }

        return {
            ...service,
            price: parseFloat(adjustedPrice.toFixed(2))
        };
    });

    res.json(adjustedServices);
});

module.exports = router; 