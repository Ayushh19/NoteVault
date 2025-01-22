import Note from '../models/note.js';

export const createNote = async (noteData) => {
    const newNote = new Note(noteData);
    return await newNote.save();
};

export const updateNote = async (noteId, updateData) => {
    return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
};

export const findNoteById = async (noteId) => {
    return await Note.findById(noteId);
};

export const findAllNotesByUser = async (userId) => {
    return await Note.find({ userId });
};

export const deleteNoteById = async (noteId) => {
    return await Note.findOneAndDelete({ _id: noteId });
};

export const searchNotes = async (userId, query) => {
    return await Note.find({
        userId,
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
            { tags: { $in: [query] } },
        ],
    });
};
