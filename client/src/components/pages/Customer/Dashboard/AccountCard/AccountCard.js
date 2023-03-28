import React from "react";
import styles from "./AccountCard.module.css";


const AccountCard = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon__container}>
            <img src={`http://localhost:8000/file/assets/${props.platform.icon}`} alt={props.platform.name} className={styles.icon}/>
            </div>
            <div className={styles.balance__container}>
                <h2 className={styles.balance__label}>Balance</h2>
                <h2 className={styles.balance}>${props.balance}</h2>
            </div>
        </div>
    );
}

export default AccountCard;