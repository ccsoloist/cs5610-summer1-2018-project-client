import React from 'react';
import DishListItem from "../components/DishListItem";
import {reducer} from "../reducers";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";
import * as actions from "../actions/index";


class DishListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.props.findAllDishesForRestaurant(this.props.restaurantId);
  }

  // componentDidMount() {
  //   this.props.findAllDishesForRestaurant(this.props.restaurantId);
  // }

  componentWillReceiveProps(newProps) {
    if (newProps.restaurantId !== this.props.restaurantId) {
      this.props.findAllDishesForRestaurant(newProps.restaurantId);
    }
  }

  render() {
    let nameElement;
    let priceElement;

    console.log(this.props.dishes);

    return (
      <div className="container-fluid">
        <div className="row">
          <input className="form-control col-4"
                 placeholder="Dish Name"
                 type="text"
                 ref={(node) => (nameElement = node)}/>
          <input className="form-control col-4"
                 placeholder="Dish Price"
                 type="text"
                 ref={(node) => (priceElement = node)}/>
          <button className="btn btn-primary col-2"
                  onClick={() => this.props.addDish(nameElement.value,
                    priceElement.value,
                    this.props.dishes,
                    this.props.restaurantId)}>
            Add Dish
          </button>
        </div>

        <table className="table table-hover">
          <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">price</th>
            <th className="text-center">&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {this.props.dishes.map(dish => {
            return (
              <DishListItem dish={dish}
                            key={dish.id}
                            restaurantId={this.props.restaurantId}
                            dishes={this.props.dishes}/>
            );
          })}
          </tbody>
        </table>

      </div>
    )
  }
};

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

const dispatcherToPropsMapper = (dispatch) => ({
  deleteDish: (dishId, position, dishes, restaurantId) =>
    actions.deleteDish(dispatch, dishId, position, dishes, restaurantId),
  addDish: (dishName, dishPrice, dishes, restaurantId) =>
    actions.addDish(dispatch, dishName, dishPrice, dishes, restaurantId),
  findAllDishesForRestaurant: (restaurantId) =>
    actions.findAllDishesForRestaurant(dispatch, restaurantId),
  saveAllDishesForRestaurant: (restaurantId, dishes) =>
    actions.saveAllDishesForRestaurantId(dispatch, restaurantId, dishes)
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