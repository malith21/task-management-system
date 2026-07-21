const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('📥 Login request received:', { email, password });
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Email and password are required' 
            });
        }
        
        const user = await User.findByEmail(email);
        console.log('👤 User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }
        
        const isValid = await User.validatePassword(password, user.password);
        console.log('✅ Password valid:', isValid);
        
        if (!isValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }
        
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('❌ Login Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Please try again later.' 
        });
    }
};

// Logout Controller
const logout = async (req, res) => {
    try {
        res.json({ 
            success: true,
            message: 'Logout successful' 
        });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Please try again later.' 
        });
    }
};

module.exports = { login, logout };