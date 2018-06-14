import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'

const ProfileTabItemComponent = ({}) => {
  return (
    <div>
      <h1>ProfileTab Item 1 </h1>
    </div>
  )
};

const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({});

const ProfileTabItemConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(ProfileTabItemComponent);

const store = createStore(reducer);

const ProfileTabItem = state => (
  <Provider store={store}>
    <ProfileTabItemConnected/>
  </Provider>
);

export default ProfileTabItem;