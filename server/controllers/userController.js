const bcrypt = require('bcrypt');
const User = require('../models/user.model');

/**
 * Creates a new user with the given name, email, and password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The created user object.
 */
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: 'User already exists' });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  }
};

/**
 * Gets all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} An array of user objects.
 */
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

/**
 * Gets a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The user object.
 */
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user);
  }
};

/**
 * Updates a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated user object.
 */
exports.updateUserById = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
};

/**
 * Deletes a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.deleteUserById = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.sendStatus(204);
  }
};
