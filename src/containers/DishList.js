import React from "react";
import * as actions from "../actions";
import {createStore} from "redux/index";
import {connect} from "react-redux";
import {reducer} from "../reducers";

class DishListContainer extends React.Component {


}



const stateToPropsMapper = (state, ownProps) => {

};

const dispatcherToPropsMapper = (dispatch) => ({

});

const DishListConnected =
  connect(
    stateToPropsMapper,
    dispatcherToPropsMapper)(DishListContainer);

const store = createStore(reducer);

const DishList = state => {
  return (
    <Provider store={store}>
      <DishListConnected restaurantId={state.restaurantId}/>
    </Provider>
  );
};

export default DishList;