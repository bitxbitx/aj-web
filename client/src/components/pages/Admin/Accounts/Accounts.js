import React from "react";
import ContentTopBar from "../../../common/ContentTopBar/ContentTopBar";
import { Route, Switch } from "react-router-dom";
import AccountList from "./AccountList/AccountList";
import AccountUpdate from "./AccountUpdate/AccountUpdate";

export default function Accounts() {

  return (
    <>
      <ContentTopBar title="Accounts" redirectLink="/admin/accounts/update"/>
      <Switch>
        <Route path="/admin/accounts/update/:id?"> <AccountUpdate /> </Route>
        <Route path="/admin/accounts" exact> <AccountList/> </Route>
      </Switch>
    </>
  );
}