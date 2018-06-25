// import * as constants from '../constants/index';
// import YelpServiceClient from './YelpServiceClient';
//
// let _singleton = Symbol();
//
// export default class OrderServiceClient {
//   constructor(singletonToken) {
//     if (_singleton !== singletonToken) {
//       throw new Error('Singleton module service.')
//     }
//   }
//
//   static instance() {
//     if (!this[_singleton]) {
//       this[_singleton] = new OrderServiceClient(_singleton);
//     }
//     return this[_singleton];
//   }
//
//   findUsersForOrder(orderId) {
//     return fetch(constants.SERVER + '/order/' + orderId + "/users")
//       .then(response => response.json());
//   }
//
//   finishOrder(orderId) {
//     return fetch(constants.SERVER + '/order/' + orderId + "/finish", {
//       method: 'put',
//       headers: {
//       'content-type': 'application/json'
//     }});
//   }
// }