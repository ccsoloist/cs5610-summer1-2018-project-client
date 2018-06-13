import * as constants from '../constants'

export const typeChanged = (dispatch, userType) => (
  dispatch({
    type: constants.USER_TYPE_CHANGED,
    userType: userType
  })
);

export const Login = (dispatch, userType, username, password) => {
  let user = {
    username: username,
    password: password,
    userType: userType
  };
  return fetch('http://localhost:8080/api/login', {
  // return fetch(constants.LOGIN_URL.replace('TYPE', userType), {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 404) {
      // alert("User not found, please register!");
      return false;
    } else {
      alert("Successfully logged in!");
      return response.json();
    }
  }).then(user => {
    if (user === false) {
      alert("User not found, please register!");
      //redirecting
    } else {
      dispatch({
        type: constants.LOGIN,
        userType: userType,
        username: username,
        password: password
      });
      // window.location.replace("/profile/"+userType+"/"+user.id);
    }
  });
};