import * as constants from '../constants'
import UserServiceClient from "../services/UserServiceClient";
import RestaurantServiceClient from "../services/RestaurantServiceClient";
import DishServiceClient from "../services/DishServiceClient";
import OrderServiceClient from "../services/OrderServiceClient";

const userService = UserServiceClient.instance();
const dishService = DishServiceClient.instance();
const restaurantService = RestaurantServiceClient.instance();
const orderService = OrderServiceClient.instance();

export const claimRestaurant = (dispatch, userType, claimed, phone) => {
  restaurantService.claimRestaurantByPhone(phone)
    .then(response => {
      console.log(response);
      dispatch({
        type: constants.CLAIM_RESTAURANT,
        userType: userType,
        claimed: response === false ? claimed : !claimed,
        restaurantId: response // id in local database
      })
    });
};

export const typeChanged = (dispatch, userType) => dispatch({
  type: constants.USER_TYPE_CHANGED,
  userType: userType
});


export const Login = (dispatch, userType, username, password) => {
  let user = {
    username: username,
    password: password
    // userType: userType
  };
  // // return fetch('http://localhost:8080/api/login', {
  // return fetch(constants.LOGIN_URL.replace('TYPE', userType), {
  //   method: 'put',
  //   body: JSON.stringify(user),
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // }).then((response) => {
  //   if (response.status === 404) {
  //     // alert("User not found, please register!");
  //     return false;
  //   } else {
  //     alert("Successfully logged in!");
  //     return response.json();
  //   }
  // }).then(user => {
  //   if (user === false) {
  //     alert("User not found, please register!");
  //     //redirecting
  //   } else {
  //     dispatch({
  //       type: constants.LOGIN,
  //       userId: user.id,
  //       userType: userType,
  //       username: username,
  //       password: password
  //     });
  //     window.location.replace("/profile/"+userType+"/"+user.id);
  //   }
  // });

  userService.login(user, userType)
    .then(user => {
      if (user === null) {
        alert("User not found, please register!");
        //redirecting
      }
      else {
        dispatch({
          type: constants.LOGIN,
          userId: user.id,
          userType: userType,
          username: username,
          password: password
        });
        window.location.replace("/profile/" + userType + "/" + user.id);
      }
    });
};

export const Register =
  (dispatch, userType, restaurantId, username, password, confirm,
   firstName, lastName, restaurantName, email, phone, address) => {
    if (password.toString() !== confirm.toString()) {
      alert("Password and Confirm password should be same!");
    }
    let user = {
      username: username,
      password: password,
      confirm: confirm,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      restaurantName: restaurantName,
      restaurantId: restaurantId
    };

    // return fetch(constants.REGISTER_URL.replace('TYPE', userType), {
    //   method: 'post',
    //   body: JSON.stringify(user),
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // }).then((response) => {
    //   if (response.status === 409) {
    //     alert("Username already exists!");
    //     return false;
    //   } else {
    //     alert("Successfully registered!");
    //     return response.json();
    //   }
    // }).then(user => {
    //   if (user === false) {
    //     alert("User not found, please register!");
    //     //redirecting
    //   } else {
    //     // dispatch({
    //     //   type: constants.LOGIN,
    //     //   userId: user.id,
    //     //   userType: userType,
    //     //   username: username,
    //     //   password: password
    //     // });
    //     window.location.replace("/profile/"+userType+"/"+user.id);
    //   }
    // });
    userService.register(user, userType)
      .then(user => {
        if (user === null) {
          alert("User not found, please register!");
          //redirecting
        } else {
          dispatch({
            type: constants.LOGIN,
            userId: user.id,
            userType: userType,
            username: username,
            password: password
          });
          window.location.replace("/profile/" + userType + "/" + user.id);
        }
      });
  };


export const logout = (dispatch) => {
  userService.logout()
};

export const deleteDish = (dispatch, dishId, dishes, restaurantId) => {
  let newDishes = dishes;
  if (window.confirm("Are you sure to delete this dish?")) {
    dishService.deleteDishForRestaurant(restaurantId, dishId);
    newDishes = dishes.filter((dish) => (dish.id !== dishId));
  }
  
  dispatch({
    type: constants.DELETE_DISH,
    dishes: newDishes,
    restaurantId: restaurantId
  });
};

export const addDish = (dispatch, dishName, dishPrice, dishes, restaurantId) => {
  let dish = {
    id: 0,
    name: dishName,
    price: dishPrice,
  };
  dishService.createDishForRestaurant(restaurantId, dish)
    .then(() => {
      dishService.findAllDishesForRestaurant(restaurantId)
        .then((dishes) => {
          dispatch({
            type: constants.ADD_DISH,
            dishes: dishes,
            restaurantId: restaurantId
          });
        });
    });
};

export const findAllDishesByOwner = (dispatch, restaurateurId) => {
  restaurantService.findRestaurantByOwner(restaurateurId)
    .then(restaurant => {
      console.log('in action');
      console.log(restaurateurId);
      console.log(restaurant.id);
      dishService.findAllDishesForRestaurant(restaurant.id)
        .then(dishes => {
          dispatch({
            type: constants.FIND_ALL_DISHES_BY_OWNER,
            dishes: dishes,
            restaurantId: restaurant.id
          })
        })
    })
}

export const findAllDishesForRestaurant = (dispatch, restaurantId) => {
  dishService.findAllDishesForRestaurant(restaurantId)
    .then((dishes) => {
      dispatch({
        type: constants.FIND_ALL_DISHES_FOR_RESTAURANT,
        dishes: dishes,
        restaurantId: restaurantId
      });
    });
};

export const saveAllDishesForRestaurantId = (dispatch, restaurantId, dishes) => {
  dishService.saveAllDishesForRestaurant(restaurantId, dishes);
  dispatch({
    type: constants.SAVE_ALL_DISHES_FOR_RESTAURANT,
    dishes: dishes,
    restaurantId: restaurantId
  });
};

export const switchEdit = (dispatch, selectedDishId, editMode, dishes, restaurantId) => {
  dispatch({
    type: constants.SWITCH_EDIT_MODE,
    selectedDishId: selectedDishId,
    editMode: true,
    dishes: dishes,
    restaurantId: restaurantId
  });
};

export const finishOrder = (dispatch, orderId) => {
  orderService.finishOrder(orderId)
    .then(() => dispatch({
      type: constants.FINISH_ORDER
    }));
};

export const updateDish = (dispatch, editMode, dishes, restaurantId, dish, name, price) => {
  let dishId = dish.id;
  let newDish = {
    id: dishId,
    name: name,
    price: price
  };

  dishService.updateDish(restaurantId, dishId, newDish);

  let newDishes = dishes.map(dish => {
    if (dish.id === dishId) {
      return newDish;
    }
    else {
      return dish;
    }
  });

  dispatch({
    type: constants.UPDATE_DISH,
    dishes: newDishes,
    editMode: !editMode,
    restaurantId: restaurantId
  });
};

export const addDishToOrder = (dispatch, dish, dishes, restaurantId, items, total) => {
  let found = false;
  let newItems = items.map(item => {
    if (item.dish === dish) {
      found = true;
      return {dish: item.dish, amount: item.amount + 1};
    }
    else {
      return item;
    }
  });

  if (!found) {
    newItems = [
      ...newItems,
      {dish: dish, amount: 1}
    ]
  }

  dispatch({
    type: constants.ADD_DISH_TO_ORDER,
    dishes: dishes,
    restaurantId: restaurantId,
    items: newItems,
    total: total + dish.price
  });
};


export const increaseAmount = (dispatch, selectedItem, dishes, restaurantId, items, total) => {
  items = items.map(item => {
    if (item === selectedItem) {
      return {dish: item.dish, amount: item.amount + 1}
    }
    else {
      return item;
    }
  });

  dispatch({
    type: constants.INCREASE_AMOUNT,
    dishes: dishes,
    restaurantId: restaurantId,
    items: items,
    total: total + selectedItem.dish.price
  })
};

export const decreaseAmount = (dispatch, selectedItem, dishes, restaurantId, items, total) => {
  let remove = false;

  items = items.map(item => {
    if (item === selectedItem) {
      if (item.amount === 1) {
        remove = true;
        return item;
      }
      else {
        return {dish: item.dish, amount: item.amount - 1}
      }
    }
    else {
      return item;
    }
  });

  if (remove) {
    items = items.filter((item) => (item !== selectedItem));
  }

  dispatch({
    type: constants.DECREASE_AMOUNT,
    dishes: dishes,
    restaurantId: restaurantId,
    items: items,
    total: total - selectedItem.dish.price
  });
};

export const placeOrder = (dispatch, restaurantId, items, total, dishes) => {
  let order = {
    total: total,
    items: items,
    createdTime: new Date(),
    delivered: false
  };

  orderService.createOrder(restaurantId, order);

  dispatch({
    type: constants.DECREASE_AMOUNT,
    dishes: dishes,
    restaurantId: restaurantId,
    items: [],
    total: 0
  })
};