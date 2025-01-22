import * as noteService from '../services/note.service.js';

export const addNote = async (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const newNote = await noteService.createNote({
            title,
            content,
            tags: tags || [],
            userId: req.userData.userId,
        });

        res.json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editNote = async (req, res) => {
    const { title, content, tags, isPinned } = req.body;
    const { noteId } = req.params;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const note = await noteService.findNoteById(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.userId !== req.userData.userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this note' });
        }

        const updatedNote = await noteService.updateNote(noteId, {
            title,
            content,
            tags: tags || [],
            isPinned: isPinned || false,
        });

        res.json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const notes = await noteService.findAllNotesByUser(req.userData.userId);
        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await noteService.findNoteById(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.userId !== req.userData.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this note' });
        }

        await noteService.deleteNoteById(noteId);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const pinNote = async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await noteService.findNoteById(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.userId !== req.userData.userId) {
            return res.status(403).json({ message: 'You are not authorized to pin this note' });
        }

        const updatedNote = await noteService.updateNote(noteId, { isPinned: !note.isPinned });

        res.json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchNotes = async (req, res) => {
    const { query } = req.query;

    try {
        const notes = await noteService.searchNotes(req.userData.userId, query);
        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
