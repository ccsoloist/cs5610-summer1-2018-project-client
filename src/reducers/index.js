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
      console.log('in reducer');
      console.log(action.dishes);
       return {
         dishes: action.dishes
       };

    case constants.ADD_DISH:
      console.log('in reducer');
      console.log(action.dishes);
      return {
        dishes: action.dishes
      };

    case constants.FIND_ALL_DISHES_FOR_RESTAURANT:
      console.log('in reducer');
      console.log(action.dishes);
      return {
        restaurantId: action.restaurantId,
        dishes: action.dishes
      };

    case constants.SAVE_ALL_DISHES_FOR_RESTAURANT:
      return {
        restaurantId: action.restaurantId,
        dishes: action.dishes
      };


    default: return state;
  }


};