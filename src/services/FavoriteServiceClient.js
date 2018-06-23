import * as constants from '../constants/index';

let _singleton = Symbol();

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
        }
        if (response.status === 409) {
          alert('an error occurs!');
        }
      })
  }
}