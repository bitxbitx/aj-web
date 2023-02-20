import "./App.css";
import Landing from "./components/pages/Landing/Landing";
import Admin from "./components/pages/Admin/Admin";
import Customer from "./components/pages/Customer/Customer";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Switch>
      {/* <Route path="/"><Admin /></Route>
      <Route path="/admin"><Admin /></Route>
      <Route path="/customer"><Customer /></Route> */}

      <Route path="/" exact><Landing /></Route> 
      <ProtectedRoute path="/admin" permitted-roles={["admin","staff"]}><Admin /></ProtectedRoute>
      <ProtectedRoute path="/customer" premitted-roles={["customer"]}><Customer /></ProtectedRoute>
    </Switch>
  );
}

export default App;
