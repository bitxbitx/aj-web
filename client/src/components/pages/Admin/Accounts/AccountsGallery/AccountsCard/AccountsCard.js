import React from "react";
import styles from "./AccountsCard.module.css";
import Button from "../../../../../common/Button/Button";
import { useHistory } from "react-router-dom";

const AccountsCard = (props) => {
    const history = useHistory();

    const handleClick = () => {
        console.log("clicked");
        history.push(`/admin/accounts/${props.id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card} onClick={handleClick}>
                <div className={styles.left__container}>
                    <p className={styles.username}>ID: {props.username}</p>
                    <p className={styles.balance}>Balance: {props.totalbalance}</p>
                </div>
            </div>
        </div>
    );
}

export default AccountsCard;