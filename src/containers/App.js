import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import RestaurantGrid from './RestaurantGrid'
import ProfileEditor from './ProfileEditor'
import RestaurantViewer from "./RestaurantViewer";
import Home from "./Home";
import AdminPage from "./AdminPage";

export default class App extends Component {
  render = () => (
    <Router>
      <Switch className="container-fluid">
        <Route exact path="/" component={Home}/>
        <Route path="/restaurant/:yelpId" component={RestaurantViewer}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/profile/:userType/:userId" component={ProfileEditor}/>
        <Route exact path="/admin" component={AdminPage}/>
        <Route path="/admin/profile/:userType/:userId" component={ProfileEditor}/>
      </Switch>
    </Router>
  )
}