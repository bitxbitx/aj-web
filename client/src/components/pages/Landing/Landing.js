import React from "react";
import styles from "./Landing.module.css";
import LoginForm from "./LoginForm/LoginForm";
import { useGetMeQuery } from "../../../feature/services/auth";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  return (
    <>
      {authToken ? (
        history.push({
          pathname: `/${role === "customer" ? "customer" : "admin"}`,
        })
      ) : (
        <div className={styles.landing}>
          <div className={styles.landing__container}>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
