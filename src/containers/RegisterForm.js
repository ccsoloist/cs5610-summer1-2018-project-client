import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import * as actions from '../actions'
import '../styles/index.css'

const RegisterFormContainer = ({userType, typeChanged}) => {
  let select;
  return (
    <div className="register-form-container">
      <form className="register-form">
        <div className=" form-group row">
          <div className="col">
            <div className="form-group">
              <label>User Type</label>
              <select
                className="form-control"
                onChange={() => typeChanged(select.value)}
                value={userType}
                ref={node => select = node}>
                <option value={constants.CUSTOMER}>{constants.CUSTOMER}</option>
                <option value={constants.RESTAURATEUR}>
                  {constants.RESTAURATEUR}</option>
                <option value={constants.DELIVERER}>{constants.DELIVERER}</option>
              </select>
            </div>

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
              <label>Confirm</label>
              <input type="password"
                     className="form-control"
                     placeholder="Confirm Password"/>
            </div>
          </div>
          <div className="col">
            <div className="form-group"
                 hidden={userType !== constants.RESTAURATEUR}>
              <label>Restaurant Name</label>
              <div className="form-group row">
                <div className="col-8">
                  <input type="text"
                         className="form-control"
                         placeholder="Restaurant Name"/>
                </div>
                <div className="col-4">
                  <button type="button"
                          className="form-control btn btn-success">
                    Claim!
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group row"
                 hidden={userType === constants.RESTAURATEUR}>
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

            <div className="form-group"
                 hidden={userType !== constants.CUSTOMER}>
              <label>Address</label>
              <input className="form-control"
                     placeholder="Enter address"/>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12">
            <button type="button"
                    className="form-control btn btn-primary"
            >Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};

const stateToPropsMapper = (state, ownProps) => {
  if (state != null) {
    return {
      userType: state.userType
    }
  }
  return {
    userType: ownProps.userType
  }
};

const dispatcherToPropsMapper = dispatch => ({
  typeChanged: (userType) => actions.typeChanged(dispatch, userType)
});

const RegisterFormConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(RegisterFormContainer);

const store = createStore(reducer);

const RegisterForm = state => (
  <Provider store={store}>
    <RegisterFormConnected userType={constants.CUSTOMER}/>
  </Provider>
);

export default RegisterForm;