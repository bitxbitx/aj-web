import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, Route, Switch } from "react-router-dom";
import AccountDetails from "./AccountDetails/AccountDetails";
import styles from "./Customer.module.css";
import Dashboard from "./Dashboard/Dashboard";

/*
    Customer component
    Displays the customer dashboard
*/

const Customer = () => {
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    // bring user back to landing page
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logo__container}>
          <img
            src={"http://localhost:8000/file/assets/logo.svg"}
            alt="logo"
            className={styles.logo}
          />
        </div>
        <Sidebar backgroundColor="transparent">
          <Menu iconShape="square">
            <MenuItem component={<Link to="/customer/dashboard" />}>
              Dashboard
            </MenuItem>
            <MenuItem component={<Link to="/customer/account-details" />}>
              Account Details
            </MenuItem>
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className={styles.content}>
        <Switch>
          <Route path="/customer/dashboard">
            <Dashboard />
          </Route>
          <Route path="/customer/account-details">
            <AccountDetails />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Customer;
