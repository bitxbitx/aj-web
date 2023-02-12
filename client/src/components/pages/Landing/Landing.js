import React from "react";
import styles from "./Landing.module.css";
import LoginForm from "./LoginForm/LoginForm";

const Landing = () => {
    return (
        <div className={styles.landing}>
            <div className={styles.landing__container}>
                <LoginForm />
            </div>
        </div>
    );
}

export default Landing;