import React from 'react';
import {connect} from "react-redux";
import * as actions from '../actions/index';


const OrderEditorContainer = ({items, dishes, restaurantId, total,
                                increaseAmount, decreaseAmount, placeOrder}) => {
  return (
    <div>
      <div className="order-editor list-group">
        {items.map((item) => {
          return (
            <div key={item.dish.id} className="list-group-item">
              {item.dish.name}
              <div className="float-right">
                <button className="btn btn-primary"
                        onClick={() => increaseAmount(item, dishes, restaurantId, items, total)}>
                  <i className="fa fa-plus"></i>
                </button>
                <span className="col-1">{item.amount}</span>
                <button className="btn btn-primary"
                        onClick={() => decreaseAmount(item, dishes, restaurantId, items, total)}>
                  <i className="fa fa-minus"></i>
                </button>
              </div>
            </div>
          );
        })}

        <br/>
        <div className="list-group-item">
          <div hidden={items.length === 0}>Total price: {total}</div>
          <button className="btn btn-primary float-right"
                  disabled={items.length === 0}
                  onClick={() => placeOrder(restaurantId, items, total, dishes)}>Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

const dispatcherToPropsMapper = (dispatch) => ({
  increaseAmount: (selectedItem, dishes, restaurantId, items, total) =>
    actions.increaseAmount(dispatch, selectedItem, dishes, restaurantId, items, total),
  decreaseAmount: (selectedItem, dishes, restaurantId, items, total) =>
    actions.decreaseAmount(dispatch, selectedItem, dishes, restaurantId, items, total),
  placeOrder: (restaurantId, items, total, dishes) =>
    actions.placeOrder(dispatch, restaurantId, items, total, dishes)
});

const stateToPropsMapper = (state, ownProps) => {
  let items;
  let total;
  if (state === undefined || state.items === undefined) {
    items = [];
    total = 0;
  }
  else {
    items = state.items;
    total = state.total;
  }

  return {
    items: items,
    total: total,
    dishes: ownProps.dishes,
    restaurantId: ownProps.restaurantId
  }
};

const OrderEditor = connect(stateToPropsMapper, dispatcherToPropsMapper)(OrderEditorContainer);

export default OrderEditor;