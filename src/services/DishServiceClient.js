import * as constants from '../constants/index';

let _singleton = Symbol();

export default class DishServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Singleton module service.')
    }
  }

  static instance() {
    if (!this[_singleton]) {
      this[_singleton] = new DishServiceClient(_singleton);
    }
    return this[_singleton];
  }


  findAllDishesForRestaurant(restaurantId) {
    return fetch(constants.SERVER + `/restaurant/${restaurantId}/dish`)
      .then((response) => {
        if (response.status === 404) {
          return null;
        }
        else {
          return response.json();
        }
      });
  }

  deleteDishForRestaurant(restaurantId, dishId) {
    return fetch(constants.SERVER + `/restaurant/${restaurantId}/dish/${dishId}`, {
      method: 'delete'
    });
  }

  createDishForRestaurant(restaurantId, dish) {
    return fetch(constants.SERVER + `/restaurant/${restaurantId}/dish`, {
      method: 'post',
      body: JSON.stringify(dish),
      headers: {
        'content-type': 'application/json'
      }
    })
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
    console.log('in client service');
    console.log(dishes);

    return fetch(constants.SERVER + `/restaurant/${restaurantId}/dishes`, {
      method: 'post',
      body: JSON.stringify(dishes),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateDish(restaurantId, dishId, dish) {
    return fetch(constants.SERVER + `/restaurant/${restaurantId}/dish/${dishId}`, {
      method: 'put',
      body: JSON.stringify(dish),
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}