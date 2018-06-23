import React, {Component} from 'react'
import * as constants from '../constants'
import {connect} from 'react-redux'
import * as actions from '../actions'
import '../styles/index.css'

const OrderWidgetComponent = ({userType, order, users, finishOrder}) => {
  return (
    <form className="order-widget-container">
      <table className="table item-table">
        <thead>
        <tr>
          <td>Dish Name</td>
          <td>Price</td>
          <td>Amount</td>
        </tr>
        </thead>
        <tbody>
        {order.items.map(item => (
          <tr key={item.id}>
            <td>{item.dish.name}</td>
            <td>{item.dish.price}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <hr/>
      <div hidden={userType === constants.CUSTOMER}>
        <div className="form-group row">
          <h6 className="col-8">Customer: </h6>
          <h6 className="col-2 float-right special-font">{order.customer.username}</h6>
        </div>
        <hr/>
      </div>
      <div hidden={userType === constants.RESTAURATEUR}>
        <div className="form-group row">
          <h6 className="col-8">Restaurateur: </h6>
          <h6 className="col-2 float-right special-font">{order.restaurateur.username}</h6>
        </div>
        <hr/>
      </div>
      <div hidden={userType === constants.DELIVERER}>
        <div className="form-group row">
          <h6 className="col-8">Deliverer: </h6>
          <h6 className="col-2 float-right special-font">{order.deliverer.username}</h6>
        </div>
        <hr/>
      </div>
      <div>
        <div className="form-group row">
          <h6 className="col-8">{"Total: "}</h6>
          <h6 className="col-2 float-right special-font">{order.total}</h6>
        </div>
        <hr/>
      </div>
      <div>
        <div className="form-group row">
          <h6 className="col-8">{"Finish: "}</h6>
          <h6 hidden={userType !== constants.RESTAURATEUR}
              className="col-2 float-right special-font">{order.delivered.toString()}</h6>
          <button hidden={userType === constants.RESTAURATEUR || order.delivered}
                  type="button" onClick={()=>finishOrder(order.id)}
                  className="col-3 float-right deliver-button btn-sm btn-default fa fa-times"/>
          <button hidden={userType === constants.RESTAURATEUR || !order.delivered}
                  type="button"
                  onClick={()=>finishOrder(order.id)}
                  disabled={true}
                  className="col-3 float-right deliver-button-done btn-sm btn-success fa fa-check-circle"/>
        </div>
        <hr/>
      </div>
    </form>
  )
};

const stateToPropsMapper = (state, ownProps) => {
  if (state !== undefined) {
    return state;
  }
  return ownProps;
};

const dispatcherToPropsMapper = dispatch => ({
  finishOrder: (orderId) => actions.finishOrder(dispatch, orderId)
});

const OrderWidget = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(OrderWidgetComponent);

export default OrderWidget;