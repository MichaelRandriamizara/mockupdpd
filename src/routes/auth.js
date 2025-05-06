const express = require('express');
const router = express.Router();

// Mock user data
const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    permissions: ['read', 'write']
};

// GET /api/v1/auth/me
router.get('/me', (req, res) => {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    // Mock token validation
    const token = authHeader.split(' ')[1];
    if (token !== 'mock-token') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    res.json(mockUser);
});

// POST /api/v1/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Mock validation
    if (email !== 'test@example.com' || password !== 'password') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials',
            type: 'about:blank',
            instance: req.originalUrl
        });
    }

    res.json({
        token: 'mock-token',
        user: mockUser
    });
});

module.exports = router; 