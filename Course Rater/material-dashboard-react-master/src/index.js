/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import RTL from "layouts/RTL.js";
import Login from "layouts/Login";
import FeedbackForm from "components/form/FeedBackForm";
import Search from "views/Search/Search";
import CourseDashboard from "views/Dashboard/CourseDashboard";
import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/register" component={Auth} />
      <Route path="/login" component={Login} />
      {/* <Route path="/rtl" component={RTL} />
			<Route path="/form" component={FeedbackForm} /> */}
      <Route path="/search" component={Search} />
      {/* <Route path="/coursedashboard" component={CourseDashboard} /> */}

      <Redirect from="/" to="/admin/cdashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
