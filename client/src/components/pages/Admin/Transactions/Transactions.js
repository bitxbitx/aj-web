import React from "react";
import ContentTopBar from "../../../common/ContentTopBar/ContentTopBar";
import { Route, Switch } from "react-router-dom";
import TransactionList from "./TransactionList/TransactionList";

export default function Transactions() {
  return (
    <>
      <ContentTopBar title="Transactions" redirectLink="/admin/transactions/update" showButton={false} />
      <Switch>
        <Route path="/admin/transactions" exact component={TransactionList} />
      </Switch>
    </>
  );
}
