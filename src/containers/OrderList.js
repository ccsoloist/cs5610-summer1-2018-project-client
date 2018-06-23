import React, {Component} from 'react'
import * as constants from '../constants'
import '../styles/index.css'
import OrderWidget from "../components/OrderWidget";
import UserServiceClient from "../services/UserServiceClient";

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      userType: this.props.match.params.userType
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
      <div className="order-list-container">
        <div className="order-list">
          {/*<h1>Order List</h1>*/}
          <ul>
            {this.state.orders.map(order => (
              <OrderWidget userType={this.state.userType}
                           key={order.id}
                           order={order}/>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}