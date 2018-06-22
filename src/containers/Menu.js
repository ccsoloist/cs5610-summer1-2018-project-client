import React from 'react';
import * as actions from "../actions";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";
import {reducer} from "../reducers";

const MenuComponent = ({dishes, addDishToOrder}) => {
  return (
    <ul className="list-group">
      {dishes.map(dish => {
        return (
          <li className="list-group-item"
              key={dish.id}>
            {dish.name}
            <button className="btn btn-primary float-right"
            onClick={() => addDishToOrder(dish)}>
              Add to Order
            </button>
          </li>
        )
      })}
    </ul>
  );
};

const dispatcherToPropsMapper = (dispatch) => ({
  findAllDishesForRestaurant: (restaurantId) => actions.findAllDishesForRestaurant(dispatch, restaurantId),
  addDishToOrder: (dish) => actions.addDishToOrder(dispatch, dish)
});


const stateToPropsMapper = (state, ownProps) => {
  console.log(ownProps);

  if (state !== undefined) {
    return {
      dishes: ownProps.dishes,
      restaurants: ownProps.restaurants
    }
  }
  if (ownProps !== undefined) {
    return {
      dishes: ownProps.dishes,
      restaurants: ownProps.restaurants
    }
  }
};

const Menu =
  connect(stateToPropsMapper, dispatcherToPropsMapper)(MenuComponent);

const store = createStore(reducer);

export default Menu;