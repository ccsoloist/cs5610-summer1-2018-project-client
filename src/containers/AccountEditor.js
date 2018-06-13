import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'

const AccountEditorContainer = ({userType}) => {
  return (
    <div className="account-editor-container">
      <form className="account-editor">

        <div className="form-group">
          <label>Username</label>
          <input className="form-control"
                 placeholder="Username"/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password"
                 className="form-control"
                 placeholder="Password"/>
        </div>


        <div className="form-group">
          <label>Restaurant Name</label>
          <input type="text"
                 className="form-control"
                 placeholder="Restaurant Name"/>
        </div>

        <div className="form-group row">
          <div className="col">
            <label>First Name</label>
            <input type="text"
                   className="form-control"
                   placeholder="First name"/>
          </div>
          <div className="col">
            <label>Last Name</label>
            <input type="text"
                   className="form-control"
                   placeholder="Last name"/>
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input className="form-control"
                 placeholder="Enter email"/>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input className="form-control"
                 placeholder="Enter phone"/>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input className="form-control"
                 placeholder="Enter address"/>
        </div>

        <div className="form-group">
          <div className="col-12">
            <button type="button"
                    className="form-control btn btn-primary"
            >Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};

const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({});

const AccountEditorConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(AccountEditorContainer);

const store = createStore(reducer);

const AccountEditor = state => (
  <Provider store={store}>
    <AccountEditorConnected/>
  </Provider>
);

export default AccountEditor;