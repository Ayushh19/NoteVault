import * as userService from '../services/user.service.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await userService.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await userService.createUser({ name, email, password });
        const token = userService.generateToken(newUser._id);

        res.json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await userService.findUserByEmail(email);

        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await userService.verifyPassword(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = userService.generateToken(existingUser._id);

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userService.findUserById(req.userData.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
