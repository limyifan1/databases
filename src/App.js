import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Components from "./Components";

function App() {
  return (
    <div className="App">
      <Router>
        <Components.Menu />
        <div className="App">
          <Route exact path="/" component={Components.Home} />
          <Route exact path="/login" component={Components.Login} />
          <Route exact path="/logout" component={Components.Logout} />
          <Route exact path="/profile" component={Components.Profile} />
          <Route exact path="/create" component={Components.CreateUniversityMember} />
          <script src="/__/firebase/7.14.1/firebase-app.js"></script>
          <script src="/__/firebase/7.14.1/firebase-analytics.js"></script>
          <script src="/__/firebase/init.js"></script>
        </div>
      </Router>
    </div>
  );
}

export default App;
