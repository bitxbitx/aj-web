import React from "react";
import styles from "./Results.module.css";
import { useGetResultsQuery } from "../../../../feature/services/results";
import ResultsGallery from "./ResultsGallery/ResultsGallery";
import BounceLoader from "react-spinners/BounceLoader";
import Button from "../../../common/Button/Button";
import { useHistory, useParams } from "react-router-dom";

/*
    This component is responsible for displaying the results of the accounts.
    It uses the useGetResultsQuery hook to fetch the results from the database.
    It also uses the ResultsGallery component to display the results.

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

const Results = () => {
    const { data, error, isLoading } = useGetResultsQuery();
    const history = useHistory();
    const [searchVal, setSearchVal] = React.useState("");

    return (
        <div className={styles.result}>
            <div className={styles.toolbar}>
                <div className={styles.toolbar__left}>
                    <Button label="Add Result" onClick={() => {
                        history.push("/admin/add-result");
                    }} />
                </div>
                <div className={styles.toolbar__right}>
                    <input type="text" placeholder="Search" className={styles.searchBar} value={searchVal} onChange={(e) => {
                        setSearchVal(e.target.value);
                    }} />
                </div>
            </div>

            <div className={styles.content}>
                {isLoading ? (
                    <div className={styles.loader}>
                        <BounceLoader color="#484B6A" />
                    </div>
                ) : (
                    <ResultsGallery results={data.filter((el) => {
                        if ( el ){
                            return el.resultNo.toString().match(new RegExp(searchVal, "i"))
                        }

                        return null;
                    })
                    } />
                )}
            </div>
        </div>
    );
}

export default Results;