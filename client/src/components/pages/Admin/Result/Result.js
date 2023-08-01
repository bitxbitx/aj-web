import React from "react";
import ContentTopBar from "../../../common/ContentTopBar/ContentTopBar";
import { Route, Switch } from "react-router-dom";
import ResultSubmitForm from "./ResultSubmitForm/ResultSubmitForm";

export default function Result() {
  return (
    <>
      <ContentTopBar title="Result" redirectLink="/admin/result/update" showButton={false} />
      <Switch>
        <Route path="/admin/result" exact component={ResultSubmitForm} />
      </Switch>
    </>
  );
}
