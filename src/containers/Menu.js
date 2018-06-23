import React from 'react';
import * as actions from "../actions";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";
import {reducer} from "../reducers";

const MenuComponent = ({dishes, restaurantId, items, total,
                         addDishToOrder}) => {
  return (
    <table className="table menu">
      <thead>
      <tr>
        <th className="text-center">Dish</th>
        <th className="text-center">Price</th>
        <th className="text-center">&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      {dishes.map(dish => {
        return (
          <tr key={dish.id}>
            <td className="text-center">{dish.name}</td>
            <td className="text-center">{dish.price}</td>
            <td className="text-center">
              <button className="btn btn-primary float-right"
                      onClick={() => addDishToOrder(dish, dishes, restaurantId, items, total)}>
                Add to Cart
              </button>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  );
};

const dispatcherToPropsMapper = (dispatch) => ({
  findAllDishesForRestaurant: (restaurantId) =>
    actions.findAllDishesForRestaurant(dispatch, restaurantId),
  addDishToOrder: (dish, dishes, restaurantId, items, total) =>
    actions.addDishToOrder(dispatch, dish, dishes, restaurantId, items, total),
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
    dishes: ownProps.dishes,
    restaurantId: ownProps.restaurantId,
    total: total
  }
};

const Menu =
  connect(stateToPropsMapper, dispatcherToPropsMapper)(MenuComponent);

const store = createStore(reducer);

export default Menu;