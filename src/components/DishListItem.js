import React from "react";
import * as constants from '../constants'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import * as actions from '../actions'

const DishListItemComponent = ({dish, deleteDish, dishes, restaurantId, editMode, switchEdit}) => {
  // console.log(dish.id);
  // console.log(dishes);

  return (

    <tr>
      {!editMode && <td className="text-center">{dish.name}</td>}
      {!editMode && <td className="text-center">{dish.price}</td>}
      {!editMode && <td className="text-center">
        <button className="btn btn-primary"
                onClick={() => deleteDish(dish.id, dish.position, dishes, restaurantId)}>
          Remove Dish
        </button>
        <button className="btn btn-primary"
                onClick={() => switchEdit(editMode, dishes, restaurantId)}>
          Edit
        </button>
      </td>}

      {editMode && <td className="text-center">
        <input className="form-control"
               value={dish.name}/>
      </td>}
      {editMode && <td className="text-center">
        <input className="form-control"
               value={dish.price}/>
      </td>}
      {editMode && <td className="text-center">
        <button className="btn btn-primary"
                onClick={() => switchEdit(editMode, dishes, restaurantId)}>
          Confirm
        </button>
      </td>}
    </tr>

  );
};


const dispatcherToPropsMapper = (dispatch) => ({
  deleteDish: (dishId, position, dishes, restaurantId) => actions.deleteDish(dispatch, dishId, position, dishes, restaurantId),
  switchEdit: (editMode, dishes, restaurantId) => actions.switchEdit(dispatch, editMode, dishes, restaurantId)
});


const stateToPropsMapper = (state, ownProps) => {
  let editMode = state.editMode === undefined ? false : state.editMode;

  if (state !== undefined) {
    return {
      editMode: editMode,
      dish: ownProps.dish,
      restaurantId: ownProps.restaurantId,
      dishes: state.dishes
    }
  }
  if (ownProps !== undefined) {
    return {
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