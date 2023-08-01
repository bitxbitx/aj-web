import React from "react";
import styles from "./NoteList.module.css";
import { useGetNotesQuery } from "../../../../../feature/services/note";
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import Loading from "../../../../common/Loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import DeleteNoteButton from "./DeleteNoteButton/DeleteNoteButton";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function NoteList() {
  const history = useHistory();

  // GraphQL query to fetch notes
  const { data, loading, error } = useGetNotesQuery();

  const handleEdit = (id) => {
    history.push(`/admin/notes/update/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        message="Error"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    );
  }

  console.log("data", data)

  return (
    <TableContainer className={styles.container}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.header}>
          <TableCell>Note No</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Method</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Platform</TableCell>
          <TableCell>Account</TableCell> {/* Add the table header for account */}
          <TableCell>Remark</TableCell> {/* Add the table header for remark */}
          <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          {data?.map((note) => (
            <TableRow className={styles.row} key={note._id}>
              <TableCell>{note.noteNo}</TableCell>
              <TableCell>{note.amount}</TableCell>
              <TableCell>{note.method}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" href={'http://localhost:8000/file/notes' + note.image} target="_blank" > View Image </Button>
              </TableCell>
              <TableCell>{note.status}</TableCell>
              <TableCell>{note.platform}</TableCell>
              <TableCell>{note.account}</TableCell> {/* Display account username */}
              <TableCell>{note.remark}</TableCell> {/* Display remark */}
              <TableCell>
                <Box className={styles.actions}>
                  {/* Approve Button */}
                  <IconButton
                    onClick={() => handleEdit(note._id)}
                    aria-label="edit"
                    size="large"
                  >
                    <CheckCircleIcon /> <Typography>Approve</Typography>
                  </IconButton>
                  {/* Reject Button */}
                  <IconButton
                    onClick={() => handleEdit(note._id)}
                    aria-label="edit"
                    size="large"
                  >
                    <CancelIcon /> <Typography>Reject</Typography>
                  </IconButton>
                  <DeleteNoteButton id={note._id} /> {/* Use the DeleteNoteButton component */}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
