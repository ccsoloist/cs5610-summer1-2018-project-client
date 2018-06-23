import * as constants from '../constants'

export const reducer = (state, action) => {
  switch (action.type) {
    case constants.CLAIM_RESTAURANT:
      return {
        userType: action.userType,
        claimed: action.claimed,
        restaurantId: action.restaurantId
      };

    case constants.USER_TYPE_CHANGED:
      return {
        userType: action.userType
      };

    case constants.LOGIN:
      console.log(state);
      console.log(action);
      return {
        userType: action.userType,
        username: action.username,
        password: action.password,
        userId: action.userId
      };

    case constants.DELETE_DISH:
    case constants.ADD_DISH:
    case constants.FIND_ALL_DISHES_BY_OWNER:
    case constants.FIND_ALL_DISHES_FOR_RESTAURANT:
    case constants.SAVE_ALL_DISHES_FOR_RESTAURANT:
    case constants.UPDATE_DISH:
      return {
        dishes: action.dishes,
        restaurantId: action.restaurantId
      };

    case constants.SWITCH_EDIT_MODE:
      return {
        selectedDishId: action.selectedDishId,
        editMode: action.editMode,
        restaurantId: action.restaurantId,
        dishes: action.dishes
      };

    case constants.ADD_DISH_TO_ORDER:
    case constants.INCREASE_AMOUNT:
    case constants.DECREASE_AMOUNT:
    case constants.PLACE_ORDER:
      console.log('in reducer');
      console.log(action.items);
      return {
        items: action.items,
        total: action.total,
        restaurantId: action.restaurantId,
        dishes: action.dishes,
      };

    default: return state;
  }
};