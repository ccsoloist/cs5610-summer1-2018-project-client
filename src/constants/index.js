export const SERVER = 'http://localhost:8080/api';
// export const SERVER = 'https://cs5610-project-server.herokuapp.com/api';

export const ALL_RESTAURANT_URL = SERVER + '/restaurant';
export const REGISTER_URL = SERVER + '/register/TYPE';
export const LOGIN_URL = SERVER + '/login/TYPE';
export const LOGOUT_URL = SERVER + '/logout';
export const PROFILE_URL = SERVER + '/profile';
export const ALL_ORDERS_URL = SERVER + '/orders/TYPE/UID';

export const USER_TYPE_CHANGED = 'USER_TYPE_CHANGED';
export const LOGIN = 'LOGIN';
export const CLAIM_RESTAURANT = 'CLAIM_RESTAURANT';

export const CUSTOMER = 'customer';
export const RESTAURATEUR = 'restaurateur';
export const DELIVERER = 'deliverer';

export const DELETE_DISH = "DELETE_DISH";
export const ADD_DISH = "ADD_DISH";
export const FIND_ALL_DISHES_FOR_RESTAURANT = "FIND_ALL_DISHES_FOR_RESTAURANT";
export const SAVE_ALL_DISHES_FOR_RESTAURANT = "SAVE_ALL_DISHES_FOR_RESTAURANT";
export const SWITCH_EDIT_MODE = "SWITCH_EDIT_MODE";
export const UPDATE_DISH = "UPDATE_DISH";