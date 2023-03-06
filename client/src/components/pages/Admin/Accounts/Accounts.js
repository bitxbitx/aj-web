import React from "react";
import styles from "./Accounts.module.css";
import { useGetAccountsQuery } from "../../../../feature/services/accounts";
import AccountsGallery from "./AccountsGallery/AccountsGallery";
import BounceLoader from "react-spinners/BounceLoader";
import Button from "../../../common/Button/Button";
import { useHistory, useParams } from "react-router-dom";

const Accounts = () => {
    const { data, error, isLoading } = useGetAccountsQuery();
    const history = useHistory();
    const [searchVal, setSearchVal] = React.useState("");

    return (
        <div className={styles.account}>
            <div className={styles.toolbar}>
                <div className={styles.toolbar__left}>
                    <Button label="Add Account" onClick={() => {
                        history.push("/admin/add-accounts");
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
                    <AccountsGallery accounts={data.filter((el) => {
                        if ( el ){
                            return el.username.match(new RegExp(searchVal, "i"))
                        }

                        return null;
                    })
                    } />
                )}
            </div>
        </div>
    );
}

export default Accounts;