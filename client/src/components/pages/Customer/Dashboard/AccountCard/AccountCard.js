import React from "react";
import styles from "./AccountCard.module.css";


const AccountCard = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon__container}>
                <img src={`http://localhost:8000/file/assets/${props.platform.icon}`} alt={props.platform.name} className={styles.icon} />
            </div>
            <div className={styles.balance__container}>
                <p className={styles.balance}>Balance: {props.balance >= 0 ? '+' : '-'}{Math.abs(props.balance)}</p>
                <p className={styles.balance}>B:{props.baki >= 0 ? '+' : '-'}{Math.abs(props.baki)}</p>
            </div>
        </div>
    );
}

export default AccountCard;

