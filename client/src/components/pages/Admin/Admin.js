import { useMediaQuery } from '@mui/material';
import React from "react";
import { Route, Switch } from "react-router-dom";
import MySideBar from "../../common/MySideBar/MySideBar";
import Accounts from "./Accounts/Accounts";
import styles from "./Admin.module.css";
import Birthdays from "./Birthdays/Birthdays";
import Me from "./Me/Me";
import Notes from "./Notes/Notes";
import Transactions from './Transactions/Transactions';
import Result from './Result/Result';

const Admin = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <div className={styles.container}>
      {!isMobile && <MySideBar />}
      <div className={styles.content}>
        {isMobile && <MySideBar />}
        <Switch>
          <Route path="/admin/accounts">
            <Accounts />
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
          <Route path="/admin/transactions">
            <Transactions />
          </Route>
          <Route path="/admin/result">
            <Result />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
