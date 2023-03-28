import { Divider } from '@mui/material';
import React from "react";
import { useGetMeQuery } from "../../../../feature/services/auth";
import AccountCard from "./AccountCard/AccountCard";
import AddNoteForm from "./AddNoteForm/AddNoteForm";
import styles from "./Dashboard.module.css";
import BounceLoader from 'react-spinners/BounceLoader';

/*
    Dashboard component 
    Displays the customer dashboard
*/


const Dashboard = () => {
    const { data, isLoading, isError } = useGetMeQuery();
    return (
        <>
            {isLoading ? (
                <div className={styles.loader}>
                    <BounceLoader color="#484B6A" />
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.column}>
                        {data.platformAccounts.map((account) => (
                            <AccountCard
                                key={account._id}
                                id={account._id}
                                balance={account.balance}
                                platform={account.platform}
                            />
                        ))}
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
            )}
        </>
    );
}

export default Dashboard;