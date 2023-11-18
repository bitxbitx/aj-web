import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, Route, Switch } from "react-router-dom";
import AccountDetails from "./AccountDetails/AccountDetails";
import styles from "./Customer.module.css";
import Dashboard from "./Dashboard/Dashboard";
import { useMediaQuery } from '@mui/material';
import MySideBar from "../../common/MySideBar/MySideBar";


/*
    Customer component
    Displays the customer dashboard
*/

const Customer = () => {

  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div className={styles.container}>
      {!isMobile && <MySideBar />}
      <div className={styles.content}>
        {isMobile && <MySideBar />}
        <Switch>
          <Route path="/customer/dashboard">
            <Dashboard />
          </Route>
          <Route path="/customer/me">
            <AccountDetails />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Customer;
