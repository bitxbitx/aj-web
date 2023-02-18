import React, { useState } from "react";
import styles from "./Birthdays.module.css";
import { Calendar } from "react-calendar";
import { useGetAccountsQuery } from "../../../../feature/services/accounts";
import 'react-calendar/dist/Calendar.css';

const Birthdays = () => {
    // const { data, isLoading } = useGetAccountsQuery();

    const [ date, setDate ] = useState(new Date());

    const onChange = (date) => {
        setDate(date);
        console.log(date)
    }
    const tempData = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            birthdate: "2021-09-01",
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
            birthdate: "2023-02-01",
        },
        {
            id: 3,
            firstName: "John",
            lastName: "Smith",
            birthdate: "2021-09-04",
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.calendar__container}>
                <Calendar  
                    value = {date}
                    onChange = {onChange}
                    className={styles.calendar}
                    tileClassName={({ date, view }) => {
                        if (view === 'month') {
                            // Check if a date React-Calendar wants to check is on the list of dates to add class to
                            const found = tempData.find((account) => {
                                const accountDate = new Date(account.birthdate);
                                return accountDate.getDate() === date.getDate() && accountDate.getMonth() === date.getMonth();
                            });
                            if (found) {
                                return styles.birthday;
                            }
                        }
                    }}
                />
            </div>

            <div className={styles.birthdays__container}>
                {/* {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {data.map((account) => (
                            <li key={account.id}>
                                {account.firstName} {account.lastName}
                            </li>
                        ))}
                    </ul>
                )} */}

                <ul>
                    {tempData.map((account) => (
                        <li key={account.id}>
                            {account.firstName} {account.lastName}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default Birthdays;