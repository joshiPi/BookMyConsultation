import React, {useState} from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../common/header/Header";

const Controller = () => {
  const baseUrl = "/api/v1/";
  const [tab, setTab] = useState(0);
  return (
    <Router>
      <div className="main-container">
        <Header  tab={tab} setTab={setTab}/>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} tab={tab} setTab={setTab} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
