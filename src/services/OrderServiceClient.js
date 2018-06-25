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

  findUsersForOrder(orderId) {
    return fetch(constants.SERVER + '/order/' + orderId + "/users")
      .then(response => response.json());
  }

  finishOrder(orderId) {
    return fetch(constants.SERVER + '/order/' + orderId + "/finish", {
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }});
  }

  deleteOrderForUser(orderId) {
    return fetch(constants.SERVER + '/order/' + orderId, {
      method: 'delete',
      headers: {
        'content-type': 'application/json'
      }
    });
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
            else {
              alert('order placed');
            }
          })
      });
  }
}