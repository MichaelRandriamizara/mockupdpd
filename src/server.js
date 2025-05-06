const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/shipment', require('./routes/shipment'));
app.use('/api/v1/labels', require('./routes/labels'));
app.use('/api/v1/lockers', require('./routes/lockers'));
app.use('/api/v1/services', require('./routes/services'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        type: err.type || 'about:blank',
        instance: req.originalUrl
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Not Found',
        type: 'about:blank',
        instance: req.originalUrl
    });
});

app.listen(port, () => {
    console.log(`DPD API Mockup server running on port ${port}`);
}); 