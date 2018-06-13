import * as constants from '../constants'

export const reducer = (state, action) => {
  switch (action.type) {
    case constants.USER_TYPE_CHANGED:
      return {
        userType: action.userType
      };

    default: return state;
  }
};