import React from 'react';
import RestaurantGrid from "./RestaurantGrid";
import {HashRouter, Route, Router} from "react-router-dom";
import Link from "react-router-dom/es/Link";
import RestaurantViewer from "./RestaurantViewer";

export default class Home
  extends React.Component {


  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={RestaurantGrid}></Route>
          {/*<Route exact path="/login" component={LoginForm}></Route>*/}
          {/*<Route exact path="/register" component={RegisterForm}></Route>*/}
          <Route exact path="/restaurant/:yelpId" component={RestaurantViewer}></Route>
        </div>
      </HashRouter>
    );
  }
}