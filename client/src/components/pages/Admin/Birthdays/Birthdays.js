import React, { useState } from "react";
import styles from "./Birthdays.module.css";
import { Calendar } from "react-calendar";
import { useGetAccountsQuery } from "../../../../feature/services/accounts";
import 'react-calendar/dist/Calendar.css';
import BounceLoader from "react-spinners/BounceLoader";
import CakeIcon from '@mui/icons-material/Cake';

const Birthdays = () => {
    const { data, isLoading } = useGetAccountsQuery();

    const [date, setDate] = useState(new Date());

    const onChange = (date) => {
        setDate(date);
        console.log(date)
    }

    console.log("data", data)

    return (
        <>
            {isLoading ? (
                <div className={styles.loading}>
                    <BounceLoader color={"#fca311"} loading={isLoading} size={150} />
                </div>
            ) : (
                <div className={styles.container}>
                    <h1>Birthdays</h1>
                    <div className={styles.calendar}>
                        <Calendar
                            className={styles.calendar__container}
                            value={date}
                            onChange={onChange}
                            tileClassName={({ date, view }) => {
                                if (view === 'month') {
                                    // Check if a date React-Calendar wants to check is on the list of dates to add class to
                                    const found = data.accounts.find((account) => {
                                        const accountDate = new Date(account.birthday);
                                        return accountDate.getDate() === date.getDate() && accountDate.getMonth() === date.getMonth();
                                    });
                                    if (found) {
                                        return styles.birthday;
                                    }
                                }
                            }}
                        />
                    </div>
                    
                    <h2>Birthdays for {date.toLocaleDateString()}</h2>
                    <div className={styles.birthday__container}>
                            {
                                /* Check if the birthday is selected then map */
                                data.accounts.map((account) => {
                                    const accountDate = new Date(account.birthday);
                                    if (accountDate.getDate() === date.getDate() && accountDate.getMonth() === date.getMonth()) {
                                        return (
                                            <div className={styles.birthday__card} key={account._id}>
                                                <CakeIcon className={styles.birthday__icon} />
                                                <h2>{account.username}</h2>
                                            </div>
                                        )
                                    }
                                    return null;
                                })
                            }
                    </div>
                </div>
            )}


        </>
    );
}

export default Birthdays;