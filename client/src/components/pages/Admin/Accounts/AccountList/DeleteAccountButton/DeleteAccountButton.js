import React, { useState } from "react";
import { useDeleteAccountMutation } from "../../../../../../feature/services/accounts";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteAccountButton({ id }) {
  const [confirmed, setConfirmed] = useState(false);
  const [deleteAccount, { isLoading, error }] = useDeleteAccountMutation();

  const handleDelete = () => {
    setConfirmed(true);
  };

  const handleConfirm = () => {
    deleteAccount(id);
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
