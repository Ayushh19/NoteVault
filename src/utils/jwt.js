import jwt from 'jsonwebtoken';
import config from '../config.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
};
