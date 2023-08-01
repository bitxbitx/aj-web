const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  approveNote,
} = require("../controllers/note.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/notes");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router
  .route("/")
  .get(getNotes)
  .post(protect, upload.single("image"), createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, upload.single("image"), updateNote)
  .delete(protect, deleteNote);
router.route("/:id/approve").patch(protect, approveNote);

module.exports = router;
