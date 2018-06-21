import * as constants from '../constants/index';

let _singleton = Symbol();

export default class RestaurantServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
  }

  static instance() {
    if (!this[_singleton]) {
      this[_singleton] = new RestaurantServiceClient(_singleton);
    }
    return this[_singleton];
  }

  /**
   * find restaurant at local database by yelpId
   * @param yelpId yelpId of the restaurant
   * @returns {Promise<Response>}
   */
  findRestaurantByYelpId(yelpId) {
    return fetch(constants.SERVER + `/restaurant/yelp/${yelpId}`)
      .then(response => {
        if (response.status == 404) {
          return null;
        }
        else {
          return response.json();
        }
      });
  }

  findRestaurantById(restaurantId) {
    return fetch(constants.SERVER + `/restaurant/${restaurantId}`)
      .then(response => {
        if (response.status == 404) {
          return null;
        }
        else {
          return response.json();
        }
      });
  }

  saveAllDishesForRestaurant(restaurantId, dishes) {
    return fetch(constants.SERVER + `/restaurant/${restaurantId}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(dishes)
    });
  }
}