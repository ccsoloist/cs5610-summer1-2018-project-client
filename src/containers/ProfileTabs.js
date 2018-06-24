import React, {Component} from 'react'
import * as constants from '../constants'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'

const ProfileTabsContainer = ({userId, userType, isAdmin}) => {
  return (
    <div>
      <div hidden={isAdmin} className="nav nav-tabs ">
        <li className="nav-item wbdv-nav-item ">
          <Link className="nav-link wbdv-nav-item" to={`/profile/${userType}/${userId}/account`}>
            My Account</Link>
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
      </div>
      <div hidden={!isAdmin} className="nav nav-tabs ">
        <li className="nav-item wbdv-nav-item ">
          <Link className="nav-link wbdv-nav-item" to={`/admin/profile/${userType}/${userId}/account`}>
            My Account</Link>
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
      </div>
    </div>

    // {/*<div className="profile-tabs-container form-group row">*/}
    //   {/*<div className="profile-tabs">*/}
    //     {/*<div className="row">*/}
    //       {/*<li className="list-group-item form-control">*/}
    //         {/*<Link to={`/profile/${userType}/${userId}/account`}>*/}
    //           {/*My Account</Link>*/}
    //       {/*</li>*/}
    //     {/*</div>*/}
    //     {/*<div className="row">*/}
    //       {/*<li className="list-group-item form-control">*/}
    //         {/*<Link to={`/profile/${userType}/${userId}/orders`}>*/}
    //           {/*Recent Orders</Link>*/}
    //       {/*</li>*/}
    //     {/*</div>*/}
    //     {/*<div className="row" hidden={userType !== constants.RESTAURATEUR}>*/}
    //       {/*<li className="list-group-item form-control">*/}
    //         {/*<Link to={`/profile/${userType}/${userId}/dishes`}>*/}
    //           {/*Edit Dishes</Link>*/}
    //       {/*</li>*/}
    //     {/*</div>*/}
    //   {/*</div>*/}
    // {/*</div>*/}
  )
};

const stateToPropsMapper = (state, ownProps) => {
  return {
    userType: ownProps.userType,
    id: ownProps.id,
    isAdmin: ownProps.isAdmin
  }
};

const dispatcherToPropsMapper = dispatch => ({});

const ProfileTabs = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(ProfileTabsContainer);

export default ProfileTabs;