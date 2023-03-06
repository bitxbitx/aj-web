import React from "react";
import styles from "./Customer.module.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import AccountDetails from "./AccountDetails/AccountDetails";   

/*
    Customer component
    Displays the customer dashboard
*/

const Customer = () => {
    
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.logo__container}>
                <img src={'http://localhost:8000/file/assets/logo.svg'} alt="logo" className={styles.logo} />
                </div>
                <Sidebar backgroundColor="transparent">
                    <Menu iconShape="square">
                        <MenuItem component={<Link to="/customer/dashboard"/>}>Dashboard</MenuItem>
                        <MenuItem component={<Link to="/customer/account-details"/>}>Account Details</MenuItem>
                        <MenuItem component={<Link to="/logout"/>}>Logout</MenuItem>
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
                    <Route path="/logout">
                        <h1>Logout</h1>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Customer;