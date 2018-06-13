import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'
// import ProfileTabItem from "../components/ProfileTabItem"

const ProfileTabsContainer = ({userId, userType}) => {
  return (
    <div className="profile-tabs-container form-group row">
      <div className="profile-tabs">
        <div className="row">
          <li className="list-group-item form-control">
            {/*<Link to={`/profile/${userType}/${userId}/account`}>*/}
            <Link to={`/profile/account`}>
              My Account</Link>
          </li>
        </div>
        <div className="row">
          <li className="list-group-item form-control">
            {/*<Link to={`/profile/${userType}/${userId}/orders`}>*/}
            <Link to={`/profile/orders`}>
              Recent Orders</Link>
          </li>
        </div>
        <div className="row">
          <li className="list-group-item form-control">
            {/*<Link to={`/profile/${userType}/${userId}/dishes`}>*/}
            <Link to={`/profile/dishes`}>
              Edit Dishes</Link>
          </li>
        </div>
      </div>
    </div>
  )
};

const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({});

const ProfileTabsConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(ProfileTabsContainer);

const store = createStore(reducer);

const ProfileTabs = state => (
  <Provider store={store}>
    <ProfileTabsConnected/>
  </Provider>
);

export default ProfileTabs;