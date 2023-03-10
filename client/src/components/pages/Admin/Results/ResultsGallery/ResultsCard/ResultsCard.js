import React from "react";
import styles from "./ResultsCard.module.css";
import { useHistory } from "react-router-dom";

const ResultsCard = (props) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/admin/results/${props.id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card} onClick={handleClick}>
                <div className={styles.left__container}>
                    <p className={styles.amount}>Amount: {props.amount}</p>
                    <p className={styles.account}>Account: {props.account}</p>
                    <p className={styles.platform}>Platform: {props.platform}</p>
                </div>
            </div>
        </div>
    );
}

export default ResultsCard;