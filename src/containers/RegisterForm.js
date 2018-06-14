import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import * as actions from '../actions'
import '../styles/index.css'
import '../styles/validation.scss'

const RegisterFormContainer = ({userType, typeChanged, register}) => {
  let select;
  let input_un, input_pw, input_cf, input_fn;
  let input_ln, input_rn, input_em, input_ph, input_ad;

  return (
    <div className="register-form-container">
      <form className="register-form">
        <div className=" form-group row">
          <div className="col">
            <div className="form-group">
              <label>User Type</label>
              <select className="form-control"
                      value={userType}
                      onChange={() => typeChanged(select.value)}
                      ref={node => select = node}>
                <option value={constants.CUSTOMER}>Customer</option>
                <option value={constants.RESTAURATEUR}>Restaurateur</option>
                <option value={constants.DELIVERER}>Deliverer</option>
              </select>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input className="form-control"
                     placeholder="Username"
                     ref={node => input_un = node} required/>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password"
                     className="form-control"
                     placeholder="Password"
                     ref={node => input_pw = node} required/>
            </div>

            <div className="form-group">
              <label>Confirm</label>
              <input type="password"
                     className="form-control"
                     placeholder="Confirm Password"
                     ref={node => input_cf = node} required/>
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
                         placeholder="Restaurant Name"
                         ref={node => input_rn = node} required/>
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
                       placeholder="First name"
                       ref={node => input_fn = node} required/>
              </div>
              <div className="col">
                <label>Last Name</label>
                <input type="text"
                       className="form-control"
                       placeholder="Last name"
                       ref={node => input_ln = node} required/>
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input className="form-control"
                     placeholder="Enter email"
                     ref={node => input_em = node} required/>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input className="form-control"
                     placeholder="Enter phone"
                     ref={node => input_ph = node} required/>
            </div>

            <div className="form-group"
                 hidden={userType !== constants.CUSTOMER}>
              <label>Address</label>
              <input className="form-control"
                     placeholder="Enter address"
                     ref={node => input_ad = node} required/>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12">
            <button type="button"
                    className="form-control btn btn-primary"
                    onClick={() => register(userType, input_un.value,
                      input_pw.value, input_cf.value, input_fn.value,
                      input_ln.value, input_rn.value, input_em.value,
                      input_ph.value, input_ad.value)}>
              Register
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
  typeChanged: (userType) =>
    actions.typeChanged(dispatch, userType),
  register: (userType, username, password, confirm, firstName,
             lastName, restaurantName, email, phone, address) =>
    actions.Register(dispatch, userType, username, password, confirm,
      firstName, lastName, restaurantName, email, phone, address)
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