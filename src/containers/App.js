import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import RestaurantGrid from './RestaurantGrid'
import ProfileEditor from './ProfileEditor'

export default class App extends Component {
  render = () => (
    <Router>
      <Switch className="container-fluid">
        {/*<Route path="/home" component={RestaurantGrid}/>*/}
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/profile" component={ProfileEditor}/>
      </Switch>
    </Router>
  )
}