import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default class App extends Component {
    render = () => (
        <Router>
            <Switch className="container-fluid">
                <Route path="/login"
                       component={LoginForm}>
                </Route>
                <Route path="/register"
                       component={RegisterForm}>
                </Route>
                <Route path="/home"
                       component={RestaurantGrid}>
                </Route>
                <Route path="/profile"
                       component={ProfileEditor}>
                </Route>
            </Switch>
        </Router>
    )
}