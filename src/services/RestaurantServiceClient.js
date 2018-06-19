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
    return fetch(constants.SERVER + `/restaurant/${yelpId}`)
      .then(response => {
        if (response.status == 404) {
          return null;
        }
        else {
          return response.json();
        }
      });
  }
}