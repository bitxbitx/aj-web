import React from "react";
import ContentTopBar from "../../../common/ContentTopBar/ContentTopBar";
import { Route, Switch } from "react-router-dom";
import NoteList from "./NoteList/NoteList"; // Adjust the import statement for NoteList
import NoteUpdate from "./NoteUpdate/NoteUpdate"; // Adjust the import statement for NoteUpdate

export default function Notes() {
  return (
    <>
      <ContentTopBar title="Notes" redirectLink="/admin/notes/update" showButton={false} /> {/* Adjust the title and redirect link */}
      <Switch>
        <Route path="/admin/notes/update/:id?"> <NoteUpdate /> </Route> {/* Adjust the route path */}
        <Route path="/admin/notes" exact> <NoteList /> </Route> {/* Adjust the route path */}
      </Switch>
    </>
  );
}
