import React from "react";
import styles from "./Accounts.module.css";
import { useGetAccountsQuery } from "../../../../feature/services/accounts";
import AccountsGallery from "./AccountsGallery/AccountsGallery";
import BounceLoader from "react-spinners/BounceLoader";
import Button from "../../../common/Button/Button";
import { useHistory } from "react-router-dom";

// TODO - Implement search bar

const Accounts = () => {
    const { data, error, isLoading } = useGetAccountsQuery();
    const history = useHistory();

    return (
        <div className={styles.account}>
            <div className={styles.toolbar}>
                <div className={styles.toolbar__left}>
                    <Button label="Add Account" onClick={()=>{
                        history.push("/admin/accounts/add");
                    }}/>
                </div>
                <div className={styles.toolbar__right}>
                    <h1>Toolbar Right</h1>
                </div>
            </div>

            <div className={styles.content}>
                {isLoading ? (
                    <div className={styles.loader}>
                        <BounceLoader color="#484B6A" />
                        </div>
                ) : (
                    <AccountsGallery accounts={data} />
                )}
                </div>
        </div>
    );
}

export default Accounts;