import * as constants from '../constants/index';
import UserServiceClient from "./UserServiceClient";
import RestaurantServiceClient from "./RestaurantServiceClient";

let _singleton = Symbol();

const restaurantService = RestaurantServiceClient.instance();

export default class FavoriteServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
  }

  static instance() {
    if (!this[_singleton]) {
      this[_singleton] = new FavoriteServiceClient(_singleton);
    }
    return this[_singleton];
  }


  customerLikesRestaurant(restaurantId) {
    return fetch(constants.SERVER + `/favorite/${restaurantId}`, {
      method: 'post',
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 403) {
          alert('please log in!');
          return false;
        }
        else if (response.status === 404) {
          alert('an error occurs!');
          return false;
        }
        else {
          return true;
        }
      })
  }

  findFavorite(restaurantId) {
    return fetch(constants.SERVER + `/favorite/${restaurantId}`, {
      method: 'get',
      credentials: 'include'
    })
      .then(response => {
        if (response.status !== 404) {
          return true;
        }
        return false;
      })
  }

  customerUnlikesRestaurant(restaurantId) {
    return fetch(constants.SERVER + `/favorite/${restaurantId}`, {
      method: 'delete',
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 403) {
          alert('please log in!');
          return false;
        }
        else if (response.status === 404) {
          alert('an error occurs!');
          return true;
        }
        else {
          return false;
        }
      })
  }

  findFavoritesForUser(userId) {
    return fetch(constants.SERVER + `/favorite/user/${userId}`)
      .then(response => response.json());
  }

  findFollowersForRestaurant(restaurantId) {
    return fetch(constants.SERVER + `/favorite/restaurant/${restaurantId}`)
      .then(response => response.json());
  }
}