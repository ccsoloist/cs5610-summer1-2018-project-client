import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'
import OrderWidget from "../components/OrderWidget";

const OrderListContainer = ({}) => {
  return (
    <div className="order-list-container">
      <div className="order-list">
        <h1>Order List</h1>
        <OrderWidget/>
      </div>
    </div>

  )
};

const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({});

const OrderListConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(OrderListContainer);

const store = createStore(reducer);

const OrderList = state => (
  <Provider store={store}>
    <OrderListConnected/>
  </Provider>
);

export default OrderList;