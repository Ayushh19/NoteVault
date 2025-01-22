import express from 'express';
import { signup, login, getUser } from './controllers/user.controller.js';
import { addNote, editNote, getAllNotes, deleteNote, pinNote, searchNotes } from './controllers/note.controller.js';
import { authenticate } from './utils/jwt.js';

const router = express.Router();


router.post('/users/signup', signup);
router.post('/users/login', login);
router.get('/users/me', authenticate, getUser);

router.post('/notes', authenticate, addNote);
router.put('/notes/:noteId', authenticate, editNote);
router.get('/notes', authenticate, getAllNotes);
router.delete('/notes/:noteId', authenticate, deleteNote);
router.put('/notes/:noteId/pin', authenticate, pinNote);
router.get('/notes/search', authenticate, searchNotes);

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Notes App API' });
});

export default router;
