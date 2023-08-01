import {
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import { useGetTransactionsQuery } from "../../../../../feature/services/transactions"; // Assuming you have useGetTransactionsQuery
import Loading from "../../../../common/Loading/Loading";
import styles from "./TransactionList.module.css";

export default function TransactionList() {
  const { data, error, isLoading } = useGetTransactionsQuery(); // Update to useGetTransactionsQuery

  console.log(data)

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
            <TableCell>Platform</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
          </TableHead>
          <TableBody>
            {data.transactions.map((transaction) => (
              <TableRow className={styles.row} key={transaction._id}>
                <TableCell>{transaction.account.username}</TableCell>
                <TableCell>{transaction.platform}</TableCell>
                <TableCell>{transaction.createdAt.substring(0, 10)}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
