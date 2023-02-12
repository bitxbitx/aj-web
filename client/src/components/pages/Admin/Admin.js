import React from "react";
import styles from "./Admin.module.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { Switch, Route, Link } from "react-router-dom";

const Admin = () => {
    return (
        <div className={styles.admin}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>
                    <h1>Logo</h1>
                </div>
                <Sidebar backgroundColor="transparent">
                    <Menu iconShape="square">
                        <SubMenu label="Accounts" >
                            <MenuItem component={<Link to="/admin/accounts/papaya"/>}> Papaya </MenuItem>
                            <MenuItem component={<Link to="/admin/accounts/goji-berry"/>}> Goji Berries </MenuItem>
                            <MenuItem component={<Link to="/admin/accounts/mango"/>}> Mango </MenuItem>
                        </SubMenu>
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
                        <h1>Accounts</h1>
                    </Route>
                    <Route path="/admin/notes">
                        <h1>Notes</h1>
                    </Route>
                    <Route path="/admin/birthdays">
                        <h1>Birthdays</h1>
                    </Route>
                    <Route path="/admin/account-details">
                        <h1>Account Details</h1>
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