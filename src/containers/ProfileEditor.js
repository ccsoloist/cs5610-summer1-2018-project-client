import React, {Component} from 'react'
import * as constants from '../constants'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'
import ProfileTabs from './ProfileTabs'
import AccountEditor from './AccountEditor'
import OrderList from './OrderList'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


const ProfileEditorContainer = ({userType}) => {
  return (
    <Router>
      <div className="profile-editor-container">
        <div className="profile-editor form-group row container-fluid">
          <div className="col-4">
            <ProfileTabs userType={userType}/>
          </div>
          <div className="col-8">
            <Switch className="container-fluid">
              <Route path="/profile/account" component={AccountEditor}/>
              <Route path="/profile/orders" component={OrderList}/>
              {/*<Route path="/profile/dishes" component={DishList}/>*/}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
};

const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({});

const ProfileEditorConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(ProfileEditorContainer);

const store = createStore(reducer);

const ProfileEditor = state => (
  <Provider store={store}>
    <ProfileEditorConnected/>
  </Provider>
);

export default ProfileEditor;