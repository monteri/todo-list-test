import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import TaskView from "../pages/TaskView";


class Router extends React.Component{
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/tasks/:id" component={TaskView} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default Router;