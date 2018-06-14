import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'

// const AccountEditorContainer = ({userType}) => {
class AccountEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userType:this.props.,
      user: this.props.user
   }
   this.updateForm = this.updateForm.bind(this);
  }

  componentDidMount() {
      // console.log(this.state.user);
      this.setState({user: this.props.user});

    // let userType = this.props.userType;
    // let userId = this.props.userId;
    // fetch('http://localhost:8080/api/profile/'+userType+'/'+userId+'/account')
    //   .then(response=>(response.json()))
    //   .then(user=>{console.log(user);this.setState({user: user})});
    //   // .then((response)=>{this.setState({user: user})});
  }

  updateForm() {

  }

  render() {
    return (
      <div className="account-editor-container">
        <form className="account-editor">
          <fieldset disabled>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control"
                   value={this.state.user.username}
                   placeholder="Username" readOnly/>
          </div>
          </fieldset>

          <div className="form-group">
            <label>Password</label>
            <input className="form-control"
                   value={this.state.user.password}
                   placeholder="Password"/>
          </div>


          <div className="form-group">
            <label>Restaurant Name</label>
            <input type="text"
                   className="form-control"
                   value={this.state.user.restaurantName}
                   placeholder="Restaurant Name"/>
          </div>

          <div className="form-group row">
            <div className="col">
              <label>First Name</label>
              <input type="text"
                     className="form-control"
                     value={this.state.user.firstName}
                     placeholder="First name"/>
            </div>
            <div className="col">
              <label>Last Name</label>
              <input type="text"
                     className="form-control"
                     value={this.state.user.lastName}
                     placeholder="Last name"/>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="form-control"
                   value={this.state.user.email}
                   placeholder="Enter email"/>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input className="form-control"
                   value={this.state.user.phone}
                   placeholder="Enter phone"/>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input className="form-control"
                   value={this.state.user.address}
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
  }
};

const stateToPropsMapper = (state, ownProps) => {
  // console.log(ownProps);
  if (state !== undefined) {
    return state;
  }
  return ownProps;
}

const dispatcherToPropsMapper = dispatch => ({});

const AccountEditorConnected = connect(
  // stateToPropsMapper,
  dispatcherToPropsMapper
)(AccountEditorContainer);

const store = createStore(reducer);

const AccountEditor = state => {
  // console.log(state);
  return (
  <Provider store={store}>
    <AccountEditorConnected user={state.user} userType={state.userType} userId={state.userId}/>
  </Provider>
  )
};

export default AccountEditor;