const asyncHandler = require("express-async-handler");
const Note = require("../models/note.model");
const Transaction = require("../models/transaction.model");
const Account = require("../models/account.model");
/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management
 * components:
 *  schemas:
 *    Note:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the note.
 *          example: 613ed437df82d52f31cc9a1c
 *        title:
 *          type: string
 *          description: The title of the note.
 *          example: My Note
 *        content:
 *          type: string
 *          description: The content of the note.
 *          example: This is the content of my note.
 *        account:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: The ID of the associated account.
 *              example: 613ed437df82d52f31cc9a1d
 *            name:
 *              type: string
 *              description: The name of the associated account.
 *              example: John Doe
 *            email:
 *              type: string
 *              description: The email of the associated account.
 *              example: john.doe@example.com
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       '500':
 *         description: Internal server error
 */
const getNotes = asyncHandler(async (req, res) => {
  try {
    const notes = (await Note.find({}).populate("account")) || [];
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal server error
 */
const getNoteById = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("account");
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       '201':
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       '400':
 *         description: Bad request
 */
const createNote = asyncHandler(async (req, res) => {
  try {
    const note = new Note(req.body);
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       '200':
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal server error
 */
const updateNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(req.body);
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note
 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Note removed
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal server error
 */
const deleteNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      await note.remove();
      res.json({ message: "Note removed" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/notes/{id}/approve:
 *   patch:
 *     summary: Approve a note and update account balance
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to approve
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Note approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Note approved"
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Note not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */
const approveNote = asyncHandler(async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            // Update note
            note.status = "approved";
            await note.save();

            // Update account balance
            const account = await Account.findById(note.account);
            // Look for the platformAccount that matches the note platform
            const platformAccount = account.platformAccounts.find(
                (platformAccount) => platformAccount.platform === note.platform
            );
            // Update the balance of the platformAccount
            platformAccount.balance += note.amount;
            await account.save();
            

            // Create transaction
            const transaction = new Transaction({
                account: note.account,
                platform: note.platform,
                amount: note.amount,
                type: "deposit",
                status: "completed",
                remark: "Deposit from note",
            });
            await transaction.save();

            res.json({ message: "Note approved" });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  approveNote,
};
