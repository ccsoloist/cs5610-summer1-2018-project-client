import React, {Component} from 'react'
import * as constants from '../constants'
import '../styles/index.css'
import OrderWidget from "../components/OrderWidget";
import {connect} from 'react-redux'
import UserServiceClient from "../services/UserServiceClient";
import * as actions from '../actions'

export default class OrderListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      userId: this.props.match.params.userId,
      userType: this.props.match.params.userType,
      isAdmin: this.props.match.params.isAdmin === "admin"
    };

    this.findOrdersForUser = this.findOrdersForUser.bind(this);
    this.userServiceClient = UserServiceClient.instance();
  }

  componentDidMount() {
    this.findOrdersForUser(this.props.match.params.userId);
  }

  componentWillReceiveProps(newProps) {
    this.findOrdersForUser(newProps.match.params.userId);
}

  findOrdersForUser(userId) {
    this.userServiceClient.findOrdersForUser(userId)
      .then(orders => this.setState({orders: orders}));
  }

  render() {
    return (
      <div className="col-12 order-list-container">
        <div className="order-list">
          <ul>
            {this.state.orders.map(order => (
              <OrderWidget userType={this.state.userType}
                           key={order.id}
                           previewMode={false}
                           previewModes={''}
                           reviewMode={false}
                           isAdmin={this.state.isAdmin}
                           order={order}/>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}