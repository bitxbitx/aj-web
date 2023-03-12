import React from "react";
import styles from "./ResultsCard.module.css";
import { useHistory } from "react-router-dom";

/*
    result: {
        "_id":"640cc7c148be832e330f0de0",
        "amount":123123,
        "account":"63ee9394dc31961cdef23096",
        "platform":"63dcba4bcced8bfe1f0d7809",
        "createdAt":"2023-03-11T18:26:09.064Z",
        "updatedAt":"2023-03-11T18:26:09.064Z",
        "resultNo":6
    },
*/

const ResultsCard = (props) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/admin/result/${props.id}`);
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.card__header}>
                <div className={styles.card__header__left}>
                    <h2 className={styles.card__header__title}>Result No</h2>
                    <h2 className={styles.card__header__value}>{props.resultNo}</h2>
                </div>
                <div className={styles.card__header__right}>
                    <h2 className={styles.card__header__title}>Amount</h2>
                    <h2 className={styles.card__header__value}>{props.amount}</h2>
                </div>
            </div>
            <div className={styles.card__body}>
                <h3 className={styles.card__body__value}>Account: {props.account.username}</h3>
                <h3 className={styles.card__body__value}>Platform: {props.platform.name}</h3>
            </div>
        </div>
    );
}

export default ResultsCard;