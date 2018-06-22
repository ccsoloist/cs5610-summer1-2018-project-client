import * as constants from '../constants/index';

let _singleton = Symbol();

export default class YelpServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
  }

  static instance() {
    if (!this[_singleton]) {
      this[_singleton] = new YelpServiceClient(_singleton);
    }
    return this[_singleton];
  }

  findAllRestaurants() {
    return fetch(constants.SERVER + "/yelp/restaurant")
      .then(response => response.json());
  }

  findRestaurantByPhone(phone) {
    return fetch(constants.SERVER + '/yelp/restaurant/phone/'+phone)
      .then(response => {
        if (response.status === 404) {
          return false;
        } else {
          return response.json();
        }
      })
  }

  findRestaurantById(yelpId) {
    return fetch(constants.SERVER + '/yelp/restaurant/' + yelpId)
      .then(response => {
        if (response.status === 404) {
          return false;
        } else {
          return response.json();
        }
      });
  }

  findRestaurantByLocation(location) {
    return fetch(constants.SERVER + `/yelp/restaurant/location/${location}`)
      .then(response => response.json());
  }

  findRestaurantByTermAndLocation(term, location) {
    return fetch(constants.SERVER + `/yelp/restaurant/term/${term}/location/${location}`)
      .then(response => response.json());
  }
}