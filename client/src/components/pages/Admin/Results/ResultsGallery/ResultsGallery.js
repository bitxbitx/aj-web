import React from "react";
import styles from "./ResultsGallery.module.css";
import ResultsCard from "./ResultsCard/ResultsCard";

const ResultsGallery = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.gallery}>
                {props.results.map((result) => (
                    <ResultsCard
                        key={result._id}
                        id={result._id}
                        amount={result.amount}
                        account={result.account}
                        platform={result.platform}
                    />
                ))}
            </div>
        </div>
    );
}

export default ResultsGallery;