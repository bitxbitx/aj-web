const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({}).populate('account') || [];

    res.json(notes);
});


// @desc    Get note by ID
// @route   GET /api/notes/:id
// @access  Public
const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        res.json(note);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
    if (req.body.amount && req.body.method && req.file.filename) {
        console.log("req.body", req.body);
        const note = new Note({
            amount: req.body.amount,
            method: req.body.method,
            image: req.file.filename,
            status: "pending",
            account: req.userId,
        });

        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } else {
        res.status(400);
        throw new Error('Invalid note data');
    }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        note.amount = req.body.amount || note.amount;
        note.method = req.body.method || note.method;
        note.image = req.body.image || note.image;
        note.status = req.body.status || note.status;
        note.account = req.body.account || note.account;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        await note.remove();
        res.json({ message: 'Note removed' });
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
};
