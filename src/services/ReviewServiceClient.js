import * as constants from '../constants/index';

let _singleton = Symbol();

export default class ReviewServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
  }

  static instance() {
    if (!this[_singleton]) {
      this[_singleton] = new ReviewServiceClient(_singleton);
    }
    return this[_singleton];
  }

  customerReviewDeliverer(reviewType, delivererId) {
    return fetch(constants.SERVER + "/review/" + reviewType + "/" + delivererId, {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => response.json());
  }

  findReview(delivererId) {
    return fetch(constants.SERVER + '/review/' + delivererId, {
      method: 'get',
      credentials: 'include'
    }).then(response => {
      if (response.status !== 404) {
        return response.json();
      }
      return false;
    });
  }
}