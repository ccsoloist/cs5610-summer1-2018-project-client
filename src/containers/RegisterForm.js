import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import * as actions from '../actions'
import '../styles/index.css'
import '../styles/validation.scss'

const RegisterFormContainer = (
  {userType, typeChanged, register, claimRestaurant, claimed, restaurantId}
) => {
  let select;
  // Register Fields left
  let input_un, input_pw, input_cf, input_fn;
  // Register Fields right
  let input_ln, input_rn, input_em, input_ph, input_ad;
  // Claim Restaurant Fields
  let input_ct, input_st, input_cr, input_ra, input_rph;

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
              <input type="text"
                     className="form-control"
                     placeholder="Restaurant Name"
                     ref={node => input_rn = node} required/>
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

            <div className="form-group"
                 hidden={userType === constants.RESTAURATEUR}>
              <label>Phone</label>
              <input className="form-control"
                     placeholder="Enter phone"
                     ref={node => input_ph = node} required/>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input className="form-control"
                     placeholder="Enter email"
                     ref={node => input_em = node} required/>
            </div>

            <div className="claim-restaurant-box"
                 hidden={userType !== constants.RESTAURATEUR}>
              <span>&nbsp;</span>
              <div className="form-group">
                <label>Claim Restaurant by 16177423474!</label>
                <input type="text"
                       className="form-control"
                       placeholder="Enter Phone"
                       ref={node => input_rph = node} required/>
              </div>

              <div className="form-group">
                <div className="col-12">
                  <button type="button"
                          onClick={() => {
                            if (input_rph.value !== '') {
                              claimRestaurant(userType, claimed, input_rph.value)
                            }
                          }}
                          className="form-control btn btn-success">
                    Claim!
                  </button>
                </div>
                <span>&nbsp;</span>
              </div>

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
                    disabled={!claimed && userType === constants.RESTAURATEUR}
                    className="form-control btn btn-primary"
                    onClick={() => register(userType, restaurantId, input_un.value,
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
  if (state != null && state.userType !== undefined) {
    return {
      userType: state.userType,
      claimed: state.claimed,
      restaurantId: state.restaurantId
    }
  }
  return {
    userType: ownProps.userType,
    claimed: ownProps.claimed,
    restaurantId: ownProps.restaurantId
  }
};

const dispatcherToPropsMapper = dispatch => ({
  typeChanged: (userType) =>
    actions.typeChanged(dispatch, userType),
  register: (userType, restaurantId, username, password, confirm, firstName,
             lastName, restaurantName, email, phone, address) =>
    actions.Register(dispatch, userType, restaurantId, username, password, confirm,
      firstName, lastName, restaurantName, email, phone, address),
  claimRestaurant: (userType, claimed, phone) =>
    actions.claimRestaurant(dispatch, userType, claimed, phone)
});

const RegisterFormConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(RegisterFormContainer);

const store = createStore(reducer);

const RegisterForm = state => (
  <Provider store={store}>
    <RegisterFormConnected
      restaurantId={-1}
      claimed={false}
      userType={constants.RESTAURATEUR}/>
  </Provider>
);

export default RegisterForm;