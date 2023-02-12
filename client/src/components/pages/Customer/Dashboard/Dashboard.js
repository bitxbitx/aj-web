import React from "react";
import styles from "./Dashboard.module.css";
import { Divider } from '@mui/material';
import AccountCard from "./AccountCard/AccountCard";
import fruitIcon from "../../../../assets/icons/Fruit.svg";
import mangoIcon from "../../../../assets/icons/Mango.svg";
import peachIcon from "../../../../assets/icons/Peach.svg";


const Dashboard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <AccountCard icon={peachIcon} balance={5000} />
                <AccountCard icon={mangoIcon} balance={5000} />
                <AccountCard icon={fruitIcon} balance={5000} />
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
                <div className={styles.card}>
                    <h2>Card 1</h2>
                </div>
                <div className={styles.card}>
                    <h2>Card 2</h2>
                </div>
                <div className={styles.card}>
                    <h2>Card 3</h2>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;