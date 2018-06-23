import * as constants from '../constants/index';

let _singleton = Symbol();

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


  placeOrder(items, total, restaurantId) {
    let restaurant;


      let order = {
        items: items,
        total: total,
        createdTime: new Date(),
        delivered: false
      };
  }

}