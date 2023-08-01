import React from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReLoginSVG from "../../../assets/img/relogin.svg";
import UnauthorizedSVG from "../../../assets/img/unauthorized.svg";
import styles from "./ProtectedRoute.module.css";
import Button from "../Button/Button";

const ProtectedRoute = ({ children, ...rest }) => {
  const history = useHistory();
  const permittedRoles = rest["permitted-roles"] || [];
  const authToken = localStorage.getItem("authToken");

  return (
    <Route
      {...rest}
      render={({ location }) =>
         authToken ? (
          permittedRoles.length === 0 ||
          permittedRoles.includes("admin") ? (
            children
          ) : (
            <div className={styles.container}>
              <img src={UnauthorizedSVG} alt="unauthorized" />
              <p>Not authorized</p>
              <Button onClick={() => history.push("/")} label="Back" />
            </div>
          )
        ) : (
          <div className={styles.container}>
            <img src={ReLoginSVG} alt="re-login" />
            <p>You need to login to view this page</p>
            <Button onClick={() => history.push("/")} label="Login" />
          </div>
        )
      }
    />
  );
};

export default ProtectedRoute;
