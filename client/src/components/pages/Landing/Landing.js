import React from "react";
import styles from "./Landing.module.css";
import LoginForm from "./LoginForm/LoginForm";
import { useIsLoggedInQuery } from "../../../feature/services/auth";
import { useHistory } from "react-router-dom";

/*
    TODO: Fix this error:
    Warning: Cannot update during an existing state transition (such as within `render`). 
    Render methods should be a pure function of props and state.
*/

const Landing = () => {
    const { data } = useIsLoggedInQuery();
    const isLoggedIn = data?.isLoggedIn || false;
    const role = data?.role || "";
    const history = useHistory();
    return (
        <>
            {
                isLoggedIn ? (
                    history.push({
                        pathname: `/${role === "customer" ? "customer" : "admin"}`
                    })

                ) : (
                    <div className={styles.landing}>
                        <div className={styles.landing__container}>
                            <LoginForm />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Landing;