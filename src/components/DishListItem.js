import React from "react";
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import * as actions from '../actions'

const DishListItemComponent = ({dish,  dishes, restaurantId, editMode,
                                 deleteDish, switchEdit, selectedDishId, updateDish}) => {
  let nameElement;
  let priceElement;

  return (
  <tr>
      {(!editMode || selectedDishId !== dish.id) && <td className="text-center">{dish.name}</td>}
      {(!editMode || selectedDishId !== dish.id) && <td className="text-center">{dish.price}</td>}
      {(!editMode || selectedDishId !== dish.id) && <td className="text-center">
        <button className="btn btn-primary"
                onClick={() => deleteDish(dish.id, dishes, restaurantId)}>
          <i className="fa fa-trash"/>
        </button>
        &nbsp;&nbsp;
        <button className="btn btn-primary"
                onClick={() => switchEdit(dish.id, editMode, dishes, restaurantId)}>
          <i className="fa fa-pencil"/>
        </button>
      </td>}

      {(editMode && selectedDishId === dish.id) && <td className="text-center">
        <input className="form-control"
               defaultValue={dish.name}
               ref={(node) => (nameElement = node)}/>
      </td>}
      {(editMode && selectedDishId === dish.id) && <td className="text-center">
        <input className="form-control"
               defaultValue={dish.price}
               ref={(node) => (priceElement = node)}/>
      </td>}
      {(editMode && selectedDishId === dish.id) && <td className="text-center">
        <button className="btn btn-success"
                onClick={() => updateDish(editMode, dishes, restaurantId, dish,
                  nameElement.value, priceElement.value)}>
          <i className="fa fa-check"/>
        </button>
      </td>}
    </tr>
  );
};


const dispatcherToPropsMapper = (dispatch) => ({
  deleteDish: (dishId, dishes, restaurantId) =>
    actions.deleteDish(dispatch, dishId, dishes, restaurantId),
  switchEdit: (selectedDishId, editMode, dishes, restaurantId) =>
    actions.switchEdit(dispatch, selectedDishId, editMode, dishes, restaurantId),
  updateDish: (editMode, dishes, restaurantId, dish, name, price) =>
    actions.updateDish(dispatch, editMode, dishes, restaurantId, dish, name, price)
});


const stateToPropsMapper = (state, ownProps) => {
  let editMode = state.editMode === undefined ? false : state.editMode;
  let selectedDishId = state.selectedDishId === undefined? 0: state.selectedDishId;

  if (state !== undefined) {
    return {
      selectedDishId: selectedDishId,
      editMode: editMode,
      dish: ownProps.dish,
      restaurantId: ownProps.restaurantId,
      dishes: state.dishes
    }
  }
  if (ownProps !== undefined) {
    return {
      selectedDishId: selectedDishId,
      editMode: false,
      dish: ownProps.dish,
      restaurantId: ownProps.restaurantId,
      dishes: ownProps.dishes
    }
  }
};

const DishListItem =
  connect(stateToPropsMapper, dispatcherToPropsMapper)(DishListItemComponent);

export default DishListItem;