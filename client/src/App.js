import "./App.css";
import Landing from "./components/pages/Landing/Landing";
import Admin from "./components/pages/Admin/Admin";
import Customer from "./components/pages/Customer/Customer";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Switch>
      {/* <Route path="/"><Landing /></Route> */}
      <Route path="/"><Admin /></Route>
      <Route path="/admin"><Admin /></Route>
      <Route path="/customer"><Customer /></Route>
      {/* <ProtectedRoute path="/admin"><Admin /></ProtectedRoute>
      <ProtectedRoute path="/customer"><Customer /></ProtectedRoute> */}
    </Switch>
  );
}

export default App;
