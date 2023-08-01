import React, { useState } from "react";
import { useDeleteNoteMutation } from "../../../../../../feature/services/note"; // Assuming you have the appropriate hook for note deletion
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteNoteButton({ id }) {
  const [confirmed, setConfirmed] = useState(false);
  const [deleteNote, { isLoading, error }] = useDeleteNoteMutation(); // Use the appropriate mutation hook for note deletion

  const handleDelete = () => {
    setConfirmed(true);
  };

  const handleConfirm = () => {
    deleteNote(id); // Call the appropriate mutation function to delete the note with the given id
  };

  if (confirmed) {
    return (
      <IconButton onClick={handleConfirm} color="error">
        <Typography>Confirm ?</Typography>
      </IconButton>
    );
  } else {
    return (
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    );
  }
}
