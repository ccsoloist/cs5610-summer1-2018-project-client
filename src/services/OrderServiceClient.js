import * as constants from '../constants/index';
import UserServiceClient from "./UserServiceClient";

let _singleton = Symbol();

const userService = UserServiceClient.instance();

export default class OrderServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
  }

  static instance() {
    if (!this[_singleton]) {
      this[_singleton] = new OrderServiceClient(_singleton);
    }
    return this[_singleton];
  }


  createOrder(restaurantId, order) {
    let restaurateurId;

    return userService.findOwnerOfRestaurant(restaurantId)
      .then(restaurateur => {
        restaurateurId = restaurateur.id
      })
      .then(() => {
        fetch(constants.SERVER + `/order/restaurateur/${restaurateurId}`, {
          method: 'post',
          body: JSON.stringify(order),
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          }
        })
          .then(response => {
            if (response.status === 403) {
              alert('please log in');
            }
          })
      });
  }
}