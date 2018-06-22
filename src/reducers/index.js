import * as constants from '../constants'

export const reducer = (state, action) => {
  switch (action.type) {
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
      let dishes = action.dishes.map((dish) => {
        return Object.assign({}, dish);
      });
      return {dishes: dishes};

       // return {
       //   dishes: action.dishes
       // };

    case constants.ADD_DISH:
      return {
        dishes: action.dishes
      };

    case constants.FIND_ALL_DISHES_FOR_RESTAURANT:
      return {
        restaurantId: action.restaurantId,
        dishes: action.dishes
      };

    case constants.SAVE_ALL_DISHES_FOR_RESTAURANT:
      return {
        restaurantId: action.restaurantId,
        dishes: action.dishes
      };

    case constants.UPDATE_DISH:
      return {
        restaurantId: action.restaurantId,
        dishes: action.dishes
      };

    case constants.SWITCH_EDIT_MODE:
      return {
        selectedDishId: action.selectedDishId,
        editMode: action.editMode,
        restaurantId: action.restaurantId,
        dishes: action.dishes
      };

    case constants.ADD_DISH_TO_ORDER:
      console.log('in reducer');
      console.log(action.items);

      return {
        items: action.items
      };

    default: return state;
  }
};