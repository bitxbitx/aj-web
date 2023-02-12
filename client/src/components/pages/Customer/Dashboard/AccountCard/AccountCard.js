import React from "react";
import styles from "./AccountCard.module.css";


const AccountCard = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon__container}>
                <img src={props.icon} alt="icon" className={styles.icon} />
            </div>
            <div className={styles.balance__container}>
                <h2 className={styles.balance__label}>Balance</h2>
                <h2 className={styles.balance}>${props.balance}</h2>
            </div>
        </div>
    );
}

export default AccountCard;