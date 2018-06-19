import * as constants from '../constants/index';

let _singleton = Symbol();

export default class UserServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
  }

  static instance() {
    if (!this[_singleton]) {
      this[_singleton] = new UserServiceClient(_singleton);
    }
    return this[_singleton];
  }

  login(user, userType) {
    return fetch(constants.LOGIN_URL.replace('TYPE', userType), {
      method: 'put',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 404) {
          return null;
        }
        else {
          alert("Successfully logged in!");
          return response.json();
        }
      })
  }

  register(user, userType) {
    return fetch(constants.REGISTER_URL.replace('TYPE', userType), {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 409) {
          alert("Username already exists!");
          return null;
        }
        else {
          alert("Successfully registered!");
          return response.json();
        }
      })
  }
}