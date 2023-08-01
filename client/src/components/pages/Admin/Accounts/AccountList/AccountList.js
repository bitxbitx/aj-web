import React from "react";
import styles from "./AccountList.module.css";
import { useGetAccountsQuery } from "../../../../../feature/services/accounts";
import {
  Box,
  IconButton,
  Snackbar,
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
import DeleteAccountButton from "./DeleteAccountButton/DeleteAccountButton";

export default function AccountList() {
  const { data, error, isLoading } = useGetAccountsQuery();
  const history = useHistory();

  const handleEdit = (id) => {
    history.push(`/admin/accounts/update/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        message="Error"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    );
  } else {
    return (
      <TableContainer className={styles.container}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.header}>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Mango</TableCell>
            <TableCell>Peach</TableCell>
            <TableCell>Strawberry</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {data.accounts.map((account) => (
              <TableRow className={styles.row} key={account._id}>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell>{account.birthday?.substring(0, 10)}</TableCell>
                <TableCell>
                  {account.profit.balance} (B:{account.profit.baki})
                </TableCell>
                <TableCell>
                  {account.vboss.balance} (B:{account.vboss.baki})
                </TableCell>
                <TableCell>
                  {account.game.balance} (B:{account.game.baki})
                </TableCell>
                <TableCell>
                  <Box className={styles.actions}>
                    <IconButton onClick={() => handleEdit(account._id)}>
                      <EditIcon />
                    </IconButton>
                    {account.username !== "johndoe" && (
                      <DeleteAccountButton id={account._id} />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
