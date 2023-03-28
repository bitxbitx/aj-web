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
    const note = await Note.findById(req.params.id).populate('account');

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

        /* Finding the account that is associated with the note. */
        const account = await Account.findById(note.account).populate('platformAccounts.platform');

        // if approved, update account and platformAccounts affected 
        if (req.body.status === "approved") {     
                   
            // Loop through the platformAccounts array to deduct the amount from the platformAccounts if balance is enough
            let totalAmountToDeduct = note.amount;
            for (let i = 0; i < account.platformAccounts.length; i++) {
                if (totalAmountToDeduct > 0) {
                    if (account.platformAccounts[i].balance >= totalAmountToDeduct) {
                        account.platformAccounts[i].balance -= totalAmountToDeduct;
                        totalAmountToDeduct = 0;
                    } else {
                        totalAmountToDeduct -= account.platformAccounts[i].balance;
                        account.platformAccounts[i].balance = 0;
                    }
                }
            }

            account.totalbalance -= note.amount;
            note.remark = "Approved by admin";
            await account.save();
        }

        // If rejected, add remark
        if (req.body.status === "rejected") {
            note.remark = "Rejected by admin";
        }

        /* A way to update the note. If the req.body.amount is not null, then it will update the
        note.amount to the req.body.amount. If the req.body.amount is null, then it will update the
        note.amount to the note.amount. */        
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
