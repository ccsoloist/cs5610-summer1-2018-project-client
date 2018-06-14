import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {Field, Form, Errors} from 'react-redux-form';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import {createForms} from 'react-redux-form';
import thunk from 'redux-thunk';
import {reducer} from '../reducers'
import * as actions from '../actions'
import '../styles/index.css'
// import '../styles/validation.scss'

const isSame = (pw, cf) => pw === cf;
const isRequired = (val) => val && val.length > 0;
const lessThan10 = (val) => {
  const lessThan = 10;
  if (!(val < 10)) {
    return {lessThan};
  }
  return false;
};

const RegisterFormContainer = ({userType, typeChanged, register}) => {
  let select;
  let input_un, input_pw, input_cf, input_fn;
  let input_ln, input_rn, input_em, input_ph, input_ad;

  return (
    <div>

    <Form className="register-form-container" model="user" onSubmit={this.handleSubmit}>
      <div className="register-form">
        <div className=" form-group row">
          <div className="col">
            <Field className="form-group" model="user.userType">
              <label>User Type</label>
              <select className="form-control"
                      value={userType}
                      onChange={() => typeChanged(select.value)}
                      ref={node => select = node}>
                <option value={constants.CUSTOMER}>Customer</option>
                <option value={constants.RESTAURATEUR}>Restaurateur</option>
                <option value={constants.DELIVERER}>Deliverer</option>
              </select>
            </Field>

            <Field className="form-group" model="user.username" validators={{isRequired}}>
              <label>Username</label>
              <input type="text"
                     className="form-control"
                     placeholder="Username"
                     ref={node => input_un = node}/>
              <Errors
                wrapper="span"
                show={{touched: true, focus: false}}
                model="user.username"
                messages={{
                  isRequired: 'Please provide a last name.',
                }}/>
            </Field>

            <Field className="form-group" model="user.password" validators={{isRequired}}>
              <label>Password</label>
              <input type="text"
                     className="form-control"
                     placeholder="Password"
                     ref={node => input_pw = node}/>
              <Errors
                wrapper="span"
                show={{touched: true, focus: false}}
                model="user.password"
                messages={{
                  isRequired: 'Please provide a last name.',
                }}/>
            </Field>

            <Field className="form-group" model="user.confirm" validators={{isRequired}}>
              <label>Confirm</label>
              <input type="text"
                     className="form-control"
                     placeholder="Confirm"
                     ref={node => input_cf = node}/>
              <Errors
                wrapper="span"
                show={{touched: true, focus: false}}
                model="user.confirm"
                messages={{
                  isRequired: 'Please provide a last name.',
                }}/>
            </Field>
          </div>

          <div className="col">
            <Field className="form-group"
                   model="user.restaurantName"
                   hidden={userType !== constants.RESTAURATEUR}
                   validators={{isRequired}}>
              <label>Restaurant Name</label>
              <div className="form-group row">
                <div className="col-8">
                  <input type="text"
                         className="form-control"
                         placeholder="Restaurant Name"
                         ref={node => input_rn = node}/>
                </div>
                <div className="col-4">
                  <button type="button"
                          className="form-control btn btn-success">
                    Claim!
                  </button>
                </div>
                <Errors
                  wrapper="span"
                  show={{touched: true, focus: false}}
                  model="user.restaurantName"
                  messages={{
                    isRequired: 'Please provide a restaurant name.',
                  }}/>
              </div>
            </Field>


            <div className="form-group row" hidden={userType === constants.RESTAURATEUR}>
              <Field className="col" model="user.firstName" validators={{isRequired}}>
                <label>First Name</label>
                <input type="text"
                       className="form-control"
                       placeholder="First name"
                       ref={node => input_fn = node}/>
                <Errors
                  wrapper="span"
                  show={{touched: true, focus: false}}
                  model="user.firstName"
                  messages={{
                    isRequired: 'Please provide a first name.',
                  }}
                />
              </Field>
              <Field className="col" model="user.lastName" validators={{isRequired}}>
                <label>Last Name</label>
                <input type="text"
                       className="form-control"
                       placeholder="Last name"
                       ref={node => input_ln = node}/>
                <Errors
                  wrapper="span"
                  show={{touched: true, focus: false}}
                  model="user.lastName"
                  messages={{
                    isRequired: 'Please provide a last name.',
                  }}
                />
              </Field>
            </div>

            <Field className="form-group" model="user.email" validators={{isRequired}}>
              <label>Email</label>
              <input type="email"
                     className="form-control"
                     placeholder="Enter Email"
                     ref={node => input_em = node}/>
              <Errors
                wrapper="span"
                show={{touched: true, focus: false}}
                model="user.email"
                messages={{
                  isRequired: 'Please provide a email.',
                }}/>
            </Field>

            <Field className="form-group" model="user.phone" validators={{isRequired}}>
              <label>Phone</label>
              <input type="text"
                     className="form-control"
                     placeholder="Enter Phone"
                     ref={node => input_ph = node}/>
              <Errors
                wrapper="span"
                show={{touched: true, focus: false}}
                model="user.phone"
                messages={{
                  isRequired: 'Please provide a phone.',
                }}/>
            </Field>

            <Field className="form-group" model="user.address"
                   hidden={userType !== constants.CUSTOMER}
                   validators={{isRequired}}>
              <label>Address</label>
              <input type="text"
                     className="form-control"
                     placeholder="Enter Address"
                     ref={node => input_ad = node}/>
              <Errors
                wrapper="span"
                show={{touched: true, focus: false}}
                model="user.address"
                messages={{
                  isRequired: 'Please provide an address.',
                }}/>
            </Field>


            {/*<Field className="form-group" model="user.dob" errors={{lessThan10}}*/}
                   {/*validateOn="change">*/}
              {/*<label>A number less than 10: </label>*/}
              {/*<input type="number"/>*/}
              {/*<Errors*/}
                {/*wrapper="span"*/}
                {/*show={{pristine: false}}*/}
                {/*model="user.dob"*/}
                {/*messages={{*/}
                  {/*lessThan10: (value, {lessThan}) =>*/}
                    {/*`Error: ${value} is not less than ${lessThan}`,*/}
                {/*}}*/}
              {/*/>*/}
            {/*</Field>*/}
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
      </div>
    </Form>
    </div>
  );
};

const stateToPropsMapper = (state, ownProps) => {

  if (state.userType != null) {
    console.log("state: " + state.userType);
    return {
      userType: state.userType
    }
  }
  console.log("props: "+ownProps.userType);
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


const initialUserState = {
  firstName: '1',
  lastName: '2',
};

const store = applyMiddleware(thunk)(createStore)(combineReducers({
  reducer,
  ...createForms({
    user: initialUserState
  })
}));

const RegisterForm2 = state => (
  <Provider store={store}>
    <RegisterFormConnected userType={constants.CUSTOMER}/>
  </Provider>
);

export default RegisterForm2;