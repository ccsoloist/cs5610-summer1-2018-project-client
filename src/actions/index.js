import * as constants from '../constants'
import UserServiceClient from "../services/UserServiceClient";
import RestaurantServiceClient from "../services/RestaurantServiceClient";
import DishServiceClient from "../services/DishServiceClient";

const userService = UserServiceClient.instance();
const dishService = DishServiceClient.instance();
const restaurantService = RestaurantServiceClient.instance();

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

export const deleteDish = (dispatch, dishId, position, dishes, restaurantId) => {
  // if (dishId !== 0) {
  //   dishService.deleteDishForRestaurant(restaurantId, dishId);
  // }
  dishService.deleteDishForRestaurant(restaurantId, dishId);

  let newDishes = dishes.filter((dish) => (dish.id !== dishId));
  if (position !== dishes.length) {
    newDishes.map((dish) => {
      if (dish.position > position) {
        dish.position--;
      }
    });
  }

  dispatch({
    type: constants.DELETE_DISH,
    dishes: newDishes
  });
};

export const addDish = (dispatch, dishName, dishPrice, dishes, restaurantId) => {
  let dish = {
    id: 0,
    name: dishName,
    price: dishPrice,
    position: dishes.length + 1
  };
  dishService.createDishForRestaurant(restaurantId, dish)
    .then(() => {
      dishService.findAllDishesForRestaurant(restaurantId)
        .then((dishes) => {
          dispatch({
            type: constants.ADD_DISH,
            dishes: dishes
          });
        });
    });
};

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

export const updateDish = (dispatch, editMode, dishes, restaurantId, dish, name, price) => {
  let dishId = dish.id;
  let newDish = {
    id: dishId,
    name: name,
    price: price,
    position: dish.position
  };

  dishService.updateDish(dishId, newDish);

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