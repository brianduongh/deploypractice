import React from "react";
import { Router, Route } from "react-router-dom";
// import Navs from "./components/Nav"
import Dashboard1 from "./pages/Dashboard";
import ShowAccount from "./pages/Account";
import ShowProfile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from './pages/Login';
import history from './history';

function App() {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard1} />
        <Route exact path="/signout" component={Landing} />
        <Route path="/account/:id" component={ShowAccount} />
        <Route path="/profile" component={ShowProfile} />
      </div>
    </Router>
  );
}

export default App;
