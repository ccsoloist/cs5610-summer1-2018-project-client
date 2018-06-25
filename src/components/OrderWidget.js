import React, {Component} from 'react'
import * as constants from '../constants'
import {connect} from 'react-redux'
import * as actions from '../actions'
import '../styles/index.css'
import {reducer} from "../reducers";
import {createStore} from "redux";

const OrderWidgetComponent = (
  {
    userType, order, users, finishOrder, previewMode, reviewType, changeReviewType,
    previewOrderWidget, review, reviewMode, currentOrderId, reviewDeliverer, deleteOrder, isAdmin
  }) => {
  let select;

  console.log(order.items);


  return (
    <form className="order-widget-container">
      <table className="table">
        <tbody>
        <tr>
          <th align="center" rowSpan={2}>
            <button hidden={!isAdmin} type="button"
                    onClick={() => deleteOrder(order.id)}
                    className="btn btn-danger fa fa-times"/>
            <button hidden={!previewMode} type="button"
                    onClick={() => previewOrderWidget(order.id, previewMode)}
                    className="btn btn-success fa fa-plus"/>
            <button hidden={previewMode} type="button"
                    onClick={() => previewOrderWidget(order.id, previewMode)}
                    className="btn btn-warning fa fa-minus"/>
          </th>
          <th hidden={!previewMode}
              className="text-center">Restaurant
          </th>
          <th hidden={!previewMode}
              className="text-center">Customer
          </th>
          <th hidden={!previewMode}
              className="text-center">Total
          </th>
          <th hidden={!previewMode}
              className="text-center">Finished
          </th>
        </tr>
        <tr hidden={!previewMode}>
          <td className="text-center special-font">
            {order.restaurateur.restaurant.name}
          </td>
          <td className="text-center special-font">
            {userType === constants.CUSTOMER ? "me" : order.customer.username}
          </td>
          <td className="text-center special-font">{"$" + order.total}</td>
          <td align="center">
            <div hidden={userType !== constants.RESTAURATEUR}
                 className=" special-font">
              {order.delivered ? "Yes" : "Not yet"}
            </div>
            <button hidden={userType === constants.RESTAURATEUR || order.delivered}
                    className="deliver-button btn btn-default fa fa-circle-thin"
                    type="button" onClick={() => finishOrder(order.id)}/>
            <button hidden={userType === constants.RESTAURATEUR || !order.delivered}
                    type="button"
                    onClick={() => finishOrder(order.id)}
                    disabled={true}
                    className=" deliver-button-done btn btn-success fa fa-check-circle"/>
          </td>
        </tr>
        </tbody>
      </table>
      <table className="table" hidden={previewMode}>
        <tbody>
        <tr hidden={userType === constants.CUSTOMER}>
          <td>Customer:</td>
          <td className="text-right special-font">{order.customer.username}</td>
        </tr>
        <tr hidden={userType === constants.RESTAURATEUR}>
          <td>Restaurat:</td>
          <td className="text-right special-font">{order.restaurateur.restaurant.name}</td>
        </tr>
        <tr hidden={userType === constants.DELIVERER}>
          <td>Deliverer:</td>
          <td align="right" className="special-font">
            {order.deliverer.username}&nbsp;&nbsp;
            <button hidden={reviewMode || userType !== constants.CUSTOMER}
                    className="btn btn-success" type="button"
                    onClick={() => review(order.id, reviewMode, order.deliverer.id)}
            >Review
            </button>
            <button hidden={!reviewMode || currentOrderId !== order.id}
                    className="btn btn-info"
                    type="button"
                    onClick={() => reviewDeliverer(order.id, reviewMode, select.value, order.deliverer.id)}
            >Save
            </button>
          </td>
        </tr>
        <tr hidden={userType !== constants.CUSTOMER || !reviewMode
        || currentOrderId !== order.id}>
          <td></td>
          <td>
            <select className="form-control"
                    onChange={() => changeReviewType(select.value)}
                    value={reviewType}
                    ref={node => select = node}>
              <option value={constants.VERY_SATISFIED}>Very Satisfied!</option>
              <option value={constants.SATISFIED}>Satisfied</option>
              <option value={constants.FAIR}>Fair</option>
              <option value={constants.UNSATISFIED}>Unsatisfied</option>
              <option value={constants.VERY_UNSATISFIED}>Very Unsatisfied!!!</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Total:</td>
          <td className="text-right special-font">{"$" + order.total}</td>
        </tr>
        <tr>
          <td>Finished:</td>
          <td>
            <div hidden={userType !== constants.RESTAURATEUR}
                 className="text-right special-font">
              {order.delivered ? "Yes" : "Not yet"}
            </div>

            <button hidden={userType === constants.RESTAURATEUR || order.delivered}
                    className=" float-right deliver-button btn btn-default fa fa-circle-thin"
                    type="button" onClick={() => finishOrder(order.id)}/>
            <button hidden={userType === constants.RESTAURATEUR || !order.delivered}
                    type="button"
                    onClick={() => finishOrder(order.id)}
                    disabled={true}
                    className="float-right deliver-button-done btn btn-success fa fa-check-circle"/>
          </td>
        </tr>
        </tbody>
      </table>
      <table className="table item-table" hidden={previewMode}>
        <thead>
        <tr>
          <th className="text-center">DishName</th>
          <th className="text-center">Price</th>
          <th className="text-center">Amount</th>
        </tr>
        </thead>
        <tbody>
        {order.items.map(item => (
          <tr key={item.id}>
            <td className="text-center">{item.dish.name}</td>
            <td className="text-center">{"$" + item.dish.price}</td>
            <td className="text-center">{item.amount}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </form>
  )
};

const stateToPropsMapper = (state, ownProps) => {
  if (state !== undefined) {
    // console.log(state)
    if (state.previewModes === undefined)
      return {
        isAdmin: ownProps.isAdmin,
        order: ownProps.order,
        currentOrderId: state.currentOrderId,
        previewMode: ownProps.previewMode,
        reviewMode: state.reviewMode,
        userType: ownProps.userType,
        reviewType: state.reviewType === undefined ?
          ownProps.reviewType : state.reviewType
      };
    // console.log(ownProps)
    return {
      isAdmin: ownProps.isAdmin,
      reviewType: state.reviewType,
      order: ownProps.order,
      currentOrderId: state.currentOrderId,
      userType: ownProps.userType,
      reviewMode: state.reviewMode,
      previewMode: state.previewModes[ownProps.order.id] === undefined ?
        true : state.previewModes[ownProps.order.id]
    };
  }
  return ownProps;
};

const dispatcherToPropsMapper = dispatch => ({
  changeReviewType: (reviewType) => actions.changeReviewType(dispatch, reviewType),
  finishOrder: (orderId) => actions.finishOrder(dispatch, orderId),
  previewOrderWidget: (orderId, previewMode) =>
    actions.previewOrderWidget(dispatch, orderId, previewMode),
  review: (orderId, reviewMode, delivererId) =>
    actions.toggleReviewMode(dispatch, orderId, reviewMode, delivererId),
  reviewDeliverer: (orderId, reviewMode, reviewType, delivererId) =>
    actions.reviewDeliverer(dispatch, orderId, reviewMode, reviewType, delivererId),
  deleteOrder: (orderId) => actions.deleteOrder(dispatch, orderId)
});

const OrderWidget = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(OrderWidgetComponent);

export default OrderWidget;