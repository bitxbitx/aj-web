import React from "react";
import styles from "./AccountsGallery.module.css";
import AccountsCard from "./AccountsCard/AccountsCard";

const AccountsGallery = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.gallery}>
                {props.accounts.map((account) => (
                    console.log(account),
                    <AccountsCard
                        key={account._id}
                        id={account._id}
                        username={account.username}
                        totalbalance={account.totalbalance || 0}
                    />
                ))}


            </div>
        </div>
    );
}

export default AccountsGallery;