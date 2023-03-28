import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, Route, Switch } from "react-router-dom";
import { useLogoutMutation } from "../../../feature/services/auth";
import AccountDetails from "./Accounts/AccountDetails/AccountDetails";
import Accounts from "./Accounts/Accounts";
import AddAccount from "./AddAccount/AddAccount";
import AddResult from "./AddResult/AddResult";
import styles from "./Admin.module.css";
import Birthdays from "./Birthdays/Birthdays";
import Me from "./Me/Me";
import Notes from "./Notes/Notes";
import Platforms from "./Platforms/Platforms";
import ResultDetails from "./Results/ResultDetails/ResultDetails";
import Results from "./Results/Results";

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
                        <SubMenu label="Results">
                            <MenuItem component={<Link to="/admin/results" />}>All Results</MenuItem>
                            <MenuItem component={<Link to="/admin/add-result" />}>Add Result</MenuItem>
                        </SubMenu>
                        <MenuItem component={<Link to="/admin/notes" />}>Notes</MenuItem>
                        <MenuItem component={<Link to="/admin/platforms" />}>Platforms</MenuItem>
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
                    <Route path="/admin/results">
                        <Results />
                    </Route>
                    <Route path="/admin/add-result">
                        <AddResult />
                    </Route>
                    <Route path="/admin/result/:id">
                        <ResultDetails />
                    </Route>                    
                    <Route path="/admin/notes">
                        <Notes />
                    </Route>
                    <Route path="/admin/platforms">
                        <Platforms />
                    </Route>
                    <Route path="/admin/add-result">
                        <AddResult />
                    </Route>
                    <Route path="/admin/birthdays">
                        <Birthdays />
                    </Route>
                    <Route path="/admin/me">
                        <Me />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;