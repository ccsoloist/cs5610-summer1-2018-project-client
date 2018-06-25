import React from 'react';
import OrderEditor from "./OrderEditor";
import Menu from "./Menu";
import * as actions from "../actions";
import {connect} from "react-redux";
import {createStore} from "redux";
import {reducer} from "../reducers";
import Provider from "react-redux/es/components/Provider";

class OrderWidgetContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.findAllDishesForRestaurant(this.props.restaurantId);
  }


  render() {
    return (
      <div className='row container-fluid form-group'>
        <div className='col-4'>
          <h3>Shopping Cart</h3>
          <OrderEditor dishes={this.props.dishes}
                       restaurantId={this.props.restaurantId}/>
        </div>
        <div className='col-8'>
          <h3>Menu</h3>
          <Menu dishes={this.props.dishes}
                restaurantId={this.props.restaurantId}/>
        </div>
      </div>
    );
  }
}


const dispatcherToPropsMapper = (dispatch) => ({
  findAllDishesForRestaurant: (restaurantId) =>
    actions.findAllDishesForRestaurant(dispatch, restaurantId)
});


const stateToPropsMapper = (state, ownProps) => {
  if (state !== undefined) {
    return {
      dishes: state.dishes,
      restaurantId: ownProps.restaurantId
    }
  }
  if (ownProps !== undefined) {
    return {
      dishes: [],
      restaurantId: ownProps.restaurantId,
    }
  }
};

const OrderWidgetConnected =
  connect(stateToPropsMapper, dispatcherToPropsMapper)(OrderWidgetContainer);

const store = createStore(reducer);

const PlaceOrderWidget = state => {
  return (
    <Provider store={store}>
      <OrderWidgetConnected restaurantId={state.restaurantId}/>
    </Provider>
  );
};

export default PlaceOrderWidget;