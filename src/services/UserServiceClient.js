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
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
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
    if (userType === constants.RESTAURATEUR) {
      return fetch(constants.REGISTER_URL.replace('TYPE', userType) + "/" + user.restaurantId, {
        method: 'post',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {
        if (response.status === 409) {
          alert("Username already exists!");
          return null;
        }
        else {
          alert("Successfully registered!");
          return response.json();
        }
      });
    } else {
      return fetch(constants.REGISTER_URL.replace('TYPE', userType), {
        method: 'post',
        body: JSON.stringify(user),
        credentials: 'include',
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
        });
    }
  }

  findOrdersForUser(userId) {
    return fetch(constants.SERVER + '/user/' + userId + '/orders')
      .then(response => response.json());
  }

  findAccountInfoForUser(userType, userId) {
    return fetch(constants.SERVER + '/profile/' + userType + '/' + userId + '/account', {
        credentials: 'include'
    }).then(response => (response.json()));
  }

  findOwnerOfRestaurant(restaurantId) {
    return fetch(constants.SERVER + `/user/restaurant/${restaurantId}`)
      .then(response => {
        if (response.status !== 404) {
          return response.json();
        }
        return null;
      });
  }

  logout() {
    return fetch(constants.SERVER + '/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  findCurrentUser() {
    return fetch(constants.SERVER + '/session/user', {
      method: 'get',
      credentials: 'include'
    })
      .then(response => {
        if (response.status !== 404) {
          return response.json();
        }
      });
  }

  findDishesForRestaurateur(restaurateurId) {
    return fetch(constants.SERVER + '/order/' + restaurateurId)
      .then(response => response.json());
  }

  updateAccountInfoForUser(userType, userId, user) {
    return fetch(constants.SERVER + '/profile/' + userType + '/' + userId + '/account', {
      method: 'put',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  findAllCustomers() {
    return fetch(constants.SERVER + '/user/customer')
      .then(response => response.json());
  }

  findAllRestaurateurs() {
    return fetch(constants.SERVER + '/user/restaurateur')
      .then(response => response.json());
  }

  findAllDeliverers() {
    return fetch(constants.SERVER + '/user/deliverer')
      .then(response => response.json());
  }

  deleteUser(userType, userId) {
    return fetch(constants.SERVER + `/user/${userType}/${userId}`, {
      method: 'delete'
    })
      .then(response => {
        if (response.status === 404) {
          alert("cannot find user")
        }
      })
  }
}