import React from "react";
import styles from "./Admin.module.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Switch, Route, Link } from "react-router-dom";
import logoIcon from "../../../assets/icons/Logo.svg";
import Notes from "./Notes/Notes";
import AccountDetails from "./AccountDetails/AccountDetails";
import Birthdays from "./Birthdays/Birthdays";
import Accounts from "./Accounts/Accounts";
import AddAccount from "./AddAccount/AddAccount";


const Admin = () => {
    return (
        <div className={styles.admin}>
            <div className={styles.sidebar}>
                <div className={styles.logo__container}>
                    <img src={logoIcon} alt="logo" className={styles.logo} />
                </div>
                <Sidebar backgroundColor="transparent">
                    <Menu iconShape="square">
                        <MenuItem component={<Link to="/admin/accounts"/>}>Accounts</MenuItem>
                        <MenuItem component={<Link to="/admin/add-accounts"/>}>Add Accounts</MenuItem>
                        <MenuItem component={<Link to="/admin/notes"/>}>Notes</MenuItem>
                        <MenuItem component={<Link to="/admin/birthdays"/>}>Birthdays</MenuItem>
                        <MenuItem component={<Link to="/admin/account-details"/>}>Account Details</MenuItem>
                        <MenuItem component={<Link to="/logout"/>}>Logout</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route path="/admin/accounts">
                        <Accounts />
                    </Route>
                    <Route path="/admin/add-accounts">
                        <AddAccount />
                    </Route>
                    <Route path="/admin/notes">
                        <Notes />
                    </Route>
                    <Route path="/admin/birthdays">
                        <Birthdays />
                    </Route>
                    <Route path="/admin/account-details">
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

export default Admin;