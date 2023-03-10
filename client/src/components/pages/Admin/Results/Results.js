import React from "react";
import styles from "./Results.module.css";
import { useGetResultsQuery } from "../../../../feature/services/results";
import ResultsGallery from "./ResultsGallery/ResultsGallery";
import BounceLoader from "react-spinners/BounceLoader";
import Button from "../../../common/Button/Button";
import { useHistory, useParams } from "react-router-dom";

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
                            return el.amount.match(new RegExp(searchVal, "i"))
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