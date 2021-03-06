import * as constants from '../constants/index';
import YelpServiceClient from './YelpServiceClient';

let _singleton = Symbol();

export default class RestaurantServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
    this.yelpServiceClient = YelpServiceClient.instance();
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
        if (response.status === 404) {
          return false;
        }
        else {
          return response.json();
        }
      });
  }

  findRestaurateurForRestaurantBool(yelpId) {
    return fetch(constants.SERVER + '/restaurant/restaurateur/'+yelpId)
      .then(response => {
        if (response.status === 404) {
          return false;
        } else {
          alert("This restaurant has been claimed :(");
          return response.json();
        }
      });
  }

  claimRestaurantByPhone(phone) {
    return this.yelpServiceClient.findRestaurantByPhone(phone)
      .then(response => {
        if (response === false) {
          alert('Can\'t find this restaurant on Yelp :(');
          return false;
        } else { //find in local
          let yelpId = response[0].yelpId;
          return this.findRestaurantByYelpId(yelpId)
            .then(found => {
              if (found === false) { // store restaurant in local
                return this.createRestaurant(yelpId)
                  .then(restaurant => restaurant.id);
              } else {
                return this.findRestaurateurForRestaurantBool(yelpId)
                  .then(hasRestaurateur => hasRestaurateur ? false : found.id);
              }
            });
        }
      });
  }

  createRestaurant(yelpId) {
    return this.yelpServiceClient.findRestaurantById(yelpId)
      .then(restaurant => {
        return fetch(constants.SERVER + '/restaurant', {
          method: 'post',
          body: JSON.stringify(restaurant),
          headers: {
            'content-type': 'application/json'
          }
        }).then(response => {
          return response.json()
        });
      });
  }

  findRestaurantById(restaurantId) {
    return fetch(constants.SERVER + `/restaurant/${restaurantId}`)
      .then(response => {
        if (response.status === 404) {
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

  findRestaurantByOwner(userId) {
    return fetch(constants.SERVER + `/restaurant/owner/${userId}`)
      .then(response => {
        if (response.status === 404) {
          return null;
        }
        return response.json()
      })
  }
}