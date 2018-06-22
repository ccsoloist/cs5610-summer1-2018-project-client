import React from "react";
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import * as actions from '../actions'

const DishListItemComponent = ({dish, deleteDish, dishes, restaurantId}) => {
  // console.log(dish.id);
  // console.log(dishes);

  return (
    <tr>
      <td className="text-center">{dish.name}</td>
      <td className="text-center">{dish.price}</td>
      <td className="text-center">
        <button className="btn btn-primary"
                onClick={() => deleteDish(dish.id, dish.position, dishes, restaurantId)}>
          Remove Dish
        </button>
      </td>
    </tr>
  );
};


const dispatcherToPropsMapper = (dispatch) => ({
  deleteDish: (dishId, position, dishes, restaurantId) => actions.deleteDish(dispatch, dishId, position, dishes, restaurantId)
});


const stateToPropsMapper = (state, ownProps) => {
  if (state !== undefined) {
    console.log('in dish list item');
    console.log(state.dishes);
    return {
      dish: ownProps.dish,
      restaurantId: ownProps.restaurantId,
      dishes: state.dishes
    }
  }
  if (ownProps !== undefined) {
    return {
      dish: ownProps.dish,
      restaurantId: ownProps.restaurantId,
      dishes: ownProps.dishes
    }
  }
};

const DishListItem =
  connect(stateToPropsMapper, dispatcherToPropsMapper)(DishListItemComponent);


export default DishListItem;