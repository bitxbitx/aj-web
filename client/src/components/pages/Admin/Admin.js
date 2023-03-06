import React from "react";
import styles from "./Admin.module.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Switch, Route, Link } from "react-router-dom";
import Notes from "./Notes/Notes";
import Me from "./Me/Me";
import Birthdays from "./Birthdays/Birthdays";
import Accounts from "./Accounts/Accounts";
import AddAccount from "./AddAccount/AddAccount";
import AccountDetails from "./Accounts/AccountDetails/AccountDetails";
import { useLogoutMutation } from "../../../feature/services/auth";

const Admin = () => {
    const [logout] = useLogoutMutation();
    return (
        <div className={styles.admin}>
            <div className={styles.sidebar}>
                <div className={styles.logo__container}>
                    <img src={'http://localhost:8000/file/assets/logo.svg'} alt="logo" className={styles.logo} />
                </div>
                <Sidebar backgroundColor="transparent">
                    <Menu iconShape="square">
                        <SubMenu label="Accounts">
                            <MenuItem component={<Link to="/admin/accounts" />}>All Accounts</MenuItem>
                            <MenuItem component={<Link to="/admin/add-accounts" />}>Add Account</MenuItem>
                        </SubMenu>
                        <MenuItem component={<Link to="/admin/notes" />}>Notes</MenuItem>
                        <MenuItem component={<Link to="/admin/birthdays" />}>Birthdays</MenuItem>
                        <MenuItem component={<Link to="/admin/me" />}>Account Details</MenuItem>
                        <MenuItem onClick={() => logout()}>Logout</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route path="/admin/accounts">
                        <Accounts />
                    </Route>
                    <Route path="/admin/account/:id">
                        <AccountDetails />
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
                    <Route path="/admin/me">
                        <Me />
                    </Route>
                    <Route path="/logout">
                        { 
                            }
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;