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

    default: return state;
  }
};