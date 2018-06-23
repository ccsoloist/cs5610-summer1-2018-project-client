import React, {Component} from 'react'
import * as constants from '../constants'
import '../styles/index.css'
import UserServiceClient from "../services/UserServiceClient";

export default class AccountEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: this.props.match.params.userType,
      userId: this.props.match.params.userId
    };
    this.updateForm = this.updateForm.bind(this);
    this.userServiceClient = UserServiceClient.instance();
    this.findProfileForUser = this.findProfileForUser.bind(this);
    this.updateUserAccount = this.updateUserAccount.bind(this);
  }

  componentDidMount() {
    this.findProfileForUser(
      this.props.match.params.userType, this.props.match.params.userId);
  }

  componentWillReceiveProps(newProps) {
    this.findProfileForUser(newProps.match.params.userType,
      newProps.match.params.userId);
  }

  findProfileForUser(userType, userId) {
    this.userServiceClient.findAccountInfoForUser(
      this.props.match.params.userType,
      this.props.match.params.userId
    ).then(user => {
      this.setState({
        id: user.id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        restaurantName: this.state.userType === constants.RESTAURATEUR
          ? user.restaurant.name : '',
        address: this.state.userType === constants.CUSTOMER ? user.address : ''
      });
    });
  }

  updateUserAccount(userType, userId) {
    let newUser = {
      id: this.state.id,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    };
    this.userServiceClient.updateAccountInfoForUser(userType, userId, newUser);
  }

  updateForm(newProps) {
    this.setState(newProps);
  }

  render() {
    return (
      <div className="account-editor-container">
        <form className="account-editor">
          <fieldset disabled>
            <div className="form-group">
              <label>Username</label>
              <input className="form-control"
                     value={this.state.username || ''}
                     placeholder="Username" readOnly/>
            </div>
          </fieldset>

          <div className="form-group">
            <label>Password</label>
            <input className="form-control"
                   type='password'
                   value={this.state.password || ''}
                   onChange={e => this.updateForm({password: e.target.value})}
                   placeholder="Password"/>
          </div>


          <div className="form-group"
               hidden={this.state.userType !== constants.RESTAURATEUR}>
            <label>Restaurant Name</label>
            <input type="text"
                   className="form-control"
                   value={this.state.restaurantName || ''}
                   placeholder="Restaurant Name" readOnly/>
          </div>

          <div className="form-group row">
            <div className="col">
              <label>First Name</label>
              <input type="text"
                     className="form-control"
                     value={this.state.firstName || ''}
                     onChange={e => this.updateForm({firstName: e.target.value})}
                     placeholder="First name"/>
            </div>
            <div className="col">
              <label>Last Name</label>
              <input type="text"
                     className="form-control"
                     value={this.state.lastName || ''}
                     onChange={e => this.updateForm({lastName: e.target.value})}
                     placeholder="Last name"/>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="form-control"
                   value={this.state.email || ''}
                   onChange={e => this.updateForm({email: e.target.value})}
                   placeholder="Enter email"/>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input className="form-control"
                   value={this.state.phone || ''}
                   onChange={e => this.updateForm({phone: e.target.value})}
                   placeholder="Enter phone"/>
          </div>

          <div className="form-group"
               hidden={this.state.userType !== constants.CUSTOMER}>
            <label>Address</label>
            <input className="form-control"
                   value={this.state.address || ''}
                   onChange={e => this.updateForm({address: e.target.value})}
                   placeholder="Enter address"/>
          </div>

          <div className="form-group">
            <div className="col-12">
              <button type="button"
                      onClick={() => this.updateUserAccount
                      (this.state.userType, this.state.userId)}
                      className="form-control btn btn-primary"
              >Update
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}