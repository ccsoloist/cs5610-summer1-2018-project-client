import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom';
import * as actions from '../actions'
import '../styles/index.css'


const LoginFormContainer = ({login}) => {
  let select;
  let input_un;
  let input_pw;
  return (
    <div className="login-form-container">
      <form className="login-form">
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">User type</label>
          <div className="col-sm-8">
            <select
              className="form-control"
              // value={userType}
              ref={node => select = node}>
              <option value={constants.CUSTOMER}>{constants.CUSTOMER}</option>
              <option value={constants.RESTAURATEUR}>{constants.RESTAURATEUR}</option>
              <option value={constants.DELIVERER}>{constants.DELIVERER}</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Username</label>
          <div className="col-sm-8">
            <input placeholder="username"
                   className="form-control"
                   ref={node => input_un = node}/>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Password</label>
          <div className="col-sm-8">
            <input type="password"
                   placeholder="password"
                   className="form-control"
                   ref={node => input_pw = node}/>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-6">
            <button type="button"
                    onClick={()=>login(select.value, input_un.value, input_pw.value)}
                    className="form-control btn btn-primary"
            >Log in
            </button>
          </div>
          <div className="col-6">
            <Link to={'/register'}>
              <i className="form-control btn btn-success">Register</i>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
};

const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({
  login: (userType, username, password) =>
    actions.Login(dispatch, userType, username, password)
});

const LoginFormConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(LoginFormContainer);

const store = createStore(reducer);

const LoginForm = state => (
  <Provider store={store}>
    <LoginFormConnected/>
  </Provider>
);

export default LoginForm;