import React, {Component} from 'react'
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom';
import * as actions from '../actions'
import '../styles/index.css'

const OrderWidgetComponent = ({}) => {
  return(
    <h1>Dummy Order</h1>
  )
};

const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({

});

const OrderWidgetConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(OrderWidgetComponent);

const store = createStore(reducer);

const OrderWidget = state => (
  <Provider store={store}>
    <OrderWidgetConnected/>
  </Provider>
);

export default OrderWidget;