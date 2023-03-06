import React from "react";
import styles from "./Dashboard.module.css";
import { Divider } from '@mui/material';
import AccountCard from "./AccountCard/AccountCard";
import AddNoteForm from "./AddNoteForm/AddNoteForm";
import { useGetMeQuery } from "../../../../feature/services/auth";

// TODO: Re-Implement the AccountCard component

/*
    Dashboard component 
    Displays the customer dashboard

    props: {
        me: {
            _id: string,
            username: string,
            email: string,
            role: string,
            accounts: [
                {
                    _id: string,
                    balance: number,
                }
            ]
*/


const Dashboard = () => {
    const { data: me } = useGetMeQuery();
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                {/* {me?.accounts.map((account, index) => (
                    <AccountCard key={account._id} icon={icons[index]} balance={account.balance} />
                ))} */}
                {/* <AccountCard icon={peachIcon} balance={5000} />
                <AccountCard icon={mangoIcon} balance={5000} />
                <AccountCard icon={fruitIcon} balance={5000} /> */}
            </div>
            <Divider
                orientation="vertical"
                sx={{
                    borderRightWidth: "medium",
                    borderColor: "#484B6A1A",
                    borderRadius: "10px",
                }}
                flexItem
            />
            <div className={styles.column}>
                <h2 className={styles.notes__label}>Notes</h2>
                <AddNoteForm />
            </div>
        </div>
    );
}

export default Dashboard;