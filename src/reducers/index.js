import * as constants from '../constants'

export const DishListReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export const reducer = (state={previewModes: {}}, action) => {
// export const reducer = (state, action) => {
  switch (action.type) {
    case constants.CLAIM_RESTAURANT:
      return {
        userType: action.userType,
        claimed: action.claimed,
        restaurantId: action.restaurantId
      };

    case constants.DELETE_ORDER:
      return {
        currentOrderId: action.currentOrderId,
        reviewMode: action.reviewMode,
        previewMode: state.previewMode,
        reviewType: action.reviewType,
        previewModes: state.previewModes,
        deleted: true
      };

    case constants.FINISH_ORDER:
      return {
        currentOrderId: action.currentOrderId,
        previewMode: state.previewMode,
        previewModes: state.previewModes,
        finished: true

      };

    case constants.CHANGE_REVIEW_TYPE:
      return {
        currentOrderId: state.currentOrderId,
        reviewMode: state.reviewMode,
        previewMode: state.previewMode,
        reviewType: action.reviewType,
        previewModes: state.previewModes
      };

    case constants.REVIEW_DELIVERER:
      return {
        currentOrderId: action.currentOrderId,
        reviewMode: action.reviewMode,
        previewMode: state.previewMode,
        reviewType: action.reviewType,
        previewModes: state.previewModes
      };

    case constants.TOGGLE_REVIEW_MODE:
      return {
        currentOrderId: action.currentOrderId,
        previewMode: state.previewMode,
        reviewMode: action.reviewMode,
        previewModes: state.previewModes,
        reviewType: action.reviewType
      };

    case constants.PREVIEW_ORDER_WIDGET:
      let previewModes = state.previewModes === undefined ?
        {} : state.previewModes;
      previewModes[action.currentOrderId] = action.previewMode;
      return {
        currentOrderId: action.currentOrderId,
        previewMode: action.previewMode,
        previewModes: previewModes
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

    // case constants.DELETE_DISH:
    // case constants.ADD_DISH:
    // case constants.FIND_ALL_DISHES_BY_OWNER:
    // case constants.FIND_ALL_DISHES_FOR_RESTAURANT:
    // case constants.SAVE_ALL_DISHES_FOR_RESTAURANT:
    // case constants.UPDATE_DISH:
    //   return {
    //     dishes: action.dishes,
    //     restaurantId: action.restaurantId
    //   };
    //
    // case constants.SWITCH_EDIT_MODE:
    //   return {
    //     selectedDishId: action.selectedDishId,
    //     editMode: action.editMode,
    //     restaurantId: action.restaurantId,
    //     dishes: action.dishes
    //   };


    case constants.FIND_ALL_DISHES_FOR_RESTAURANT:
      return {
        dishes: action.dishes,
        restaurantId: action.restaurantId
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

    default:
      return state;
  }
};