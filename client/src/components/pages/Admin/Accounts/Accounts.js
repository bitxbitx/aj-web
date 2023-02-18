import React from "react";
import styles from "./Accounts.module.css";
import { useGetAccountsQuery } from "../../../../feature/services/accounts";
import AccountsGallery from "./AccountsGallery/AccountsGallery";
import BounceLoader from "react-spinners/BounceLoader";


// TODO - Implement search bar

const Accounts = () => {
    const { data, error, isLoading } = useGetAccountsQuery();
    console.log("data", data);
    return (
        <div className={styles.account}>
            <h1>Account</h1>

            <div className={styles.toolbar}>
                <div className={styles.toolbar__left}>
                    <h1>Toolbar Left</h1>
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