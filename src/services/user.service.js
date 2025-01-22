import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    return await newUser.save();
};

export const generateToken = (userId) => {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const findUserById = async (userId) => {
    return await User.findById(userId).select('-password');
};
