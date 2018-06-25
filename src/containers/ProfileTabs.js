import React, {Component} from 'react'
import * as constants from '../constants'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'

const ProfileTabsContainer = ({userId, userType, isAdmin, logout}) => {
  return (
    <div>
      <div hidden={isAdmin} className="nav nav-tabs">
        <li className="nav-item wbdv-nav-item ">
          <Link className="nav-link wbdv-nav-item" to={`/profile/${userType}/${userId}/account`}>
            Account</Link>
        </li>
        <li className="nav-item wbdv-nav-item">
          <Link className="nav-link wbdv-nav-item" to={`/profile/${userType}/${userId}/orders`}>
            Recent Orders</Link>
        </li>
        <li className="nav-item wbdv-nav-item"
            hidden={userType !== constants.RESTAURATEUR}>
          <Link className="nav-link wbdv-nav-item"
                to={`/profile/${userType}/${userId}/dishes`}>
            Edit Dishes</Link>
        </li>
        <li className="nav-item wbdv-nav-item"
            hidden={userType !== constants.RESTAURATEUR}>
          <Link className="nav-link wbdv-nav-item"
                to={`/profile/${userType}/${userId}/followers`}>
            Followers</Link>
        </li>
        <li className="nav-item wbdv-nav-item"
            hidden={userType !== constants.CUSTOMER}>
          <Link className="nav-link wbdv-nav-item"
                to={`/profile/${userType}/${userId}/favorite`}>
            Favorite List</Link>
        </li>
        <li className="nav-item wbdv-nav-item">
          <Link className="nav-link wbdv-nav-item"
                to='/login' onClick={() => logout()}>
            Logout</Link>
        </li>
      </div>

      <div hidden={!isAdmin} className="nav nav-tabs ">
        <li className="nav-item wbdv-nav-item ">
          <Link className="nav-link wbdv-nav-item" to={`/admin/profile/${userType}/${userId}/account`}>
            Account</Link>
        </li>
        <li className="nav-item wbdv-nav-item">
          <Link className="nav-link wbdv-nav-item" to={`/admin/profile/${userType}/${userId}/orders`}>
            Recent Orders</Link>
        </li>
        <li className="nav-item wbdv-nav-item"
            hidden={userType !== constants.RESTAURATEUR}>
          <Link className="nav-link wbdv-nav-item"
                to={`/admin/profile/${userType}/${userId}/dishes`}>
            Edit Dishes</Link>
        </li>
        <li className="nav-item wbdv-nav-item"
            hidden={userType !== constants.RESTAURATEUR}>
          <Link className="nav-link wbdv-nav-item"
                to={`/admin/profile/${userType}/${userId}/followers`}>
            Followers</Link>
        </li>
        <li className="nav-item wbdv-nav-item"
            hidden={userType !== constants.CUSTOMER}>
          <Link className="nav-link wbdv-nav-item"
                to={`/admin/profile/${userType}/${userId}/favorite`}>
            Favorite List</Link>
        </li>
      </div>
    </div>
  )
};

const stateToPropsMapper = (state, ownProps) => {
  return {
    userType: ownProps.userType,
    id: ownProps.id,
    isAdmin: ownProps.isAdmin
  }
};

const dispatcherToPropsMapper = dispatch => ({
  logout: () => actions.logout().then(this.props.history.push('/login'))
});

const ProfileTabs = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(ProfileTabsContainer);

export default ProfileTabs;