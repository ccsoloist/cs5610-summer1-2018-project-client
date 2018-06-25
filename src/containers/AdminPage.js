import React from 'react';
import UserServiceClient from "../services/UserServiceClient";
import * as constants from "../constants";
import RegisterForm from "./RegisterForm";
import {Link} from 'react-router-dom';

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: constants.CUSTOMER,
      customers: [],
      restaurateurs: [],
      deliverers: []
    };

    this.findAllUsers = this.findAllUser.bind(this);
    this.refresh = this.refresh.bind(this);
    this.userService = UserServiceClient.instance();
  }

  componentDidMount() {
    this.findAllUsers();
  }

  componentWillReceiveProps(newProps) {
    this.findAllUsers();
  }

  findAllUser() {
    this.userService.findAllCustomers()
      .then(customers => this.setState({customers: customers}));
    this.userService.findAllRestaurateurs()
      .then(restaurateurs => this.setState({restaurateurs: restaurateurs}));
    this.userService.findAllDeliverers()
      .then(deliverers => this.setState({deliverers: deliverers}));
  }

  createUser(userType, username, password) {
    let user = {
      username: username,
      password: password,
      firstName: '',
      lastName: '',
      address: ''
    };

    this.userService.register(user, userType)
      .then(() => {
        this.refresh(userType);
      });
  }

  deleteUser(userType, userId) {
    if (window.confirm("Confirm to delete this user")) {
      this.userService.deleteUser(userType, userId)
        .then(() => {
          this.refresh(userType);
        })
    }
  }

  refresh(userType) {
    switch (userType) {
      case constants.CUSTOMER:
        this.userService.findAllCustomers()
          .then(customers => this.setState({customers: customers}));
        break;
      case constants.RESTAURATEUR:
        this.userService.findAllRestaurateurs()
          .then(restaurateurs => this.setState({restaurateurs: restaurateurs}));
        break;
      case constants.DELIVERER:
        this.userService.findAllDeliverers()
          .then(deliverers => this.setState({deliverers: deliverers}));
        break;
      default:
    }
  }

  render() {
    let userTypeEle, usernameEle, passwordEle;

    return (
      <div className="container-fluid admin-page-bottom">
        <div className='container list-group admin-page-bottom-1'>
          <table className="table table-hover admin-table">
            <thead className="form-group">
            <tr className="text-center">
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Admin Operation</th>
            </tr>
            </thead>

            <tbody className="special-font">
            <tr>
              <td className="special-font-2">Customers</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            {this.state.customers.map(customer => {
              return (
                <tr className="form-group text-center"
                    key={customer.id}>
                  <td>
                    <i className="fa fa-user"/>
                    &nbsp;&nbsp;&nbsp;
                    <label className="special-font">{customer.username}</label>
                  </td>
                  <td>
                    {customer.firstName}
                  </td>
                  <td>
                    {customer.lastName}
                  </td>
                  <td>
                    <Link to={`admin/profile/customer/${customer.id}`}>
                      <i className='fa fa-pencil'/>
                    </Link>&nbsp;&nbsp;&nbsp;
                    <i className='fa fa-trash trash-btn'
                       onClick={() => this.deleteUser(constants.CUSTOMER, customer.id)}/>
                  </td>
                </tr>
              );
            })}


            <tr>
              <td className="special-font-2">Restaurateurs</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            {this.state.restaurateurs.map(restaurateur => {
              return (
                <tr className="form-group"
                    key={restaurateur.id}>
                  <td className="text-center">
                    <i className="fa fa-user"/>
                    &nbsp;&nbsp;&nbsp;
                    <label className="special-font">{restaurateur.username}</label>
                  </td>
                  <td className="text-center">
                    {restaurateur.firstName}
                  </td>
                  <td className="text-center">
                    {restaurateur.lastName}
                  </td>
                  <td className="text-center">
                    <Link to={`admin/profile/restaurateur/${restaurateur.id}`}>
                    <i className='fa fa-pencil'/>
                      &nbsp;&nbsp;&nbsp;
                    </Link>
                    <i className='fa fa-trash trash-btn'
                       onClick={() => this.deleteUser(constants.RESTAURATEUR, restaurateur.id)}/>
                  </td>
                </tr>
              );
            })}

            <tr>
              <td className="special-font-2">Deliverers</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            {this.state.deliverers.map(deliverer => {
              return (
                <tr className="form-group"
                    key={deliverer.id}>
                  <td className="text-center">
                    <i className="fa fa-user"/>
                    &nbsp;&nbsp;&nbsp;
                    <label>{deliverer.username}</label>
                  </td>
                  <td className="text-center">
                    {deliverer.firstName}
                  </td>
                  <td className="text-center">
                    {deliverer.lastName}
                  </td>
                  <td className="text-center">
                    <Link to={`admin/profile/deliverer/${deliverer.id}`}>
                      <i className='fa fa-pencil'/>
                    </Link>&nbsp;&nbsp;&nbsp;
                    <i className='fa fa-trash trash-btn'
                       onClick={() => this.deleteUser(constants.DELIVERER, deliverer.id)}/>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>

          <div className="admin-create row text-center">

            <select className="form-control col-2"
                    ref={(node) => (userTypeEle = node)}
                    defaultValue={constants.CUSTOMER}>
              <option value={constants.CUSTOMER}>Customer</option>
              {/*<option value={constants.RESTAURATEUR}>Restaurateur</option>*/}
              <option value={constants.DELIVERER}>Deliverer</option>
            </select>

            <input className="form-control col-4"
                   placeholder="Username"
                   type="text"
                   defaultValue="hunya"
                   ref={(node) => (usernameEle = node)}/>

            <input className="form-control col-4"
                   placeholder="Password"
                   defaultValue="hungya"
                   type="password"
                   ref={(node) => (passwordEle = node)}/>

            <button className="btn btn-primary col-2"
                    onClick={() =>
                      this.createUser(userTypeEle.value, usernameEle.value, passwordEle.value)}>
              <i className="fa fa-plus"/>
            </button>
          </div>

        </div>
      </div>
    );
  }

}